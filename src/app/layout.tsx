import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/providers/RQProvider";

// const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "LOL Info",
  description: "리그 오브 레전드 관련 정보를 확인하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
