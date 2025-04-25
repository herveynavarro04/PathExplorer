import React from "react";

export default function ChargeabilityCard() {
  const loadability = 10;

  return (
    <div className="relative w-full max-w-3xl h-70 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tl from-[#006b75] via-[#7B2FE0] to-[#3A005F] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 flex flex-col h-full justify-between">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
          <div className="w-40 h-auto relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ffffff22"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#c0bdc2"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (loadability / 100) * 282.6}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#c0bdc2"
                fontSize="20"
              >
                {loadability}%
              </text>
            </svg>
          </div>

          <div className="text-white max-w-sm mt-4 md:mt-0">
            <h3 className="text-xl font-semibold mb-2">¿Qué es esto?</h3>
            <p className="text-sm text-white/70">
              Es el parámetro utilizado para medir la carga de trabajo de un
              empleado en relación a su tiempo total disponible y sus proyectos
              asignados.
            </p>
          </div>
        </div>

        <div className="w-full px-6 py-4 bg-gradient-to-b from-white/10 to-white/0 z-20">
          <h2 className="text-[#c0bdc2] text-lg md:text-2xl font-medium">
            Cargabilidad actual
          </h2>
        </div>
      </div>
    </div>
  );
}
