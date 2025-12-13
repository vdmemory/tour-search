import { AppProviders } from "@/app/providers";

import "../src/app/styles/globals.scss";
import { geistMono, geistSans } from "@/app/fonts";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="uk">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
