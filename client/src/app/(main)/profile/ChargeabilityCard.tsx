
import React from "react";
import { ShowcaseSection } from "components/Layouts/showcase-section";

export default function ChargeabilityCard() {
  const loadability = 30;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (loadability / 100) * circumference;

  return (
    <ShowcaseSection title="Cargabilidad actual" className="!p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Circular Chart */}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e2d5ee"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#65417f"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#65417f"
              fontSize="20"
              fontWeight="bold"
            >
              {loadability}%
            </text>
          </svg>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            ¿Qué es esto?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
            Es el parámetro utilizado para medir la carga de trabajo de un
            empleado en relación a su tiempo total disponible y sus proyectos
            asignados.
          </p>
        </div>
      </div>
    </ShowcaseSection>
  );
}
