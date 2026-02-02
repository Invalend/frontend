import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Provider } from "@/app/provider";
import {Analytics} from "@vercel/analytics/next"
import { Banner } from "@/components/common/Banner";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Invalend - Community pre-funds institutional leverage",
  description: "Invalend enables capital-efficient institutional leverage through community-backed prefunding with on-chain execution transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased bg-primary text-primary`}>
        <Analytics />
        <Banner />
        <Provider>
              {children}
        </Provider>
      </body>
    </html>
  );
}