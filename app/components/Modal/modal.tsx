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

const Modal = () => {
  const { isModalOpen, setIsModalOpen, modalContent, setModalContent } =
    useModalStore();
  return (
    <Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Portal>
        <Overlay className="bg-gray-800 bg-opacity-80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-fog dark:bg-davy p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Title className="text-mauve12 m-0 text-xl font-medium">
            {modalContent === "CREATE_LIST" && "Create a new list"}
          </Title>
          <Description className="text-mauve11 mt-[10px] mb-2 text-lg leading-normal">
            {modalContent === "CREATE_LIST" &&
              "Enter the name of your new list below."}
          </Description>
          {/* <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-right text-[15px]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-violet11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              defaultValue="@peduarte"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Close asChild>
              <button
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={() => {
                  setIsModalOpen(false);
                  setModalContent("");
                }}
              >
                Save changes
              </button>
            </Close>
          </div> */}
          {modalContent === "CREATE_LIST" && <CreateListForm />}
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

// import React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";

// const DialogDemo = () => (
//   <Root>
//     <Trigger asChild>
//       <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
//         Edit profile
//       </button>
//     </Trigger>
//     <Portal>
//       <Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
//       <Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
//         <Title className="text-mauve12 m-0 text-[17px] font-medium">
//           Edit profile
//         </Title>
//         <Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
//           Make changes to your profile here. Click save when you're done.
//         </Description>
//         <fieldset className="mb-[15px] flex items-center gap-5">
//           <label
//             className="text-violet11 w-[90px] text-right text-[15px]"
//             htmlFor="name"
//           >
//             Name
//           </label>
//           <input
//             className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
//             id="name"
//             defaultValue="Pedro Duarte"
//           />
//         </fieldset>
//         <fieldset className="mb-[15px] flex items-center gap-5">
//           <label
//             className="text-violet11 w-[90px] text-right text-[15px]"
//             htmlFor="username"
//           >
//             Username
//           </label>
//           <input
//             className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
//             id="username"
//             defaultValue="@peduarte"
//           />
//         </fieldset>
//         <div className="mt-[25px] flex justify-end">
//           <Close asChild>
//             <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
//               Save changes
//             </button>
//           </Close>
//         </div>
//         <Close asChild>
//           <button
//             className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
//             aria-label="Close"
//           >
//             <Cross2Icon />
//           </button>
//         </Close>
//       </Content>
//     </Portal>
//   </Root>
// );

// export default DialogDemo;
