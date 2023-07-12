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
import AddIcon from "@mui/icons-material/Add";
import { useModalStoreSelectors } from "@/stores/modal";
import { useUserSelectors } from "@/stores/user";

const ListsPage = async () => {
  const user = useUserSelectors.use.user();
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !user) {
    router.replace("/api/auth/signin");
  }

  const [lists, setLists] = useState<ListWithItems[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  // const { data, loading, error } = useQuery(GETLISTSWITHITEMS, {
  //   variables: { id: session?.user?.id },
  //   skip: !session || !session.user,
  // });

  // useEffect(() => {
  //   console.log(data);
  //   if (data) {
  //     setLists(data.getAllListsWithItems);
  //   }
  // }, [data]);

  // if (loading && session) return <div>Loading...</div>;
  // if (error && session) return <div>{error.message}</div>;

  const openCreateModal = () => {
    setIsModalOpen(true);
    setModalContent("CREATE_LIST");
  };

  return (
    <div>
      <div className="flex items-center border-b border-fog border-opacity-50">
        <div className="flex-1 ">
          <TabsContainer>
            {user?.lists &&
              user.lists.map((list: ListWithItems, index: number) => {
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
        </div>
        <button onClick={openCreateModal}>
          <AddIcon fontSize="large" className="text-gunmetal dark:text-snow" />
        </button>
      </div>

      {user?.lists &&
        user.lists.map((list: ListWithItems, index: number) => {
          return <TabContainer key={list.id} index={index} list={list} />;
        })}
    </div>
  );
};

export default ListsPage;
