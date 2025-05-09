import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';


interface ProyectoModalProps {
  proyecto: any; 
  onClose: () => void;
}

const ProyectoModal: React.FC<ProyectoModalProps> = ({ proyecto, onClose }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  if (!proyecto) return null;


  //formatee la fecha aquí
  const formatearFecha = (fecha: string) => {
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

  const state = proyecto.active ? 'Vigente' : 'Finalizado';
  const colorstate = proyecto.active
    ? 'bg-green-200 text-green-800'
    : 'bg-red-200 text-red-800';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    }, 0);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity backdrop-blur-sm">
  <div
    ref={modalRef}
    className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 pb-3 max-w-3xl w-full relative shadow-xl transition-all duration-300 ease-in-out ${
      isVisible ? 'animate-fadeInModal' : 'animate-fadeOutModal'
    }`}
  >
    <button
      onClick={closeAnimation}
      className="absolute top-4 right-4 text-lg font-bold bg-[#e0cfe6] hover:bg-[#d1c0db] text-[#4B0082] rounded-full w-8 h-8 flex items-center justify-center transition"
    >
      ✕
    </button>

    <h2 className="text-2xl font-semibold mb-4 border-b border-[#d7bff1] pb-2">
      {proyecto.projectName}
    </h2>

    <p className="mb-6 text-[#4b3b61] leading-relaxed">
      {proyecto.information}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Stack de tecnologías</h3>
        <div className="flex flex-wrap gap-2">
          {proyecto.technologies.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="bg-white text-[#4b3b61] px-3 py-1 rounded-full border border-[#e5d6f1] text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p><strong>Inicio:</strong> {formatearFecha(proyecto.startDate)}</p>
        <p><strong>Fin:</strong> {formatearFecha(proyecto.endDate)}</p>
        <p><strong>Administrador:</strong> {proyecto.manager || 'N/A'}</p>
        <p><strong>Cliente:</strong> {proyecto.client}</p>
        <p><strong>Tipo:</strong> {proyecto.projectType}</p>
        <div
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
            proyecto.active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {state}
        </div>
      </div>
    </div>
  </div>
</div>,
document.body
//no borrar este document.body ya que es para que el background blur agarre toda la pantalla

  );
};

export default ProyectoModal;
