import { buttonVariants } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";

const NotLoggedIn = () => {
  return (
    <div className="h-[70vh] w-full flex justify-center items-center">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">MATE, You are not logged in</h1>
        <RegisterLink className={buttonVariants()}>Register</RegisterLink>
      </div>
    </div>
  );
};

export default NotLoggedIn;
