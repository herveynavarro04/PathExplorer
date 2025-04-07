"use client";
import React, { useState } from "react";
import CursosCard from "@/components/CursosCard";
import AgregarCursoCard from "@/components/AgregarCursoCard";

export default function Page() {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      title: "Introducción a Python",
      description: "Principios básicos del lenguaje de programación, Python.",
      duracion: "3 meses",
      institucion: "IBM",
      fecha: "05/03/2022"
    }
  ]);

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { ...nuevoCurso, id: Date.now() }]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 p-4">
          {/* ... */}
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Header */}
          <div className="h-16 border-b border-purple-700 flex items-center px-4">
            {/* ... */}
          </div>

          {/* Contenido de la página */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Cursos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <CursosCard
                  key={curso.id}
                  title={curso.title}
                  description={curso.description}
                  duracion={curso.duracion}
                  institucion={curso.institucion}
                  fecha={curso.fecha}
                />
              ))}

              <AgregarCursoCard onAddCurso={handleAgregarCurso} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
