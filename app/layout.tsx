import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
const Header = dynamic(() => import("./components/header"));
import Modal from "./components/Modal/modal";
import Container from "./components/container";
import Providers from "./providers";
import "../styles/globals.css";

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
