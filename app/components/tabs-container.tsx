import React from "react";

interface TabsContainerProps {
  children: React.ReactNode;
}

const TabsContainer = ({ children }: TabsContainerProps) => {
  return (
    <div className="flex flex-col rounded-xl bg-fog dark:bg-davy cursor-pointer">
      {children}
    </div>
  );
};

export default TabsContainer;
