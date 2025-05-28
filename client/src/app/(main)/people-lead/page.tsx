"use client";

import { useEffect, useState } from "react";
// import { TopProjects } from "components/RecommendedProjects/top-projects";
import { OverviewCardsGroup } from "./components/overview-cards";
import LoadingPage from "components/LoadingPage"; // Adjust path as needed
import { TopAnalysis } from "components/AnalisisEmpleados/analisis-empleados";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import { TeamCardGroup } from "./components/team-card";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingPage loading={loading}>
        <div className="grid gap-4 md:gap-6 2xl:gap-7.5 ">
          <div className="flex justify-between">
            <div className="pt-5">
              <Breadcrumb pageName="People Lead Dashboard" />
            </div>
          </div>

          <OverviewCardsGroup />
        </div>
      </LoadingPage>
      {/* Fade-in for TopProjects */}
      <div className="min-h-screen mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-20 2xl:gap-7.5">
        <div className="max-h-[700px] flex-1 col-span-12 grid">
          <LoadingPage loading={loading}>
            <TeamCardGroup />
          </LoadingPage>
        </div>
      </div>
    </>
  );
}
