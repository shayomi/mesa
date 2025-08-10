"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, BarChart2, Settings } from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      name: "Generate Reports",
      href: "/dashboard/generate-report",
      icon: FileText,
    },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity",
          isOpen ? "block" : "hidden"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-screen w-64 bg-[#172d56] shadow-md transition-transform duration-300 sm:relative sm:translate-x-0 sm:block",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-12 py-5 font-bold text-2xl text-white border-b border-gray-600">
          MESA
        </div>

        <nav className="flex flex-col gap-8 px-6 mt-12">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-6 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-[#172d56]"
                    : "text-white hover:bg-[#284276]"
                )}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
