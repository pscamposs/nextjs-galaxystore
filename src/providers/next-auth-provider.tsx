"use client";
import { SessionProvider } from "next-auth/react";

interface AuthProividerProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProividerProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
