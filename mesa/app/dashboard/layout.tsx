import Sidebar from "@/components/layout/dashboard/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 ml-0 transition-all p-4">{children}</main>
      </div>
    </html>
  );
}
