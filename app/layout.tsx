import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Brand System Creator",
  description: "Generate comprehensive brand system packs for Cursor AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <DarkModeToggle />
        {children}
      </body>
    </html>
  );
}
