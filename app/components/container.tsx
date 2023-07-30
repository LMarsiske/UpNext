import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="overflow-hidden w-full h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] lg:w-[70%] lg:min-w-[calc(1024px-3rem)] lg:max-w-[84rem] 3col:max-w-col3 px-4 md:px-6 lg:px-0 py-2 md:py-4 lg:mx-auto">
      {children}
    </div>
  );
};

export default Container;
