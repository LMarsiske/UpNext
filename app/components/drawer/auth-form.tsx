//@ts-nocheck
import React, { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import github from "@/assets/images/github.svg";
import google from "@/assets/images/google.svg";

const BottomDrawerAuthForm = () => {
  const [providers, setProviders] = useState<GetProvidersResponse | null>(null);
  useEffect(() => {
    const getAuthProviders = async () => {
      const authProviders = await getProviders();
      Object.values(authProviders).map((provider) => {
        if (provider.id === "github") {
          provider.icon = github;
        }
        if (provider.id === "google") {
          provider.icon = google;
        }
      });
      setProviders(authProviders);
    };
    getAuthProviders();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-gunmetal dark:text-snow text-2xl font-bold mb-8">
        Sign in or create an account
      </h1>
      {providers &&
        Object.values(providers).map((provider, index) => {
          return (
            <button
              key={provider.id}
              className={`text-gunmetal bg-fog rounded-xl px-4 py-2  mb-8 w-full text-2xl flex justify-center items-center ${
                index !== Object.keys(providers).length - 1 && "mb-4"
              }`}
              type="submit"
              onClick={() => signIn(provider.id)}
            >
              <Image
                src={provider.icon}
                width={32}
                height={32}
                alt={`${provider.name} logo`}
                className="mr-4"
              />
              Sign in with {provider.name}
            </button>
          );
        })}
    </div>
  );
};

export default BottomDrawerAuthForm;
