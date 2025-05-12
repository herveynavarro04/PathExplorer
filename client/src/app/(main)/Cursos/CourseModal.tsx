import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface CourseModalProps {
  course: any;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  if (!course) return null;

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
        className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 pb-4 max-w-3xl w-full relative shadow-xl transition-all duration-300 ease-in-out ${
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
          {course.title}
        </h2>

        <p className="mb-6 text-[#4b3b61] leading-relaxed">{course.information}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2 text-sm">
            <p>
              <strong>Duración:</strong> {course.duration} horas
            </p>
            <p>
              <strong>Institución:</strong> {course.institution || 'N/A'}
            </p>
       
            
          </div>

          <div className="flex md:justify-end md:items-start">
            <div className="inline-block rounded-full bg-[#e8d8fa] text-[#4b3b61] px-4 py-1 text-sm font-medium shadow-sm">
            <strong>Fecha de obtención:</strong>{' '}
              {formatearFecha(course.date_obtained)}
            </div>
          </div>
        </div>
        <p>
              <strong>URL:</strong>{' '}
              <a
                href={course.course_url}
                className="hover:underline text-purple-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {course.course_url}
              </a>
            </p>
      </div>
    </div>,
    document.body
  );
};

export default CourseModal;
