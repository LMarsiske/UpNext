"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}
