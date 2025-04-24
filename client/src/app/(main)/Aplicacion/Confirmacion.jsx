"use client";
import React from "react";

export default function Confirmacion({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-purple-300 text-[#3E0567] p-6 rounded-xl shadow-md w-[350px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          ¿Estás seguro de que quieres aplicar a este proyecto?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="bg-white px-4 py-2 rounded hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-[#3E0567] text-white px-4 py-2 rounded hover:bg-purple-900"
            onClick={onConfirm}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
