"use client";

import { useEffect, useState } from "react";
// import { TopProjects } from "components/RecommendedProjects/top-projects";
import { OverviewCardsGroup } from "./_components/overview-cards";
import LoadingPage from "components/LoadingPage"; // Adjust path as needed
import { TopAnalysis } from "components/Analisis/analisis-empleados";
import { ButtonCardGroup } from "./_components/register";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <LoadingPage loading={loading}>
        <div className=" grid gap-4 md:gap-6 2xl:gap-7.5 ">
        <div className="flex justify-between">
            <div className="pt-5">
              <Breadcrumb pageName="Project Manager Dashboard" />
            </div>
            <ButtonCardGroup />
  
          </div>

                
                <OverviewCardsGroup />
        </div>
            
        </LoadingPage>
        {/* Fade-in for TopProjects */}
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-20 2xl:gap-7.5">
            <div className="col-span-12 grid">
            <LoadingPage loading={loading}>
                <TopAnalysis />
            </LoadingPage>
            </div>
        </div>
        
    </>
  );
}
