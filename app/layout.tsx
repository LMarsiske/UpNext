import { Poppins } from "next/font/google";
import Header from "./components/header";
import "../styles/globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import Container from "./components/container";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

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
      <body className={poppins.className}>
        <Providers session={session}>
          <Header />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
