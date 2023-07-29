//@ts-nocheck
"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { useSession } from "next-auth/react";
import type { ListWithItems } from "@/types/list";
import Tab from "../components/tab";
import TabsContainer from "../components/tabs-container";
import TabContainer from "../components/tab-container";
import Drawer from "../components/right-drawer";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useModalStoreSelectors } from "@/stores/modal";
import { useUserSelectors } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useLazyQuery } from "@apollo/client";
import { GETLISTSWITHITEMS } from "@/lib/queries";
import useMediaQueries from "@/lib/hooks/useMediaQueries";
import { Select, SelectItem } from "@/app/components/select";

const ListsPage = async () => {
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();
  const currentListIndex = useUserSelectors.use.currentListIndex();
  const setCurrentListIndex = useUserSelectors.use.setCurrentListIndex();
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
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
      console.log(response);
      if (response.data.getAllListsWithItems) {
        setUser({
          ...user,
          lists: response.data.getAllListsWithItems,
        });
      }
    };
    getAllLists();
  }, []);

  const openCreateModal = () => {
    setIsModalOpen(true);
    setModalContent("CREATE_LIST");
  };

  if (!session || !user) {
    router.push("/");
    return null;
  }

  return (
    <div className="relative">
      {isMobile ? (
        <>
          <div className="w-full flex items-center justify-between">
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
                    <SelectItem key={list.id} value={index}>
                      {list.name}
                    </SelectItem>
                  );
                })}
            </Select>
            <button
              onClick={() => {
                console.log("opening");
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
          <button className="absolute rounded-full bg-electric-violet bottom-0 right-4 p-2 z-[49]">
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
        <>
          <div className="flex items-center border-b border-fog border-opacity-50">
            <div className="flex-1 ">
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
                      >
                        <>
                          {list.name}
                          <button
                            onClick={() => {
                              if (tabIndex !== index) {
                                setTabIndex(index);
                                setList(user?.lists![index]);
                              }
                              openDrawer("RIGHT", "");
                            }}
                            className="flex items-center justify-center"
                          >
                            <SettingsIcon
                              fontSize="small"
                              className="text-davy dark:text-fog ml-1"
                            />
                          </button>
                        </>
                      </Tab>
                    );
                  })}
              </TabsContainer>
            </div>
            <button onClick={openCreateModal}>
              <AddIcon
                fontSize="large"
                className="text-gunmetal dark:text-snow"
              />
            </button>
          </div>
        </>
      )}

      {list && (
        <TabContainer list={list} index={tabIndex} setIndex={setTabIndex} />
      )}
    </div>
  );
};

export default ListsPage;
