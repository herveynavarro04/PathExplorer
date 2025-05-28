"use client";

import React from "react";

interface ProjectUserCardProps {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  client: string;
  manager: string;
  technologies: string[];
  active: boolean;
  position: string;
}

const ProjectUserCard = ({
  projectId,
  projectName,
  startDate,
  endDate,
  client,
  manager,
  technologies,
  active,
  position,
}: ProjectUserCardProps) => {
  const formatearFecha = (fecha: string) => {
    try {
      const date = new Date(fecha);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return "Fecha no disponible";
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-[#e5d6f1]">
      <h3 className="text-lg font-semibold text-[#4b3b61] mb-2">
        {projectName}
      </h3>
      <p className="text-sm text-[#4b3b61] mb-4">
        {position} - {client}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#4b3b61]">
        <p>
          <strong>Inicio:</strong> {formatearFecha(startDate)}
        </p>
        <p>
          <strong>Fin:</strong> {formatearFecha(endDate)}
        </p>
        <p>
          <strong>Administrador:</strong> {manager || "N/A"}
        </p>
        <p>
          {active ? (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Activo
            </span>
          ) : (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              Finalizado
            </span>
          )}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-1">Tecnologías:</h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-[#f3e8ff] text-[#4b3b61] px-3 py-1 rounded-full text-xs border border-[#e5d6f1]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectUserCard;
