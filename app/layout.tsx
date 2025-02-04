import type { Metadata } from "next";
import {Roboto_Mono, Kumar_One, Inter} from "next/font/google";
import "./globals.css";
import {twMerge} from "tailwind-merge";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});
const robertoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});
const kumarOne = Kumar_One({
    variable: "--font-kumar-one",
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
  title: "Locallm",
  description: "Locallm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
            robertoMono.variable,
            kumarOne.variable,
            inter.variable,
            `antialiased font-roberto-mono text-black bg-white`
        )}
      >
        {children}
      </body>
    </html>
  );
}
