// app/layout.tsx or dashboard layout
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
      <body className="h-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/custom/dashboard/Sidebar";
// import Navbar from "@/components/custom/dashboard/Navbar";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   const handleToggleSidebar = () => setMobileSidebarOpen((prev) => !prev);
//   const handleCloseSidebar = () => setMobileSidebarOpen(false);

//   return (
//     <main className="h-screen flex">
//       <Sidebar
//         isMobileOpen={isMobileSidebarOpen}
//         onCloseAction={handleCloseSidebar}
//       />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar onToggleSidebarAction={handleToggleSidebar} />
//         <main className="flex-1 p-4 overflow-auto">{children}</main>
//       </div>
//     </main>
//   );
// }
