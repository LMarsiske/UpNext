"use client"

import { ThemeProvider } from "next-themes"
import { ApolloContextProvider } from "@/context/ApolloContext"
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ApolloContextProvider>{children}</ApolloContextProvider>
    </ThemeProvider>
  )
}
