import React from "react";
import Link from "next/link";
import { useModalStoreSelectors } from "@/stores/modal";

const NonAuthHeader: React.FC = () => {
  const setIsModalOpen = useModalStoreSelectors.use.setIsModalOpen();
  const setModalContent = useModalStoreSelectors.use.setModalContent();
  return (
    <div className="flex items-center space-x-4 text-2xl">
      <Link href="/">Discover</Link>
      <button
        onClick={() => {
          setModalContent("AUTH");
          setIsModalOpen(true);
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default NonAuthHeader;
