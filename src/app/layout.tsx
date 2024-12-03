"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/services/queryClient";
import { FilterProvider } from "@/context/use-filter-context";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ModalContextProvider from "@/context/use-modal-context";
import PluginInfoModal from "@/components/modal/PluginInfoModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={inter.className}
        style={{
          position: "relative",
          height: "100dvh",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Toaster position="top-center" theme="dark" richColors />
            <FilterProvider>
              <ModalContextProvider>
                <PluginInfoModal />
                {children}
              </ModalContextProvider>
            </FilterProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
