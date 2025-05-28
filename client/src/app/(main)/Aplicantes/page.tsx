"use client";

import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage"; // Adjust path as needed
import TopApplicants from "components/Aplicaciones/aplicantes";


export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <h2 className="text-bold text-body-2xlg mb-4 mt-4 font-bold text-dark dark:text-white">
                Aplicantes a Proyectos
            </h2>
            {/* Fade-in for TopProjects */}
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-20 2xl:gap-7.5">
                <div className="col-span-12 grid">
                    <LoadingPage loading={loading}>
                        <TopApplicants />
                    </LoadingPage>
                    {/* <LoadingPage loading={loading}>
                        <TopAppsAct />
                    </LoadingPage> */}
                </div>
            </div>
        </>
    );
}
