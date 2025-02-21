import type { Metadata } from "next";
import {Roboto_Mono, Kumar_One, Inter} from "next/font/google";
import "./globals.css";
import {twMerge} from "tailwind-merge";
import { Providers } from '@/src/providers/theme';

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
  title: "Locai",
  description: "Locai is a chat application for local models",
    icons: {
        icon: '@/src/assets/icons/home-smile.svg',
}
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" >
        <body
            className={twMerge(
                robertoMono.variable,
                kumarOne.variable,
                inter.variable,
                'antialiased bg-background text-foreground font-robertoMono '
            )}
        >
        <Providers >
            {children}
        </Providers>
        </body>
        </html>
    )
}