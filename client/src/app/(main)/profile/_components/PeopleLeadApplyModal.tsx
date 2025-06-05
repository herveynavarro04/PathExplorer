"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PeopleLeadApplyModalProps {
  setOpen: (open: boolean) => void;
  onApply: () => void;
}

const PeopleLeadApplyModal = ({ setOpen, onApply }: PeopleLeadApplyModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-[#311a42] text-gray-800 dark:text-white rounded-lg p-6 max-w-md w-full shadow-xl transition-all duration-300 ease-in-out ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Convertirse en People Lead</h2>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
          Has alcanzado el nivel necesario para convertirte en People Lead. Al confirmar, 
          <strong> serás asignado automáticamente </strong> a este rol.
          <br />
          <br />
          Como People Lead, serás responsable de guiar a otros empleados, hacer seguimiento de sus metas,
          cursos y certificaciones.
          <br />
          <br />
          ¿Deseas asumir este nuevo rol?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>
          <button
           disabled={submitting}
           onClick={async () => {
            setSubmitting(true);
            await onApply();
            setSubmitting(false);
            closeModal();
          }}
            className="px-4 py-2 text-sm font-semibold bg-[#65417f] text-white rounded-md hover:bg-opacity-90 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PeopleLeadApplyModal;
