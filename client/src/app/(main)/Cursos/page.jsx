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
    <main className="min-h-screen text-white">

          {/* Contenido de la página */}
          <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Cursos</h1>

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
    </main>
  );
}
