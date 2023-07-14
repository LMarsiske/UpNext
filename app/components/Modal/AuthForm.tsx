//@ts-nocheck
import React, { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import github from "@/assets/images/github.svg";
import google from "@/assets/images/google.svg";

interface GetProvidersResponse {
  [provider: string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    icon: string;
  };
}

const AuthForm = () => {
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
    <div className="flex flex-col items-center mt-4">
      {providers &&
        Object.values(providers).map((provider, index) => {
          return (
            <button
              key={provider.id}
              className={`bg-snow text-gunmetal  rounded-xl px-4 py-2 w-full text-2xl flex justify-center items-center ${
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

export default AuthForm;
