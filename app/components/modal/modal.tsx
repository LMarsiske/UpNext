"use client";
import React from "react";
import {
  Root,
  Portal,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import CloseIcon from "@mui/icons-material/Close";
import { useModalStore } from "@/stores/modal";

import CreateListForm from "./create-list-form";
import AuthForm from "./auth-form";
import ItemInfo from "./item-info";

const Modal = () => {
  const { isModalOpen, modalContent, setIsModalOpen, closeModal } =
    useModalStore();

  return (
    <Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Portal>
        <Content className="z-[51] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh]  max-w-[900px] min-w[250px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-fog dark:bg-davy focus:outline-none">
          <Title className="text-mauve12 m-0 text-2xl font-medium">
            {modalContent === "CREATE_LIST" && "Create a new list"}
            {modalContent === "AUTH" && "Sign in or create an account"}
          </Title>
          <Description className="text-mauve11 mt-[10px] mb-2 text-lg leading-normal">
            {modalContent === "CREATE_LIST" &&
              "Enter the name of your new list below."}
          </Description>
          {modalContent === "CREATE_LIST" && <CreateListForm />}
          {modalContent === "AUTH" && <AuthForm />}
          {modalContent === "MORE_INFO" && <ItemInfo />}
          <Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                closeModal();
              }}
            >
              <CloseIcon />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
