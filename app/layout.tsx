import { Poppins } from "next/font/google"
import Header from "./components/header"
import "../styles/globals.css"
import { ReactNode } from "react"
import { Providers } from "./providers"

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Traversy Media",
  description: "Web development tutorials and courses",
  keywords:
    "web development, web design, javascript, react, node, angular, vue, html, css",
}

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
