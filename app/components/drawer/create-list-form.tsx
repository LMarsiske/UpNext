import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATELIST } from "@/lib/mutations";
import { useUserSelectors } from "@/stores/user";
import { useDrawerStoreSelectors } from "@/stores/drawer";
import { ListWithItems } from "@/types/list";
import type { User } from "@/types/user";

const BottomDrawerCreateListForm = () => {
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();
  const closeDrawer = useDrawerStoreSelectors.use.closeDrawer();
  const [listName, setListName] = useState("");
  const [createList] = useMutation(CREATELIST);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newList = await createList({
        variables: {
          name: listName,
          uid: user?.id,
          shareable: true,
          deleteable: true,
        },
      });
      setListName("");
      if (newList.data.createList) {
        const updatedUser = {
          ...user,
          lists: [...user?.lists!, newList.data.createList] as ListWithItems[],
        } as User;
        setUser(updatedUser);
      }
      closeDrawer("BOTTOM");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Create a new list</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          className="bg-fog dark:bg-davy rounded-xl px-4 py-2 mt-4 mb-4 w-full text-lg"
          type="text"
          placeholder="List name"
          onChange={handleChange}
        />
        <button
          className="bg-electric-violet  text-snow rounded-xl px-4 py-2 w-full text-2xl disabled:bg-fog disabled:text-davy disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors duration-350 ease-in-out"
          type="submit"
          disabled={!listName}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BottomDrawerCreateListForm;
