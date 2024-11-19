"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalContextProvider from "../context/use-modal-context";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/services/queryClient";
import { FilterProvider } from "@/context/use-filter-context";
import { SessionProvider } from "next-auth/react";
import { CartContexProvider } from "@/context/use-cart-context";
import { Toaster } from "sonner";

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
            <CartContexProvider>
              <FilterProvider>
                <ModalContextProvider>{children}</ModalContextProvider>
              </FilterProvider>
            </CartContexProvider>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
