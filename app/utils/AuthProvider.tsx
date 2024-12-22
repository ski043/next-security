"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <KindeProvider>{children}</KindeProvider>;
};
