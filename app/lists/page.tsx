"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { ListWithItems } from "@/types/list";
import Tab from "../components/tab";
import TabsContainer from "../components/tabs-container";
import TabContainer from "../components/tab-container";
import Drawer from "../components/right-drawer";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useModalStoreSelectors } from "@/stores/modal";
import { useUserSelectors } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useLazyQuery } from "@apollo/client";
import { GETLISTSWITHITEMS } from "@/lib/queries";

const ListsPage = async () => {
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
  const openDrawer = useDrawerStoreSelectors.use.openDrawer();
  const { data: session } = useSession();
  const router = useRouter();
  const [getLists] = useLazyQuery(GETLISTSWITHITEMS);

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
    <div>
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
          <AddIcon fontSize="large" className="text-gunmetal dark:text-snow" />
        </button>
      </div>

      {list && (
        <TabContainer list={list} index={tabIndex} setIndex={setTabIndex} />
      )}
    </div>
  );
};

export default ListsPage;
