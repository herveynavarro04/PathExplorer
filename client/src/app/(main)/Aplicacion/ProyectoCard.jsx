"use client";

import React, { useState } from "react";

export default function DetalleProyectoModal({ proyecto }) {
  const [expanded, setExpanded] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [aplicado, setAplicado] = useState(false);

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
    setMostrarConfirmacion(false);
    setAplicado(false);
  };

  const handleAplicar = () => {
    setMostrarConfirmacion(true); // Muestra confirmación
  };

  const confirmarAplicacion = () => {
    setMostrarConfirmacion(false);
    setAplicado(true); // Muestra mensaje de éxito
  };

  return (
    <>
      {/* Card del proyecto */}
      <div className="rounded-xl p-6 shadow-md relative bg-gradient-to-l from-[#7B2FE0] to-[#3A005F]">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
          <h2 className="text-white text-xl font-medium">{proyecto.title}</h2>
        </div>

        <div className="relative w-full h-full px-2 py-0 pt-21">
          <p className="mb-4 text-[#d1c9f1] text-lg">{proyecto.resumen}</p>
          <button
            className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
            onClick={handleExpand}
          >
            Ver más
          </button>
        </div>
      </div>

      {/* Modal expandido */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="relative w-[700px] p-6 bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA] h-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-4 text-white z-20" onClick={handleClose}>
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

              {/* Aplicar a proyecto */}
              {!aplicado && (
                <button
                  className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
                  onClick={handleAplicar}
                >
                  Aplicar a proyecto
                </button>
              )}
              {aplicado && (
                <p className="text-green-300 font-semibold">¡Aplicación enviada!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setMostrarConfirmacion(false)}>
          <div className="bg-purple-300 text-[#3E0567] p-6 rounded-xl shadow-md w-[350px]" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro de que quieres aplicar a este proyecto?
            </h2>
            <div className="flex justify-end gap-4">
              <button className="bg-white px-4 py-2 rounded hover:bg-gray-100" onClick={() => setMostrarConfirmacion(false)}>
                Cancelar
              </button>
              <button className="bg-[#3E0567] text-white px-4 py-2 rounded hover:bg-purple-900" onClick={confirmarAplicacion}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
