"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserSelectors } from "@/stores/user";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/app/components/theme-changer";

const ProfilePage = () => {
  const user = useUserSelectors.use.user();

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !user) return;
  }, [user]);

  if (!session || !user) {
    router.push("/");
    return null;
  }
  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold mb-2">Profile Info</h1>
      <div className="w-full rounded-xl bg-fog dark:bg-davy text-gunmetal dark:text-snow flex flex-col items-center mb-8">
        <div className="overflow-x-auto">
          <table className="table text-xl">
            <tbody>
              {/* row 1 */}
              <tr className="border-0">
                <td className="font-semibold">Name</td>
                <td>{user.name}</td>
              </tr>
              {/* row 2 */}
              <tr className="border-0">
                <td className="font-semibold">Email</td>
                <td>{user.email}</td>
              </tr>
              {/* row 3 */}
              <tr className="border-0">
                <td className="font-semibold">Acount Created</td>
                <td>
                  {new Date(parseInt(user.createdAt)).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">Theme</h1>
      <div className="w-full rounded-xl bg-fog dark:bg-davy text-gunmetal dark:text-snow flex flex-col items-center">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default ProfilePage;
