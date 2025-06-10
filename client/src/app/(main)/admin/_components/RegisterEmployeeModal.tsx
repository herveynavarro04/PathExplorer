"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";

interface RegisterEmployeeModalProps {
  onConfirm: (newEmployee: {
    firstName: string;
    lastName: string;
    email: string;
    level: number;
    rol: string;
    password: string;
  }) => void;
  onCancel: () => void;
}

const RegisterEmployeeModal: React.FC<RegisterEmployeeModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    level: "", // <-- string para evitar NaN
    rol: "STAFF",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, level, rol } = formData;

    if (!firstName || !lastName || !email || !level) return;

    const parsedLevel = parseInt(level);
    if (isNaN(parsedLevel) || parsedLevel < 1 || parsedLevel > 12) return;

    onConfirm({
      firstName,
      lastName,
      email,
      level: parsedLevel,
      rol,
      password: "dummy",
    });
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-[#d8cae1] dark:bg-[#311a42] rounded-2xl shadow-2xl">
        <h3 className="text-2xl font-bold text-center text-[#3e2b58] dark:text-white mb-6">
          Registrar Empleado
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Nombre(s)
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#f3eafa] dark:bg-[#43265a] text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Ej. Carlos"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Apellidos
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#f3eafa] dark:bg-[#43265a] text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Ej. Pérez Gómez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
              Correo
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#f3eafa] dark:bg-[#43265a] text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Nivel
              </label>
              <input
                type="number"
                name="level"
                min={1}
                max={12}
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#f3eafa] dark:bg-[#43265a] text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="1-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Rol
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-[#f3eafa] dark:bg-[#43265a] text-gray-900 dark:text-white"
              >
                <option value="STAFF">STAFF</option>
                <option value="PROJECT MANAGER">PROJECT MANAGER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#65417f] text-white hover:bg-[#581c87] font-medium transition"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RegisterEmployeeModal;
