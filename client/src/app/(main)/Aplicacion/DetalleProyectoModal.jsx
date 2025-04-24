"use client";

import React, { useState } from "react";

export default function DetalleProyectoModal({ proyecto, onClose }) {
  const [expanded, setExpanded] = useState(true); // Siempre inicia expandido

  const handleClose = () => {
    setExpanded(false);
    onClose(); // Notifica al parent que cierre el modal
  };

  if (!expanded) return null; // Si no está expandido, no muestra nada

  return (
    <>
      {/* Overlay a pantalla completa */}
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={handleClose}
      >
        {/* Modal con info del proyecto */}
        <div
          className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA] w-[700px] h-auto"
          onClick={(e) => e.stopPropagation()} // Evita cerrar si haces clic dentro
        >

          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
            <h2 className="text-white text-xl font-medium">{proyecto.title}</h2>
          </div>

          <div className="relative w-full px-2 pt-[5.25rem] text-[#d1c9f1]">
            <p className="mb-4">{proyecto.descripcion}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Stack de tecnologías:</h3>
              <div className="flex gap-2 flex-wrap">
                {proyecto.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-600 px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <p>
                <strong>Inicio:</strong> {proyecto.inicio}
              </p>
              <p>
                <strong>Fin:</strong> {proyecto.fin}
              </p>
              <p>
                <strong>Administrador:</strong> {proyecto.admin}
              </p>
              <p>
                <strong>Tipo:</strong> {proyecto.tipo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
