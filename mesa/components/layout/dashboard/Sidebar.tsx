// components/layout/dashboard/Sidebar.tsx

import { cn } from "@/lib/utils";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
          "fixed z-50 top-0 left-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 sm:relative sm:translate-x-0 sm:block",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 font-bold text-2xl border-b border-gray-200">
          MESA
        </div>
        <nav className="flex flex-col  p-6 gap-8 mt-16">
          <a href="/dashboard">Dashboard</a>
          <a href="/generate-report">Generate Reports</a>
          <a href="/reports">Reports</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>
    </>
  );
}
