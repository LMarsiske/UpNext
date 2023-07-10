import React from "react";

interface TabProps {
  children: React.ReactNode;
  handleClick: () => void;
  active: boolean;
  isFirstTab: boolean;
}

const Tab = ({ children, handleClick, active, isFirstTab }: TabProps) => {
  return (
    <div
      className={`px-4 pb-2 text-gunmetal dark:text-snow  text-2xl border-b-2 border-transparent hover:border-fog hover: border-opacity-50 ${
        active && "border-gunmetal dark:border-snow border-opacity-100"
      } ${isFirstTab && "pl-0"}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Tab;
