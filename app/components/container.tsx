import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-full px-4 md:px-6 py-4 ">{children}</div>;
};

export default Container;
