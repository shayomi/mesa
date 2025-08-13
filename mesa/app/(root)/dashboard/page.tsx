import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSection from "@/components/dashboard/Details";

export default function Page() {
  return (
    <div className="min-h-full">
      <DashboardHeader />
      <DashboardSection />
    </div>
  );
}
