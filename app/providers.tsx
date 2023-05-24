"use client";

import { ThemeProvider } from "next-themes";
import { ApolloContextProvider } from "@/context/ApolloContext";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

interface ProviderProps {
  children: ReactNode;
  session: AppProps["pageProps"]["session"];
}

export function Providers({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <ApolloContextProvider>{children}</ApolloContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
