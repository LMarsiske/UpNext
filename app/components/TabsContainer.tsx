import React from "react";

interface TabsContainerProps {
  children: React.ReactNode;
}

const TabsContainer = ({ children }: TabsContainerProps) => {
  return (
    <div className="flex cursor-pointer border-b border-fog border-opacity-50">
      {children}
    </div>
  );
};

export default TabsContainer;
