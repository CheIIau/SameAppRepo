import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/UI/Header/Header";
import { Suspense } from "react";
import FullScreenSpinner from "@/components/UI/Spinner/FullScreenSpinner";
import { Cart } from "@/components/UI/Cart/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <Cart />
                <main className="flex flex-col flex-1 p-4 w-full max-w-5xl mx-auto box-border">
                    <Suspense fallback={<FullScreenSpinner color="#3730a3" />}>
                        {children}
                    </Suspense>
                </main>
            </body>
        </html>
    );
}
