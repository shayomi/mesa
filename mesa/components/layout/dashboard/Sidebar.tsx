"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Settings,
  X,
} from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true, // Special flag for exact matching
    },
    {
      name: "My businesses",
      href: "/dashboard/business-list",
      icon: FileText,
    },
    {
      name: "Generate Reports",
      href: "/dashboard/generate-report",
      icon: FileText,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: BarChart2,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop - Only visible when sidebar is open on mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          "sm:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-screen w-64 bg-[#172d56] shadow-lg",
          "transition-all duration-300 ease-in-out",
          "sm:relative sm:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 p-1 rounded-full text-white hover:bg-white/10",
            "sm:hidden"
          )}
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="px-6 py-5 font-bold text-2xl text-white border-b border-gray-600">
          MESA
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 px-0 mt-8">
          {navItems.map(({ name, href, icon: Icon, exact }) => {
            // Special handling for exact matches
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors",
                  "hover:bg-[#284276]",
                  isActive
                    ? "bg-white text-[#172d56] hover:bg-white/90"
                    : "text-white"
                )}
                onClick={onClose}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#172d56]" : "text-white"}
                />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
