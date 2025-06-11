"use client";

import { useState } from "react";
import { Home, LayoutDashboard, User, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Generate Reports", href: "/dashboard/generate-report", icon: User },
  { name: "Reports", href: "/dashbaord/reports", icon: LayoutDashboard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden p-4 fixed gap-6 top-0 flex justify-between items-center ">
        <button onClick={toggleMobileMenu}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
        <span className="text-lg font-semibold">MESA</span>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed z-40 top-0 left-0 h-screen  border-r shadow transition-all duration-300",
          {
            "w-60": !isCollapsed,
            "w-20": isCollapsed,
            "translate-x-0": isMobileOpen,
            "-translate-x-full md:translate-x-0": !isMobileOpen,
          },
          "md:relative md:translate-x-0"
        )}
      >
        {/* Toggle Button */}
        <div className="p-4 border-b flex justify-between items-center">
          <span
            className={clsx("font-bold text-xl transition-all", {
              hidden: isCollapsed,
            })}
          >
            MESA
          </span>
          <button
            className="md:block hidden"
            onClick={toggleCollapse}
            title="Toggle sidebar"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-1 ">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 text-dark font-semibold hover:bg-gray-100 transition-all",
                {
                  "justify-center": isCollapsed,
                }
              )}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
