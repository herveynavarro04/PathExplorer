// src/components/ProyectoCard.jsx
"use client";
import React from "react";

export default function ProyectoCard({ proyecto, onVerMas }) {
  return (
    <div className="rounded-xl p-6 shadow-md bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA]">
      <div className="w-[calc(100%+48px)] ml-[-24px] h-20 bg-gradient-to-t from-white/10 to-white/0 flex items-center px-6 justify-center">
        <h2 className="text-white text-xl font-medium">{proyecto.title}</h2>
      </div>

      <div className="relative w-full px-2 pt-5 text-[#d1c9f1]">
        <p className="text-sm">{proyecto.resumen}</p>
        <div className="mt-4">
          <button
            className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
            onClick={onVerMas}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
}
