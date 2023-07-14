"use client";
import React from "react";
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import CloseIcon from "@mui/icons-material/Close";
import { useModalStore } from "@/stores/modal";

import CreateListForm from "./createListForm";
import AuthForm from "./authForm";

const Modal = () => {
  const { isModalOpen, setIsModalOpen, modalContent, setModalContent } =
    useModalStore();
  return (
    <Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Portal>
        <Overlay className="bg-gray-800 bg-opacity-80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-fog dark:bg-davy p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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
          <Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                setIsModalOpen(false);
                setModalContent("");
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
