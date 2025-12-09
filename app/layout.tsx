import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/app/providers";

import "../src/app/styles/globals.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="uk">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
