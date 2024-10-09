import React from "react";
import Navbar from "../components/app/landing/Navbar";
import { DashboardSidebar } from "../components/app/dashboard/sidebar";

function Dashboard() {
  return (
    <div className="">
      <Navbar />
      <div className="w-full">
        <DashboardSidebar />
      </div>
    </div>
  );
}

export default Dashboard;
