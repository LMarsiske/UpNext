import { Poppins } from "next/font/google";
import Header from "./components/header";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import Container from "./components/container";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import Modal from "./components/Modal/modal";

export const metadata = {
  title: "UpNext",
  description:
    "Keep track of what you're watching and what you're watching next",
};

interface LayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const session = await getServerSession(AuthOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <Header />
          <Container>{children}</Container>
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
