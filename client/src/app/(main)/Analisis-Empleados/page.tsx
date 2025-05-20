"use client";

import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage"; // Adjust path as needed
import { TopAppsAct } from "components/Proyectos/actualizacion";
import { TopAppsAuto } from "components/Proyectos/automatizacion";
import { AllAnalysis } from "components/Analisis/analisis-empleados/index-completo";


export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Fade-in for TopProjects */}
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-20 2xl:gap-7.5">
                <div className="col-span-12 grid">
                    <LoadingPage loading={loading}>
                        <AllAnalysis />
                    </LoadingPage>
                </div>
            </div>
        </>
    );
}
