'use client';
import React from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function ProyectoCardClient({ proyecto, onVerMas }) {
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

  return (
    <div className="relative w-full max-w-4xl h-auto rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 overflow-hidden shadow-xl bg-gradient-to-l from-[#7B2FE0] to-[#3A005F]">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-20 flex items-center justify-between px-6">
        <h2 className="text-white text-lg md:text-xl font-medium">
          {proyecto.nombre}
        </h2>
        <div className="text-white text-2xl">
          {proyecto.vigente ? (
            <Image
              src="/disc.svg"
              alt="Proyecto actual"
              width={24}
              height={24}
            />
          ) : (
            <FaCheck className="text-gray-300" />
          )}
        </div>
      </div>

      <div className="relative z-20 px-6 pt-24">
        <div className="bg-white/10 p-4 rounded-md text-sm text-[#d1c9f1]">
          <p>{proyecto.descripcion}</p>
        </div>

        <div className="flex justify-end mt-4 mb-4">
        <button
          className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
          onClick={() => onVerMas(proyecto)}
        >
          Ver más
        </button>

        </div>
      </div>
    </div>
  );
}



  //   <div className="rounded-2xl p-6 shadow-md bg-gradient-to-tl  from-[#006b75] via-[#7B2FE0] to-[#3A005F] text-white relative overflow-hidden">
  //     <div className="absolute inset-0 bg-black/30 z-0" />
  //     <div className="w-full text-center text-2xl font-semibold mb-4">
  //       {proyecto.title}
  //     </div>

  //     <div className="bg-white/10 p-4 rounded text-sm text-[#d1c9f1] mb-4">
  //       {proyecto.resumen}
  //     </div>

  //     <div>
  //       <h3 className="text-lg font-medium mb-2">Stack de tecnologías</h3>
  //       <div className="flex flex-wrap gap-2">
  //         {proyecto.tecnologias.map((tech, idx) => (
  //           <span key={idx} className="bg-[#3E0567] px-3 py-1 rounded-full text-sm">
  //             {tech}
  //           </span>
  //         ))}
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
  //       <div>
  //         <p className="text-[#c3b6f7] font-semibold">Inicio</p>
  //         <p className="bg-[#3E0567] rounded px-2 py-1 mt-1 text-center">
  //           {formatearFecha(proyecto.fecha_inicio)}
  //         </p>
  //       </div>
  //       <div>
  //         <p className="text-[#c3b6f7] font-semibold">Fin</p>
  //         <p className="bg-[#3E0567] rounded px-2 py-1 mt-1 text-center">
  //           {formatearFecha(proyecto.fecha_fin)}
  //         </p>
  //       </div>
  //       <div className="col-span-1">
  //         <p className="text-[#c3b6f7] font-semibold">Administrador del proyecto</p>
  //         <p className="bg-[#3E0567] rounded px-2 py-1 mt-1 text-center">
  //           {proyecto.administrador}
  //         </p>
  //       </div>
  //       <div className="col-span-1">
  //         <p className="text-[#c3b6f7] font-semibold">Tipo</p>
  //         <p className="bg-[#3E0567] rounded px-2 py-1 mt-1 text-center">
  //           {proyecto.tipo}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
// }
