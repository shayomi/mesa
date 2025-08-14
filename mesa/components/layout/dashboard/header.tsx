"use client";

import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );

  // Color classes to assign for each breadcrumb (looped if path is longer)
  const colorClasses = [
    "text-[#2A4E78]",
    "text-[#F46036]",
    "text-[#D72638]",
    "text-[#4176AF]",
    "text-[#3AB0FF]",
  ];

  return (
    <section className="mt-0 w-full bg-white ">
      <div className="flex flex-row justify-between items-center px-6 py-4 border-b-[1px] border-gray-200">
        {/* Left: Breadcrumb + Menu */}
        <div className="flex items-center gap-4">
          <button className="sm:hidden" onClick={onMenuClick}>
            <Menu size={24} />
          </button>

          {/* Breadcrumb with per-color styling */}
          <div className="hidden ml-0 sm:ml-64 text-sm font-semibold tracking-wide sm:flex flex-wrap gap-1 items-center">
            {pathSegments.map((segment, index) => (
              <span key={index} className="flex items-center gap-1">
                <span className={cn(colorClasses[index % colorClasses.length])}>
                  {segment}
                </span>
                {index < pathSegments.length - 1 && (
                  <span className="text-gray-400">{">"}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Add Button + User */}
        <div className="flex flex-row gap-4 items-center">
          <Link href="/dashboard/business/create">
            <Button variant="outline" size="lg">
              Add Business
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </section>
  );
};

export default Header;
