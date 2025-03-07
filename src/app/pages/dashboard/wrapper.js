"use client";
import { SessionProvider } from "next-auth/react"; // Allows to access the session object in the child components

export default function DashboardClientWrapper({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}