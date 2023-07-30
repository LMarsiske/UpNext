//@ts-nocheck
"use client";
import React, { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { useBackdropStoreSelectors } from "@/stores/backdrop";

const Select = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const openBackdrop = useBackdropStoreSelectors.use.openBackdrop();
  const closeBackdrop = useBackdropStoreSelectors.use.closeBackdrop();

  return (
    <SelectPrimitive.Root
      {...props}
      onOpenChange={(open) => {
        if (open) {
          openBackdrop();
        } else {
          closeBackdrop();
        }
        setIsOpen(open);
      }}
    >
      <SelectPrimitive.Trigger
        ref={forwardedRef}
        className="w-2/3 bg-fog dark:bg-davy text-gunmetal dark:text-snow flex justify-between items-center text-lg rounded-xl p-2 font-semibold"
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="w-select max-h-select-height bg-fog dark:bg-davy text-gunmetal dark:text-snow flex justify-between items-center text-lg rounded-xl mt-1 z-[51] shadow-neon"
        >
          <SelectPrimitive.ScrollUpButton>
            <KeyboardArrowUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton>
            <KeyboardArrowDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
Select.displayName = "Select";

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { isFirstItem, isLastItem, ...itemProps } = props;
  return (
    <SelectPrimitive.Item
      {...itemProps}
      ref={forwardedRef}
      className={`flex justify-between items-center w-select-item p-2 my-1 data-[highlighted]:bg-davy data-[highlighted]:text-snow dark:data-[highlighted]:bg-fog dark:data-[highlighted]:text-gunmetal z-[51] ${
        isLastItem && "rounded-b-xl mb-0"
      } ${isFirstItem && "rounded-t-xl mt-0"}`}
    >
      <SelectPrimitive.ItemText className="cursor-pointer">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
