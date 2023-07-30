import React from "react";

interface TabProps {
  children: React.ReactNode;
  handleClick: () => void;
  active: boolean;
  isFirstTab: boolean;
  isLastTab: boolean;
}

const Tab = ({
  children,
  handleClick,
  active,
  isFirstTab,
  isLastTab,
}: TabProps) => {
  return (
    <div
      className={`flex justify-between items-center px-2 py-2  ${
        active ? "bg-sky-blue text-gunmetal" : ""
      } ${isFirstTab && "rounded-t-xl"} ${
        isLastTab && "rounded-b-xl"
      } font-semibold text-xl`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Tab;
