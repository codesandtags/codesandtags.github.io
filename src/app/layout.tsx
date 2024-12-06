import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Inter } from "next/font/google";

import "./globals.css";

const poppins = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Codes and Tags",
  description: "Domina el desarrollo Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
