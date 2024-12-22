import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Example3 = () => {
  return (
    <div>
      <Link className={buttonVariants()} href="/api/pdf">
        Generate PDF
      </Link>
    </div>
  );
};

export default Example3;
