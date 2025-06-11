import DashboardSection from "@/components/dashboard/Details";
import Header from "@/components/dashboard/header";

import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      {/* <SummarySection /> */}
      <DashboardSection />
    </div>
  );
};

export default page;
