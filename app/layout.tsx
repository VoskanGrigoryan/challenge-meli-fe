import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "@mantine/core/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Challenge meli",
  description: "Gestor de tareas para challenge de Mercado Libre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
