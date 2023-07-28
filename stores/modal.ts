import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";
import { useBackdropStore } from "./backdrop";

interface ModalState {
  isModalOpen: boolean;
  modalContent: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalContent: (content: string) => void;
  openModal: (content: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalContent: "",
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
  setModalContent: (content) => set(() => ({ modalContent: content })),
  openModal: (content) => {
    useBackdropStore.getState().openBackdrop();
    set(() => ({ isModalOpen: true, modalContent: content }));
  },
  closeModal: () => {
    useBackdropStore.getState().closeBackdrop();
    set(() => ({ isModalOpen: false, modalContent: "" }));
  },
}));

export const useModalStoreSelectors = createSelectors(useModalStore);
