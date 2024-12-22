"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
const items = [
  {
    name: "Example 1",
    href: "/",
  },
  {
    name: "Example 2",
    href: "/example-2",
  },
  {
    name: "Example 3",
    href: "/example-3",
  },
  {
    name: "Example 4",
    href: "/example-4",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <Link
            className={`${pathname === item.href ? "text-blue-500" : ""}`}
            key={item.name}
            href={item.href}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <Suspense>
        {isAuthenticated ? (
          <LogoutLink className={buttonVariants({ variant: "outline" })}>
            Sign Out
          </LogoutLink>
        ) : (
          <div className="flex items-center gap-4">
            <RegisterLink className={buttonVariants()}>Register</RegisterLink>
            <LoginLink className={buttonVariants({ variant: "outline" })}>
              Login
            </LoginLink>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Navbar;
