import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSection from "@/components/dashboard/Details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div className="min-h-full">
      <DashboardHeader />
      <DashboardSection id={id} />
    </div>
  );
}
