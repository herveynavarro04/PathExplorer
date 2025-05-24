"use client";

import { useEffect, useState } from "react";
import { OverviewCardsGroup } from "./_components/overview-cards";
import LoadingPage from "components/LoadingPage"; 
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

          </div>
          <OverviewCardsGroup />
        </div>
            
        </LoadingPage>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-10 md:gap-6 2xl:mt-10 2xl:gap-7.5">
            <div className="col-span-12 grid">
            <LoadingPage loading={loading}>
                <TopAnalysis />
            </LoadingPage>
            </div>
        </div>
        
    </>
  );
}
