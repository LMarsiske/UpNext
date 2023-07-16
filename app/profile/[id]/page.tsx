"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserSelectors } from "@/stores/user";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/app/components/ThemeChanger";

const ProfilePage = () => {
  const user = useUserSelectors.use.user();
  const setUser = useUserSelectors.use.setUser();

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !user) return;

    console.log(user);
  }, [user]);

  if (!session || !user) {
    router.push("/");
    return null;
  }
  return (
    <>
      <div className="w-full rounded-xl bg-fog dark:bg-davy text-gunmetal dark:text-snow flex flex-col items-center mb-8">
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>
          Created account:{" "}
          {new Date(parseInt(user.createdAt)).toLocaleDateString()}
        </h2>
      </div>
      <div className="w-full rounded-xl bg-fog dark:bg-davy text-gunmetal dark:text-snow flex flex-col items-center">
        <ThemeChanger />
      </div>
    </>
  );
};

export default ProfilePage;
