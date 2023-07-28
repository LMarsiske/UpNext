//@ts-nocheck
import React, { useEffect, useRef } from "react";
import shave from "shave";

interface ShaveComponentProps {
  children: React.ReactNode;
  maxHeight: number;
  element: string;
  classNames: string;
}

const Shave = ({
  children,
  maxHeight,
  element = "div",
  classNames = "",
}: ShaveComponentProps) => {
  const shaveRef = useRef(null);

  useEffect(() => {
    if (shaveRef.current) {
      shave(shaveRef.current, maxHeight);
    }
  }, [shaveRef, maxHeight]);

  let Element = element as keyof JSX.IntrinsicElements;

  return (
    <Element ref={shaveRef} className={classNames}>
      {children}
    </Element>
  );
};

export default Shave;
