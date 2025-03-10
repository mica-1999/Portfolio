"use client";
import { SessionProvider } from "next-auth/react";

export default function LoginClientWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
