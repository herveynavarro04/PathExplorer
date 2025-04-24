"use client";

import React from "react";

export default function ProyectoCard({ proyecto, onVerMas }) {
  return (
    <div className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA]">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
        <h2 className="text-white text-xl font-medium">{proyecto.title}</h2>
      </div>

      <div className="relative w-full h-full px-2 py-0 pt-21">
        <p className="mb-4 text-[#d1c9f1] text-lg">{proyecto.resumen}</p>
        <button
          className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
          onClick={onVerMas}
        >
          Ver más
        </button>
      </div>
    </div>
  );
}
