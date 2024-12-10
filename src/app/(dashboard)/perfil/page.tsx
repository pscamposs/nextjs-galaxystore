"use client";

import { DashboardHeader } from "@/components/dashboard/user/DashboardHeader";
import { HomeView } from "@/components/dashboard/user/view/Home";
import { Layout } from "@/components/Layout";
import Loader from "@/components/Loader";

import { UserProfile } from "@/types/FilterTypes";

import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile>();
  const [dashboardView, setDashboardView] = useState(<HomeView />);

  useEffect(() => {
    if (session?.user) {
      setProfile(session.user.profile as UserProfile);
    }
  }, [session]);

  if (!profile) return <Loader />;

  return (
    <Layout header={<DashboardHeader setView={setDashboardView} />}>
      <main className="max-md:my-14 p-8 w-[90%] m-auto bg-zinc-800 rounded-lg min-h-96 shadow shadow-zinc-800">
        {dashboardView}
      </main>
    </Layout>
  );
}
