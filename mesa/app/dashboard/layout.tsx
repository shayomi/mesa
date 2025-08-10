"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import Header from "@/components/layout/dashboard/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head />
      <body className="bg-white">
        {/* Fixed Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 z-40">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Fixed Header */}
        <div className="fixed top-0 left-64 right-0 h-16 z-30">
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Scrollable Main Content */}
        <main className="ml-64 mt-16 h-screen overflow-y-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
