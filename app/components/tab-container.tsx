import React, { useCallback, useEffect, useState } from "react";
import { debounce, set } from "lodash";
import classes from "@/styles/tab-container.module.css";
import type { ListWithItems } from "@/types/list";
import WatchlistItem from "./watchlist-item";
import { useUserSelectors } from "@/stores/user";
import { WatchListItem } from "@/types/item";
import { SEARCHUSERS } from "@/lib/queries";
import {
  EDITLIST,
  SHARELIST,
  DELETELIST,
  MAKEEDITORVIEWER,
  MAKEVIEWEREDITOR,
  REMOVEUSERFROMLIST,
  LEAVELIST,
} from "@/lib/mutations";
import { useMutation, useLazyQuery } from "@apollo/client";
import { User } from "@/types/user";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface TabContainerProps {
  list: ListWithItems;
  index: number;
  setIndex: (idx: number) => void;
}

interface SharedUser extends User {
  isEditor: boolean;
}

const TabContainer = ({ list, index, setIndex }: TabContainerProps) => {
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();

  const [editList] = useMutation(EDITLIST);
  const [shareList] = useMutation(SHARELIST);
  const [deleteList] = useMutation(DELETELIST);
  const [makeEditorViewer] = useMutation(MAKEEDITORVIEWER);
  const [makeViewerEditor] = useMutation(MAKEVIEWEREDITOR);
  const [removeUserFromList] = useMutation(REMOVEUSERFROMLIST);
  const [leaveList] = useMutation(LEAVELIST);
  const [searchUsers, { data: searchUsersData }] = useLazyQuery(SEARCHUSERS);

  const [originalName, setOriginalName] = useState("");
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSearch, setEmailSearch] = useState<User[]>([]);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);

  useEffect(() => {
    console.log(list);
    setOriginalName(list.name);
    setNewName(list.name);
    if (!list.sharedWith) {
      setSharedUsers([]);
      return;
    }
    setSharedUsers(
      list.sharedWith.map((user) => {
        return {
          ...user,
          isEditor:
            list.editors.filter((editor) => editor === user.id).length > 0,
        };
      })
    );
  }, [list]);

  useEffect(() => {
    setEmailSearch(searchUsersData?.findUsersByEmail || []);
  }, [searchUsersData]);

  const search = useCallback(
    debounce((email: string) => {
      console.log(email);
      searchUsers({
        variables: {
          email,
        },
      });
    }, 150),
    []
  );

  const handleDelete = async () => {
    try {
      const response = await deleteList({
        variables: {
          id: list.id,
        },
      });
      console.log(response);
      if (!response.data.deleteList) return;

      if (user) {
        setUser({
          ...user,
          lists: user.lists!.filter(
            (list) => list.id !== response.data.deleteList.id
          ),
        });
      }

      setIndex(index - 1);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const share = async (searchUser: User) => {
    try {
      if (!searchUser) return;
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
      setEmail("");
      setEmailSearch([]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const removeUser = async (id: string) => {
    const response = await removeUserFromList({
      variables: {
        listId: list.id,
        uid: id,
      },
    });
    console.log(response);

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

  const leave = async () => {
    const response = await leaveList({
      variables: {
        listId: list.id,
        uid: user!.id,
      },
    });
    console.log(response);

    if (!response.data.removeUserFromList) return;

    if (user) {
      setUser({
        ...user,
        lists: user.lists!.filter((list) => {
          return list.id !== response.data.removeUserFromList.id;
        }),
      });
    }

    setIndex(index - 1);
  };

  const makeEditor = async (id: string) => {
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

  return (
    <div className={classes.tabContainer}>
      <div className={classes.itemContainer}>
        {/* <div className="flex">
          <div className="flex flex-col mx-4">
            <input
              className="border border-gunmetal dark:border-snow rounded-xl px-4 py-2 mt-4 mb-4 w-full text-lg"
              type="text"
              placeholder="List name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              className="bg-electric-violet  text-snow  rounded-xl px-4 py-2 w-full text-2xl disabled:bg-fog disabled:text-davy disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors duration-350 ease-in-out"
              disabled={!newName || newName === originalName}
              onClick={async () => {
                try {
                  const variables = {
                    listId: list.id,
                    contents: JSON.stringify({
                      name: newName,
                    }),
                  };
                  console.log(variables);
                  const response = await editList({
                    variables: variables,
                  });
                  console.log(response);
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
          </div>
          {list && user && list.shareable && list.ownerId === user.id && (
            <div className="flex flex-col mx-4">
              <input
                className="border border-gunmetal dark:border-snow rounded-xl px-4 py-2 mt-4 mb-4 w-full text-lg"
                type="text"
                placeholder="List name"
                value={email}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(value);
                  if (value) {
                    search(value);
                  }
                }}
              />
              {searchUsersData && searchUsersData.findUsersByEmail && (
                <ul>
                  {searchUsersData.findUsersByEmail.map((searchUser: User) => {
                    return (
                      <li
                        key={searchUser.id}
                        className="text-gunmetal dark:text-snow text-lg"
                      >
                        <SendIcon className="mr-1 text-gunmetal dark:text-snow" />
                        <button onClick={() => share(searchUser)}>
                          {searchUser.email}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <ul>
                {sharedUsers &&
                  sharedUsers.map((user) => {
                    return (
                      <li
                        key={user.id}
                        className="text-gunmetal dark:text-snow text-lg flex items-center"
                      >
                        <button onClick={() => removeUser(user.id)}>
                          <CloseIcon className="text-red-500" />
                        </button>

                        {user.email}
                        {user.isEditor ? (
                          <button onClick={() => makeViewer(user.id)}>
                            <VisibilityIcon className="mr-1 text-gunmetal dark:text-snow" />
                          </button>
                        ) : (
                          <button onClick={() => makeEditor(user.id)}>
                            <EditIcon className="mr-1 text-gunmetal dark:text-snow" />
                          </button>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {user && list.ownerId === user.id && list.deleteable && (
            <div className="flex flex-col mx-4">
              <button disabled={!list.deleteable} onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          {user && list.ownerId !== user.id && (
            <div className="flex flex-col mx-4">
              <button
                onClick={leave}
                disabled={!user || list.ownerId === user.id}
              >
                Leave
              </button>
            </div>
          )}
        </div> */}
        {list &&
          list.items &&
          list.items.length > 0 &&
          list.items.map((item: WatchListItem, index: number) => {
            return <WatchlistItem key={item.id} {...item} />;
          })}
        {!list ||
          !list.items ||
          (list.items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl mb-4 text-center">
                No items in this list
              </h2>
              <p className="text-2xl text-center">
                Add some items to get started
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TabContainer;
