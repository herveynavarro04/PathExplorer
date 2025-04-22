// src/app/Aplicacion/page.js
"use client";
import React, { useState } from "react";
import ProyectoCard from "./ProyectoCard";
import DetalleProyectoModal from "./DetalleProyectoModal";

export default function Page() {
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const proyectos = [
    {
      id: 1,
      title: "Nombre del Proyecto",
      resumen: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      descripcion: "Descripción larga del proyecto...",
      stack: ["NextJS", "SpringBoot", "PostgreSQL"],
      inicio: "14 Marzo 2025",
      fin: "20 Junio 2025",
      tipo: "proyecto interno",
      admin: "Sofía Schneider"
    },
    {
      id: 2,
      title: "Frontend para Pagina Web para Bimbo",
      resumen: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      descripcion: "Descripción larga del proyecto...",
      stack: ["npm", "JavaScript", "HTML", "CSS", "React", "Next"],
      inicio: "10 Abril 2025",
      fin: "20 Septiembre 2025",
      tipo: "proyecto interno",
      admin: "Mauricio Lozano"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white">
      <div className="flex">
        <div className="hidden md:block w-64 p-4"> {/* Sidebar placeholder */} </div>

        <div className="flex-1">
          <div className="h-16 border-b border-purple-700 flex items-center px-4"> {/* Header placeholder */} </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Proyectos disponibles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {proyectos.map((p) => (
                <ProyectoCard
                  key={p.id}
                  proyecto={p}
                  onVerMas={() => setSelectedProyecto(p)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProyecto && (
        <DetalleProyectoModal
          proyecto={selectedProyecto}
          onClose={() => setSelectedProyecto(null)}
        />
      )}
    </main>
  );
}