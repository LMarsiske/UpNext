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
import { useBackdropStoreSelectors } from "@/stores/backdrop";
import { useItemStoreSelectors } from "@/stores/item";

import CreateListForm from "./create-list-form";
import AuthForm from "./auth-form";
import ItemInfo from "./item-info";

const Modal = () => {
  const { isModalOpen, modalContent, closeModal, setIsModalOpen } =
    useModalStore();
  const openBackdrop = useBackdropStoreSelectors.use.openBackdrop();
  const closeBackdrop = useBackdropStoreSelectors.use.closeBackdrop();
  const item = useItemStoreSelectors.use.item();

  return (
    <Root
      open={isModalOpen}
      onOpenChange={(open) => {
        if (open) {
          openBackdrop();
        } else {
          closeBackdrop();
        }
        setIsModalOpen(open);
      }}
    >
      <Portal>
        <Content className="z-[51] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] md:w-4/5 md:p-6 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-fog dark:bg-davy focus:outline-none shadow-neon">
          <div className="flex justify-between items-start">
            <Title className="text-2xl font-bold">
              {modalContent === "CREATE_LIST" && "Create a new list"}
              {modalContent === "AUTH" && "Sign in or create an account"}
              {modalContent === "MORE_INFO" &&
                item?.title &&
                `${item?.title} (${item?.release_year || "Unknown"})`}
            </Title>
            <Close asChild>
              <button
                className=""
                aria-label="Close"
                onClick={() => {
                  closeModal();
                }}
              >
                <CloseIcon
                  fontSize="large"
                  className="text-gunmetal dark:text-snow"
                />
              </button>
            </Close>
          </div>
          <Description className="text-mauve11 mt-[10px] mb-2 text-lg leading-normal">
            {modalContent === "CREATE_LIST" &&
              "Enter the name of your new list below."}
          </Description>
          {modalContent === "CREATE_LIST" && <CreateListForm />}
          {modalContent === "AUTH" && <AuthForm />}
          {modalContent === "MORE_INFO" && <ItemInfo />}
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
