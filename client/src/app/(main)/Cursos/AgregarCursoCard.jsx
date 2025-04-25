"use client"

import React, { useState } from 'react';

export default function AgregarCursoCard({ onAddCurso}) {
  const [expanded, setExpanded] = useState(false);

  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const handleSubmit = ()=> {
    if (!nombre || !duracion || !institucion || !fecha || !descripcion) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const nuevoCurso = {
        title: nombre,
        description: descripcion,
        duracion,
        institucion,
        fecha
    };

    onAddCurso(nuevoCurso);
    setExpanded(false);
    setNombre('');
    setDuracion('');
    setInstitucion('');
    setFecha('');
    setDescripcion('');
  };

  return (
    <>
      {/* Tarjetita o botón “+” cuando NO está expandido */}
      {!expanded && (
        <div className="w-48 h-24 p-4 bg-purple-700/60 rounded-xl shadow-md cursor-pointer transition duration-300 ease-in-out hover:bg-purple-800 hover:-translate-y-1 hover:scale-110 focus:outline-none active:scale-95">
          <button onClick={handleExpand} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mb-2 fill-current"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3H4a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
          </svg>
            <span>Agregar curso</span>
          </button>
        </div>
      )}

      {/* Overlay a pantalla completa cuando SÍ está expandido */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          {/* Aquí la tarjeta grande con gradiente */}
          <div
            className="rounded-xl p-6 shadow-md relative bg-gradient-to-tl
                       from-[#4C49ED] to-[#6F1DAA] w-[700px] h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-20 
                            bg-gradient-to-t from-white/10 to-white/0 
                            z-10 flex items-center px-6">
              <h2 className="text-white text-xl font-medium">
                <input type="text" className="ml-2 p-1 rounded" placeholder='Nombre del curso...' onChange={(e) => setNombre(e.target.value)}/>
              </h2>
            </div>

            <div className="relative w-full px-2 pt-[5.25rem]">
              {/* Campos de formulario */}
              <p className="text-[#232323] text-lg">
                Duración:
                <input type="text" className="bg-[#A368C3FF] ml-2 p-1 rounded" value={duracion} onChange={(e) => setDuracion(e.target.value)}/>
              </p>
              <p className="text-[#232323] text-lg">
                Institución:
                <input type="text" className="bg-[#A368C3FF] my-2 ml-2 p-1 rounded" value={institucion} onChange={(e) => setInstitucion(e.target.value)}/>
              </p>
              <p className="text-[#232323] text-lg">
                Fecha de obtención:
                <input type="date" className="bg-[#A368C3FF] ml-2 p-1 rounded" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
              </p>
              <p className="text-[#232323] text-lg">
                Descripción:
                <textarea
                  className="bg-[#A368C3FF] ml-2 p-1 rounded w-full h-24"
                  placeholder="Escribe una breve descripción del curso aquí..."
                  maxLength={255}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </p>
              <button className="float-right bg-[#3E0567] hover:bg-purple-800 text-white m-2 px-4 py-2 rounded  cursor-pointer transition duration-300 ease-in-out hover:bg-purple-800 hover:-translate-y-1 hover:scale-110 focus:outline-none active:scale-95" 
                      onClick={handleSubmit}>
                Agregar Curso
              </button>

            </div>

            {/* Botón para cerrar si deseas */}
            <button 
              className="text-white absolute top-3 right-4 z-20 rounded-full px-1 hover:bg-white/20 transition-colors hover:cursor-pointer"
              onClick={handleClose}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
