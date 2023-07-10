import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-9/12 mx-auto px-4 sm:px-6 py-4 ">{children}</div>;
};

export default Container;
