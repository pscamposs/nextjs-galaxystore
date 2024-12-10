"use client";

import { AdminDashboardHeader } from "@/components/dashboard/admin/DashboardHeader";
import { HomeView } from "@/components/dashboard/user/view/Home";
import { Layout } from "@/components/Layout";

import React, { useState } from "react";

export default function UserDashboard() {
  const [dashboardView, setDashboardView] = useState(<HomeView />);

  return (
    <Layout header={<AdminDashboardHeader setView={setDashboardView} />}>
      <main className="max-md:my-14 p-8 w-[90%] m-auto bg-zinc-800 rounded-lg min-h-96 shadow shadow-zinc-800">
        {dashboardView}
      </main>
    </Layout>
  );
}
