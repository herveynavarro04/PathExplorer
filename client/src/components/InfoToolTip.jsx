import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export default function InfoTooltip() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTooltip = () => {
    if (isMobile) {
      setShowTooltip((prev) => !prev);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleTooltip}
        onMouseEnter={() => !isMobile && setShowTooltip(true)}
        onMouseLeave={() => !isMobile && setShowTooltip(false)}
        className="text-purple-300 text-lg"
      >
        <FaInfoCircle className="text-lg" />
      </button>

      {showTooltip && (
        <div className="absolute right-full top-full mt-2 mr-2 w-72 p-4 bg-[#2c0352] text-gray-200 rounded-md shadow-lg text-sm z-50">
            <p className="mb-2">
            Este es tu nivel actual dentro de Accenture. Realiza más proyectos
            para ir aumentando de nivel.
            </p>
            <p>
            Existen niveles del 1 al 12, el 1 siendo el puesto más alto a alcanzar.
            </p>
        </div>
        )}


    </div>
  );
}
