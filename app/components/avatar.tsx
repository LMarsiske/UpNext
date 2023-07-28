import React from "react";
import Image from "next/image";
import AvatarImg from "@/assets/images/avatar.svg";

const Avatar = ({ name, icon }: { name?: string; icon?: string }) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  };
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 shrink-0">
      {icon && (
        <Image src={icon} alt={name || "User avatar"} width={32} height={32} />
      )}

      {name && !icon && (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {getInitials(name)}
        </span>
      )}

      {!name && !icon && (
        <Image src={AvatarImg} alt="Avatar" width={32} height={32} />
      )}
    </div>
  );
};

export default Avatar;
