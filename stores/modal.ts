import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface ModalState {
  isModalOpen: boolean;
  modalContent: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalContent: (content: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalContent: "",
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
  setModalContent: (content) => set(() => ({ modalContent: content })),
}));

export const useModalStoreSelectors = createSelectors(useModalStore);
