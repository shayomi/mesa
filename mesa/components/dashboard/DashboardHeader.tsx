// components/dashboard/DashboardGreeting.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Typography } from "../ui/typography";

export default function DashboardHeader() {
  const { user } = useUser();

  return (
    <div className="mb-6">
      <div className="flex flex-row justify-between gap-4">
        <Typography variant="h4" className="text-black/70 font-medium">
          Hello{" "}
          <span className="text-blue-700 font-bold">
            {user?.firstName || user?.username || "there"}
          </span>
          , here are your business list
        </Typography>
        <Typography variant="h3" className="text-black/70 font-medium">
          Overview
        </Typography>
      </div>
    </div>
  );
}
