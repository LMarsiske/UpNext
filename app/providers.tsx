"use client";

import { ThemeProvider } from "next-themes";
import { ApolloContextProvider } from "@/context/ApolloContext";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import ZustandHydrator from "@/context/ZustandHydrator";

interface ProviderProps {
  children: ReactNode;
  session: any;
}

export default function Providers({ children, session }: ProviderProps) {
  return (
    <ZustandHydrator>
      <SessionProvider session={session}>
        <ThemeProvider enableSystem={true} attribute="class">
          <ApolloContextProvider>{children}</ApolloContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </ZustandHydrator>
  );
}
