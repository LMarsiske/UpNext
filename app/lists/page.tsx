"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GETLISTSWITHITEMS } from "@/lib/queries";
import type { ListWithItems } from "@/types/list";
import Tab from "../components/Tab";
import TabsContainer from "../components/TabsContainer";
import TabContainer from "../components/TabContainer";
import { useRouter } from "next/navigation";

const ListsPage = async () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/api/auth/signin");
  }

  const [lists, setLists] = useState<ListWithItems[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const { data, loading, error } = useQuery(GETLISTSWITHITEMS, {
    variables: { id: session?.user?.id },
    skip: !session || !session.user,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      console.log(data.getAllListsWithItems);
      setLists(data.getAllListsWithItems);
    }
  }, [data]);

  if (loading && session) return <div>Loading...</div>;
  if (error && session) return <div>{error.message}</div>;

  console.log(data);

  return (
    <div>
      <TabsContainer>
        {lists &&
          lists.map((list: ListWithItems, index: number) => {
            return (
              <Tab
                key={list.id}
                handleClick={() => setTabIndex(index)}
                active={index === tabIndex}
                isFirstTab={index === 0}
              >
                {list.name}
              </Tab>
            );
          })}
      </TabsContainer>

      {lists &&
        lists.map((list: ListWithItems, index: number) => {
          return <TabContainer key={list.id} index={index} list={list} />;
        })}
    </div>
  );
};

export default ListsPage;
