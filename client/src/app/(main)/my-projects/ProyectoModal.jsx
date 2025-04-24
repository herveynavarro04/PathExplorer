'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ProyectoModal({ proyecto, onClose }) {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  if (!proyecto) return null;

  const formatearFecha = (fecha) => {
    try {
      const date = new Date(fecha);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return 'Fecha no disponible';
    }
  };

  const state = proyecto.vigente ? 'Vigente' : 'Finalizado';
  const colorstate = proyecto.vigente
    ? 'bg-green-200 text-green-800'
    : 'bg-red-200 text-red-800';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAnimation();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 350); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className={`bg-gradient-to-br from-[#4B0082] to-[#2E003E] text-white rounded-3xl p-8 max-w-3xl w-full relative shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'animate-fadeInModal' : 'animate-fadeOutModal'
        }`}
      >
        <button
          onClick={closeAnimation}
          className="absolute top-4 right-4 text-xl rounded-full px-1 hover:bg-white/20 transition-colors hover:cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b border-white/20 pb-2">
          {proyecto.nombre}
        </h2>

        <p className="mb-6 text-[#d1c9f1] leading-relaxed">{proyecto.descripcion}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Stack de tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              {proyecto.tecnologias.map((tech, idx) => (
                <span key={idx} className="bg-white/10 px-3 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>Inicio:</strong> {formatearFecha(proyecto.fecha_inicio)}</p>
            <p><strong>Fin:</strong> {formatearFecha(proyecto.fecha_fin)}</p>
            <p><strong>Administrador:</strong> {proyecto.administrador?.nombre || 'N/A'}</p>
            <p>
                <strong>Cliente:</strong>{' '}
                {proyecto.tipo === 'Interno' ? 'Interno' : proyecto.cliente}
            </p>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${colorstate}`}>
              {state}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
