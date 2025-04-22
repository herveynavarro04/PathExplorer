// src/components/DetalleProyectoModal.jsx
"use client";
import React, { useState } from "react";
import Confirmacion from "./Confirmacion";

export default function DetalleProyectoModal({ proyecto, onClose }) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const aplicar = () => {
    setMostrarConfirmacion(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative rounded-xl p-6 bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA] w-[700px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white absolute top-3 right-4"
          onClick={onClose}
        >
          X
        </button>

        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
          <h2 className="text-white text-xl font-medium">{proyecto.title}</h2>
        </div>

        <div className="relative w-full px-2 pt-[5.25rem] text-[#d1c9f1]">
          <p className="mb-4">{proyecto.descripcion}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Stack de tecnologías:</h3>
            <div className="flex gap-2 flex-wrap">
              {proyecto.stack.map((tech, i) => (
                <span key={i} className="bg-purple-600 px-2 py-1 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Inicio:</strong> {proyecto.inicio}</p>
            <p><strong>Fin:</strong> {proyecto.fin}</p>
            <p><strong>Administrador:</strong> {proyecto.admin}</p>
            <p><strong>Tipo:</strong> {proyecto.tipo}</p>
          </div>

          <button
            className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
            onClick={aplicar}
          >
            Aplicar a proyecto
          </button>
        </div>

        {mostrarConfirmacion && (
          <Confirmacion
            onConfirm={() => {
              setMostrarConfirmacion(false);
              onClose(); // Aquí podrías también guardar info o mostrar algo
              alert("Aplicación enviada!");
            }}
            onCancel={() => setMostrarConfirmacion(false)}
          />
        )}
      </div>
    </div>
  );
}
