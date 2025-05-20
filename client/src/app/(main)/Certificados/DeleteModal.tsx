"use client";

import React from "react";
import ReactDOM from "react-dom";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-[#2e1b3f] p-6 rounded-xl max-w-sm w-full shadow-xl relative">
        <h3 className="text-lg font-bold mb-4 text-center text-red-700">¿Eliminar certificado?</h3>
        <p className="mb-6 text-sm text-center dark:text-gray-300">
          Esta acción no se puede deshacer. ¿Estás seguro?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;
