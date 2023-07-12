import React from "react";

interface TabsContainerProps {
  children: React.ReactNode;
}

const TabsContainer = ({ children }: TabsContainerProps) => {
  return <div className="flex cursor-pointer">{children}</div>;
};

export default TabsContainer;
