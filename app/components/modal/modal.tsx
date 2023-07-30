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
import TitleSkeleton from "./title-skeleton";

const Modal = () => {
  const {
    isModalOpen,
    modalContent,
    closeModal,
    setIsModalOpen,
    setModalContent,
  } = useModalStore();
  const openBackdrop = useBackdropStoreSelectors.use.openBackdrop();
  const closeBackdrop = useBackdropStoreSelectors.use.closeBackdrop();
  const item = useItemStoreSelectors.use.item();
  const setItem = useItemStoreSelectors.use.setItem();

  return (
    <Root
      open={isModalOpen}
      onOpenChange={(open) => {
        if (open) {
          openBackdrop();
        } else {
          closeBackdrop();
          setModalContent("");
          setItem(null);
        }
        setIsModalOpen(open);
      }}
    >
      <Portal>
        <Content className="z-[51] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85dvh] max-w-[50rem] w-[calc(100dvw-2rem)] md:w-4/5 p-2 md:p-6 translate-x-[-50%] translate-y-[-50%] rounded-xl bg-fog dark:bg-davy focus:outline-none shadow-neon">
          <div className="flex justify-between items-start">
            {modalContent === "CREATE_LIST" && (
              <Title asChild>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Create a new list
                </h2>
              </Title>
            )}
            {modalContent === "AUTH" && (
              <Title asChild>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Sign in or create an account
                </h2>
              </Title>
            )}
            {modalContent === "MORE_INFO" && item?.title && (
              <Title asChild>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {item?.title} ({item?.release_year || "Unknown"})
                </h2>
              </Title>
            )}
            {modalContent === "MORE_INFO" && !item?.title && (
              <Title asChild>
                <TitleSkeleton />
              </Title>
            )}

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
