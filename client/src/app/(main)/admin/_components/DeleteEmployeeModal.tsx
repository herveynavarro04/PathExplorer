"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface DeleteEmployeeModalProps {
  onCloseDeleteEmployeeModal: () => void;
  onClose: () => void;
  handleUpdateEmployeeStatus: (update: { status: boolean }) => void;
}

export default function DeleteEmployeeModal({
  onCloseDeleteEmployeeModal,
  onClose,
  handleUpdateEmployeeStatus,
}: DeleteEmployeeModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        event.stopPropagation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
      <div
        ref={modalRef}
        className="bg-[#fefefe] dark:bg-[#311a42] text-gray-800 dark:text-white rounded-lg p-6 max-w-md w-full transition-all duration-300 ease-in-out shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4">¿Eliminar empleado?</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Esta acción no se puede deshacer. ¿Estás seguro de que quieres
          eliminarlo?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCloseDeleteEmployeeModal}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={async () => {
              await handleUpdateEmployeeStatus({ status: false });
              onCloseDeleteEmployeeModal();
            }}
            className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
