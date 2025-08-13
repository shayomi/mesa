import DashboardLayout from "@/components/layout/layout-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head />
      <body className="bg-white">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </>
  );
}
