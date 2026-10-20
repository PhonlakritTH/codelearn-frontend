import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Providers from "./Provider"; 

import Navbar from "@/app/Components/Navbar";
import { Noto_Sans_Thai } from "next/font/google";


const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-thai",
});


export const metadata: Metadata = {
  title: "CodeLearn",
  description: "แพลตฟอร์มเรียนเขียนโปรแกรมภาษา C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html lang="th">
    <body className={notoSansThai.variable}>
      <Providers>
        {/* <Navbar /> */}
        {children}
      </Providers>
    </body>
  </html>
);
  
}