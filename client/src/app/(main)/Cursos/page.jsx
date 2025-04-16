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
    },
    {
      id: 2,
      title: "Desarrollo Web con React",
      description: "Curso completo sobre React.js y su ecosistema.",
      duracion: "4 meses",
      institucion: "Coursera",
      fecha: "10/06/2022",
    },
    {
      id: 3,
      title: "Fundamentos de Inteligencia Artificial",
      description: "Introducción a los conceptos clave de IA.",
      duracion: "2 meses",
      institucion: "edX",
      fecha: "15/09/2022",
    },
    {
      id: 4,
      title: "Machine Learning Avanzado",
      description: "Técnicas avanzadas de aprendizaje automático.",
      duracion: "5 meses",
      institucion: "Google",
      fecha: "01/12/2022",
    },
    {
      id: 5,
      title: "Bases de Datos con SQL",
      description: "Aprende a diseñar y consultar bases de datos relacionales.",
      duracion: "3 meses",
      institucion: "Oracle",
      fecha: "20/01/2023",
    },
    {
      id: 6,
      title: "Desarrollo de APIs con Node.js",
      description: "Construcción de APIs RESTful usando Node y Express.",
      duracion: "2 meses",
      institucion: "Platzi",
      fecha: "10/03/2023",
    },
    {
      id: 7,
      title: "Diseño de Interfaces con Figma",
      description: "Diseño UI/UX profesional con Figma.",
      duracion: "1.5 meses",
      institucion: "Udemy",
      fecha: "05/05/2023",
    },
    {
      id: 8,
      title: "Docker y DevOps",
      description: "Uso de Docker, integración continua y despliegue automatizado.",
      duracion: "3 meses",
      institucion: "LinkedIn Learning",
      fecha: "15/07/2023",
    },
    {
      id: 9,
      title: "Introducción a la Ciberseguridad",
      description: "Conceptos básicos de seguridad informática.",
      duracion: "2 meses",
      institucion: "Cisco",
      fecha: "01/09/2023",
    },
    {
      id: 10,
      title: "Análisis de Datos con Python",
      description: "Limpieza, visualización y análisis de datos con pandas y matplotlib.",
      duracion: "4 meses",
      institucion: "DataCamp",
      fecha: "10/11/2023",
    },
  ]);

  const handleAgregarCurso = (nuevoCurso) => {
    setCursos([...cursos, { ...nuevoCurso, id: Date.now() }]);
  };

  return (
    <main className="relative h-full text-white p-5">
      <div className="relative z-30 bg-transparent p-4">
        <h1 className="text-3xl font-bold">Cursos</h1>
      </div>
  
      <div className="relative z-10 w-full max-h-[34rem] overflow-y-scroll no-scrollbar md:max-h-[41rem] md:scrollbar">

      
        <div className="p-4 space-y-4">
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
  
  </main>
  );
}
