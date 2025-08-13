"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import Header from "@/components/layout/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Fixed Sidebar - Overlays content on mobile */}
      <div
        className={`fixed inset-y-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Header - Always full width */}
      <div className="fixed top-0 left-0 right-0 h-16 z-30">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content - Never moves */}
      <main className="mt-16 h-screen overflow-y-auto px-6 py-12 sm:ml-64">
        {children}
      </main>
    </>
  );
}
