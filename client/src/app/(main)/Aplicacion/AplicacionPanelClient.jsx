"use client";

import React, { useEffect, useState } from "react";
import ProyectoCard from "./ProyectoCard";

export default function AplicacionPanelClient() {
  const [proyectos, setProyectos] = useState([]);
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      const res = await fetch("/proyectos.json");
      const data = await res.json();
      setProyectos(data);
    };

    fetchProyectos();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {proyectos.map((p) => (
          <ProyectoCard
            key={p.id}
            proyecto={p}
            onVerMas={() => setSelectedProyecto(p)}
          />
        ))}
      </div>
    </>
  );
}
