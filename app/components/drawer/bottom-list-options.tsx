"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
// import { useUserSelectors } from "@/stores/user";
import { useUserStore } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { useToastStoreSelectors } from "@/stores/toast";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  EDITLIST,
  SHARELIST,
  DELETELIST,
  MAKEEDITORVIEWER,
  MAKEVIEWEREDITOR,
  REMOVEUSERFROMLIST,
  LEAVELIST,
} from "@/lib/mutations";
import { SEARCHUSERS } from "@/lib/queries";
import { ListWithItems } from "@/types/list";
import { User } from "@/types/user";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface SharedUser extends User {
  isEditor: boolean;
}

const BottomDrawerListOptions = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ListWithItems | null>(null);
  const [originalName, setOriginalName] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSearch, setEmailSearch] = useState<User[]>([]);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);

  const [searchUsers, { data: searchUsersData }] = useLazyQuery(SEARCHUSERS);
  const [editList] = useMutation(EDITLIST);
  const [shareList] = useMutation(SHARELIST);
  const [deleteList] = useMutation(DELETELIST);
  const [makeEditorViewer] = useMutation(MAKEEDITORVIEWER);
  const [makeViewerEditor] = useMutation(MAKEVIEWEREDITOR);
  const [removeUserFromList] = useMutation(REMOVEUSERFROMLIST);
  const [leaveList] = useMutation(LEAVELIST);

  const [user, setUser, currentListIndex, setCurrentListIndex] = useUserStore(
    (store) => [
      store.user,
      store.setUser,
      store.currentListIndex,
      store.setCurrentListIndex,
    ]
  );
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const setToastMessage = useToastStoreSelectors.use.setMessage();
  const setToastType = useToastStoreSelectors.use.setType();

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        if (!user) return;
        if (currentListIndex !== null) {
          const currentList = user.lists[currentListIndex];
          setList(currentList);
          setOriginalName(currentList.name);
          setNewName(currentList.name);
          if (!currentList.sharedWith) {
            setSharedUsers([]);
            return;
          }
          setSharedUsers(
            currentList.sharedWith.map((user) => {
              return {
                ...user,
                isEditor:
                  currentList.editors.filter((editor) => editor === user.id)
                    .length > 0,
              };
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchList();
  }, []);

  useEffect(() => {
    setEmailSearch(searchUsersData?.findUsersByEmail || []);
  }, [searchUsersData]);

  const search = async () => {
    if (!email) return;
    setEmail("");
    const res = await searchUsers({
      variables: {
        email,
      },
    });

    if (!res.data.findUsersByEmail || res.data.findUsersByEmail.length === 0) {
      setToastMessage("No users found with that email");
      setToastType("error");
      setTimeout(() => {
        setToastMessage("");
        setToastType("");
      }, 3000);
      return;
    }

    if (res.data.findUsersByEmail) {
      if (res.data.findUsersByEmail.length > 1) {
        setToastMessage("Multiple users found with that email");
        setToastType("error");
        setTimeout(() => {
          setToastMessage("");
          setToastType("");
        }, 3000);
        return;
      }

      if (res.data.findUsersByEmail.length === 1) {
        share(res.data.findUsersByEmail[0]);
      }
    }
  };

  const share = async (searchUser: User) => {
    try {
      if (!searchUser || !list) return;
      let alreadyShared =
        list.sharedWith.filter((user: User) => user.email === searchUser.email)
          ?.length > 0;

      if (alreadyShared) return;

      const variables = {
        listId: list.id,
        uid: searchUser.id,
      };

      const response = await shareList({
        variables: variables,
      });

      if (!response.data.shareList) return;

      if (user) {
        setUser({
          ...user,
          lists: user.lists!.map((list) => {
            if (list.id === response.data.shareList.id) {
              return response.data.shareList;
            }
            return list;
          }),
        });
      }

      setSharedUsers([
        ...sharedUsers,
        {
          ...searchUser,
          isEditor: false,
        },
      ]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const removeUser = async (id: string) => {
    if (!list) return;

    const response = await removeUserFromList({
      variables: {
        listId: list.id,
        uid: id,
      },
    });

    if (!response.data.removeUserFromList) return;

    if (user) {
      setUser({
        ...user,
        lists: user.lists!.map((list) => {
          if (list.id === response.data.removeUserFromList.id) {
            list.sharedWith = response.data.removeUserFromList.sharedWith;
            list.editors = response.data.removeUserFromList.editors;
          }
          return list;
        }),
      });
    }

    setSharedUsers(
      sharedUsers.filter((user) => {
        return user.id !== id;
      })
    );
  };

  const makeEditor = async (id: string) => {
    if (!list) return;

    const response = await makeViewerEditor({
      variables: {
        listId: list.id,
        uid: id,
      },
    });
    if (!response.data.makeViewerEditor) return;

    if (user) {
      setUser({
        ...user,
        lists: user.lists!.map((list) => {
          if (list.id === response.data.makeViewerEditor.id) {
            list.editors = response.data.makeViewerEditor.editors;
          }
          return list;
        }),
      });
    }

    setSharedUsers(
      sharedUsers.map((user) => {
        if (user.id === id) {
          user.isEditor = true;
        }
        return user;
      })
    );
  };

  const makeViewer = async (id: string) => {
    if (!list) return;

    const response = await makeEditorViewer({
      variables: {
        listId: list.id,
        uid: id,
      },
    });
    if (!response.data.makeEditorViewer) return;

    if (user) {
      setUser({
        ...user,
        lists: user.lists!.map((list) => {
          if (list.id === response.data.makeEditorViewer.id) {
            list.editors = response.data.makeEditorViewer.editors;
          }
          return list;
        }),
      });
    }

    setSharedUsers(
      sharedUsers.map((user) => {
        if (user.id === id) {
          user.isEditor = false;
        }
        return user;
      })
    );
  };

  const leave = async () => {
    if (!list || !user) return;

    const response = await leaveList({
      variables: {
        listId: list.id,
        uid: user!.id,
      },
    });

    if (!response.data.removeUserFromList) return;

    if (user) {
      setUser({
        ...user,
        lists: user.lists!.filter((list) => {
          return list.id !== response.data.removeUserFromList.id;
        }),
      });
    }

    setCurrentListIndex(currentListIndex! - 1);
    closeDrawer("BOTTOM");
  };

  const handleDelete = async () => {
    if (!list) return;
    try {
      const response = await deleteList({
        variables: {
          id: list.id,
        },
      });
      if (!response.data.deleteList) return;

      if (user) {
        setUser({
          ...user,
          lists: user.lists!.filter(
            (list) => list.id !== response.data.deleteList.id
          ),
        });
      }

      setCurrentListIndex(currentListIndex! - 1);
      closeDrawer("BOTTOM");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{list?.name}</h1>
      <div className="flex flex-col">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-gunmetal dark:text-snow">
              List name
            </span>
          </label>
          <input
            type="text"
            placeholder="List Name"
            className="text-gunmetal bg-fog border border-davy dark:border-none rounded-xl px-4 py-2 mb-4 w-full text-lg"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        {list && user && list.shareable && list.ownerId === user.id && (
          <div className="flex flex-col mt-4">
            <div className="form-control w-full">
              <div className="w-full flex items-stretch mb-4">
                <input
                  ref={searchRef}
                  type="text"
                  className="w-full bg-fog text-gunmetal rounded-l-xl px-4 py-2 text-lg placeholder:italic grow-1"
                  placeholder="Add user email to share list"
                  value={email}
                  onChange={({
                    target: { value },
                  }: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(value);
                    // if (value) {
                    //   search(value);
                    // }
                  }}
                />
                <button
                  className="w-fit text-lg px-2 py-1 bg-electric-indigo rounded-r-xl text-snow flex items-center shrink-0"
                  onClick={search}
                >
                  <AddIcon />
                  Share
                </button>
              </div>
            </div>

            {sharedUsers && sharedUsers.length > 0 && (
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-gunmetal dark:text-snow text-lg">
                    <th></th>
                    <th>Email</th>
                    <th>Can Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {sharedUsers.map((user) => {
                    return (
                      <tr
                        key={user.id}
                        className="text-gunmetal dark:text-snow"
                      >
                        <td>
                          <button onClick={() => removeUser(user.id)}>
                            <CloseIcon className="text-red-500" />
                          </button>
                        </td>
                        <td>{user.email}</td>
                        <td className="flex justify-center">
                          <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={user.isEditor}
                            onChange={() => {
                              if (user.isEditor) {
                                makeViewer(user.id);
                              } else {
                                makeEditor(user.id);
                              }
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
        <div className="flex flex-col mt-4">
          <button
            className="bg-electric-violet  text-snow rounded-xl px-4 py-2 w-full text-2xl disabled:bg-fog disabled:text-davy disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors duration-350 ease-in-out"
            disabled={!newName || newName === originalName}
            onClick={async () => {
              try {
                const variables = {
                  listId: list?.id,
                  contents: JSON.stringify({
                    name: newName,
                  }),
                };
                const response = await editList({
                  variables: variables,
                });
                if (!response.data.editList) return;

                setNewName(response.data.editList.name);
                setOriginalName(response.data.editList.name);
                if (user) {
                  setUser({
                    ...user,
                    lists: user.lists!.map((list) => {
                      if (list.id === response.data.editList.id) {
                        return response.data.editList;
                      }
                      return list;
                    }),
                  });
                }
              } catch (error: any) {
                console.log(error.message);
              }
            }}
          >
            Update
          </button>
          {user && list?.ownerId === user.id && list?.deleteable && (
            <button
              className="w-full text-2xl rounded-xl bg-fog border-red-700 text-red-700 border-2 mt-4 flex items-center justify-center px-4 py-2"
              disabled={list.deleteable}
              onClick={handleDelete}
            >
              <DeleteOutlineIcon className="mr-1 text-red-700" />
              Delete
            </button>
          )}
          {user && list?.ownerId !== user.id && (
            <button
              onClick={leave}
              disabled={!user || list?.ownerId === user.id}
              className="w-full text-2xl rounded-xl bg-fog border-red-700 text-red-700 border-2 mt-4 flex items-center justify-center px-4 py-2"
            >
              <ExitToAppIcon className="mr-1 text-red-700" />
              Leave
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomDrawerListOptions;
