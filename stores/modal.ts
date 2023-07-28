import { create } from "zustand";
import createSelectors from "@/lib/createSelectors";

interface ModalState {
  isBackdropOpen: boolean;
  isModalOpen: boolean;
  modalContent: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalContent: (content: string) => void;
  setIsBackdropOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isBackdropOpen: false,
  isModalOpen: false,
  modalContent: "",
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
  setModalContent: (content) => set(() => ({ modalContent: content })),
  setIsBackdropOpen: (isOpen) => set(() => ({ isBackdropOpen: isOpen })),
}));

export const useModalStoreSelectors = createSelectors(useModalStore);
