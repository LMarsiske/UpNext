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
  return (
    <div className="md:ml-4">
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
