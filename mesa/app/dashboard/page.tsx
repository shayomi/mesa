import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSection from "@/components/dashboard/Details";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-full">
      <DashboardHeader />
      <DashboardSection params={params} />
    </div>
  );
}
