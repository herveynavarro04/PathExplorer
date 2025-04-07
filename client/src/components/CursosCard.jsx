import React, { useState } from 'react';

export default function CursosCard({ title, description, duracion, institucion, fecha }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

    return (
      <>
          <div className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA]">
            
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
              <h2 className="text-white text-xl font-medium">
                {title}
              </h2>
            </div>

            <div className="relative w-full h-full px-2 py-0 pt-21">
              <p className="mb-4 text-[#232323] text-lg">
                {description}
              </p>
                {!expanded && (
                  <button 
                    className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded"
                    onClick={handleExpand}
                  >
                    Ver más
                  </button>
                )}
              <div className="flex absolute top-1 right-2 p-1">
                {/* Icono de reloj (SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3.5a.5.5 0 01.5.5v3l2.5 2.5a.5.5 0 01-.707.707l-2.646-2.647A.5.5 0 017.5 7.5V4a.5.5 0 01.5-.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8 2a6 6 0 100 12A6 6 0 008 2zM1 8a7 7 0 1114 0A7 7 0 011 8z"                  />
                    </svg>
              </div>
              {expanded && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={handleClose}>
                  <div
                    className="relative w-[700px] p-6 bg-gradient-to-tl
                       from-[#4C49ED] to-[#6F1DAA] w-[700px] h-auto rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                  <button className="absolute top-2 right-4 text-white" onClick={handleClose}>
                    X
                  </button>
                  <div className="absolute top-0 left-0 w-full h-20 
                          bg-gradient-to-t from-white/10 to-white/0 
                          z-10 flex items-center px-6">
                    <h2 className="text-white text-xl font-medium">{title}</h2>
                  </div>

                    <div className="relative w-full px-2 pt-[5.25rem]">
                      <p className="text-[#232323] text-lg p-1">
                        Duración: <span className="text-[#9d6bc1]">{duracion}</span>
                      </p>
                      <p className="text-[#232323] text-lg p-1">
                        Institución: <span className="text-[#9d6bc1]">{institucion}</span>
                      </p>
                      <p className="text-[#232323] text-lg p-1">
                        Fecha: <span className="text-[#9d6bc1]">{fecha}</span>
                      </p>
                      <p className="text-[#232323] text-lg p-1">
                        Descripción: <span className="text-[#9d6bc1]">{description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
      </>

    // Tarjeta Agile
    // <div className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA]">
      
    //   <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
    //     <h2 className="text-white text-xl font-medium">
    //       Fundamentos de Agile
    //     </h2>
    //   </div>

    //   <div className="relative w-full h-full px-2 py-0 pt-21">
    //     <p className="mb-4 text-[#232323] text-lg">
    //       Introducción de la metodología Agile para manejo y administración de proyectos.
    //     </p>
    //     <button className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded">
    //       Ver más
    //     </button>
      
    //     <div className="flex absolute top-1 right-2 p-1">
    //       {/* Icono de reloj (SVG) */}
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-6 w-6 fill-current"
    //           viewBox="0 0 16 16"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M13.485 1.885a.5.5 0 01.053.638l-6 8a.5.5 0 01-.793.074l-3-3a.5.5 0 01.707-.707l2.646 2.647L12.74 1.939a.5.5 0 01.745-.054z"
    //           />
    //           </svg>
    //     </div>
    //   </div>
    // </div>,
    
    // // Tarjeta Estructuras de Datos
    // <div className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl from-[#4C49ED] to-[#6F1DAA]">
      
    //   <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-10 flex items-center px-6">
    //     <h2 className="text-white text-xl font-medium">
    //       Estructuras de Datos
    //     </h2>
    //   </div>

    //   <div className="relative w-full h-full px-2 py-0 pt-21">
    //     <p className="mb-4 text-[#232323] text-lg">
    //       Principios de estructuras de datos en Python e inicios de principios de algoritmos.
    //     </p>
    //     <button className="bg-[#3E0567] hover:bg-purple-800 text-white px-4 py-2 rounded">
    //       Ver más
    //     </button>
      
    //     <div className="flex absolute top-1 right-2 p-1">
    //       {/* Icono de reloj (SVG) */}
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-6 w-6 fill-current"
    //           viewBox="0 0 16 16"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"
    //           />
    //           </svg>
    //     </div>
    //   </div>
    // </div>
    );
};
