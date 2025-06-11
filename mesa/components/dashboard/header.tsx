import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <section className="mt-0 w-full">
      <div className="flex flex-row gap-6 justify-between items-center px-6">
        <Typography variant="h3" className="font-bold text-[#1A283E]">
          TECHNIA DASHBOARD
        </Typography>
        <div className="flex flex-row gap-4 items-center">
          <Button variant="outline" size="lg">
            Add Business
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </section>
  );
};

export default Header;
