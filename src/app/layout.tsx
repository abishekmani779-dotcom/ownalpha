import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OwnAlpha | DeFi Pop-Culture Market",
  description: "Trade Movie NFTs tied to real-world box office performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-[#F0F2F5] text-slate-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
