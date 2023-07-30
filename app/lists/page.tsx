//@ts-nocheck
"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import type { ListWithItems } from "@/types/list";
import Tab from "../components/tab";
import TabsContainer from "../components/tabs-container";
import TabContainer from "../components/tab-container";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useModalStoreSelectors } from "@/stores/modal";
import { useUserSelectors, useUserStore } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useLazyQuery } from "@apollo/client";
import { GETLISTSWITHITEMS } from "@/lib/queries";
import useMediaQueries from "@/lib/hooks/useMediaQueries";
import { Select, SelectItem } from "@/app/components/select";
import Shave from "../components/shave";

const ListsPage = async () => {
  const [user, setUser] = useUserStore((store) => [store.user, store.setUser]);
  const setCurrentListIndex = useUserSelectors.use.setCurrentListIndex();
  const openModal = useModalStoreSelectors.use.openModal();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  const { data: session } = useSession();
  const router = useRouter();
  const [getLists] = useLazyQuery(GETLISTSWITHITEMS);
  const { isMobile } = useMediaQueries();

  const [tabIndex, setTabIndex] = useState(0);
  const [list, setList] = useState<ListWithItems | undefined>(user?.lists![0]);

  useEffect(() => {
    const getAllLists = async () => {
      if (!session || !user) return;
      const response = await getLists({
        variables: {
          id: user.id,
        },
      });
      if (response.data.getAllListsWithItems) {
        setUser({
          ...user,
          lists: response.data.getAllListsWithItems,
        });
      }
    };
    getAllLists();
  }, []);

  useEffect(() => {
    if (!user) return;
    setList(user.lists![tabIndex]);
  }, [user]);

  const openCreateModal = () => {
    openModal("CREATE_LIST");
  };

  if (!session || !user) {
    router.push("/");
    return null;
  }

  return (
    <div className="relative w-full h-[calc(100dvh-4.25rem)] md:h-[calc(100dvh-6.25rem)] lg:h-[calc(100dvh-7.25rem)] md:flex md:items-stretch overflow-hidden">
      {isMobile ? (
        <>
          <div className="h-12 w-full flex items-center justify-between mb-4">
            <Select
              value={tabIndex}
              onValueChange={(value) => {
                setTabIndex(value);
                setList(user?.lists![value]);
              }}
            >
              {user?.lists &&
                user.lists.map((list: ListWithItems, index: number) => {
                  return (
                    <SelectItem
                      key={list.id}
                      value={index}
                      isFirstItem={index === 0}
                      isLastItem={index === user?.lists.length - 1}
                    >
                      {list.name}
                    </SelectItem>
                  );
                })}
            </Select>
            <button
              onClick={() => {
                setCurrentListIndex(tabIndex);
                openDrawer("BOTTOM", "LIST_OPTIONS");
              }}
            >
              <MoreHorizIcon
                fontSize="large"
                className="text-gunmetal dark:text-snow"
              />
            </button>
          </div>
          <button className="absolute rounded-full bg-electric-violet bottom-6 right-4 p-2 z-[49]">
            <AddIcon
              fontSize="large"
              className="text-snow"
              onClick={() => {
                openDrawer("BOTTOM", "CREATE_LIST");
              }}
            />
          </button>
        </>
      ) : (
        <div className="flex flex-col min-w-[200px] max-w-[400px] w-1/4">
          <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Lists</h1>
            <button onClick={openCreateModal}>
              <AddIcon
                fontSize="large"
                className="text-gunmetal dark:text-snow"
              />
            </button>
          </div>
          <TabsContainer>
            {user?.lists &&
              user.lists.map((list: ListWithItems, index: number) => {
                return (
                  <Tab
                    key={list.id}
                    handleClick={() => {
                      setTabIndex(index);
                      setList(user?.lists![index]);
                    }}
                    active={index === tabIndex}
                    isFirstTab={index === 0}
                    isLastTab={index === user.lists!.length - 1}
                  >
                    <Shave maxHeight={28} element="h2">
                      {list.name}
                    </Shave>
                    <button
                      onClick={() => {
                        if (tabIndex !== index) {
                          setTabIndex(index);
                          setList(user?.lists![index]);
                        }
                        setCurrentListIndex(index);
                        openDrawer("RIGHT", "LIST_OPTIONS");
                      }}
                      className="flex items-center justify-center"
                    >
                      <MoreVertIcon
                        fontSize="small"
                        className="text-davy dark:text-fog ml-1"
                      />
                    </button>
                  </Tab>
                );
              })}
          </TabsContainer>
        </div>
      )}
      {list && (
        <TabContainer list={list} index={tabIndex} setIndex={setTabIndex} />
      )}
    </div>
  );
};

export default ListsPage;
