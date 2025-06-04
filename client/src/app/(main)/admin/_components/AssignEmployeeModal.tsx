"use client";

import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";

interface AssignEmployeeModalProps {
  applicant: {
    employeeId: string;
    firstName: string;
    lastName: string;
  };
  onClose: () => void;
}

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  level: number;
}

export default function AssignEmployeeModal({
  applicant,
  onClose,
}: AssignEmployeeModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const url = "http://localhost:8080/api";

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = validation();
      if (!res) return;

      try {
        const data = await authFetch<Employee[]>(`${url}/employee/all`);
        if (data) setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 25);

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        event.stopPropagation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < 5
          ? [...prev, id]
          : prev
    );
  };

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className={`w-full max-w-4xl bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-2xl p-8 transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-center text-[#65417f] mb-6">
          Asignar empleados a {applicant.firstName} {applicant.lastName}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando empleados...</p>
        ) : (
          <div className="max-h-[20rem] overflow-y-auto rounded-lg border border-gray-200 dark:border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 z-10 bg-[#f9f8ff] dark:bg-[#2a2a2a] text-[#65417f] font-semibold uppercase text-xs border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Correo</th>
                  <th className="px-4 py-3">Nivel</th>
                  <th className="px-4 py-3 text-center">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.employeeId}
                    className="bg-white dark:bg-[#1f1f1f] hover:bg-[#f2f1fa] dark:hover:bg-[#ffffff1a] transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-white">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-white">
                      {emp.email}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-white">
                      {emp.level}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(emp.employeeId)}
                        onChange={() => toggleSelection(emp.employeeId)}
                        disabled={
                          !selected.includes(emp.employeeId) &&
                          selected.length >= 5
                        }
                        className="w-4 h-4 accent-[#65417f]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Seleccionados: {selected.length}/5
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors dark:bg-white/10 dark:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log("Asignar a:", selected);
                onClose();
              }}
              disabled={selected.length !== 5}
              className="px-5 py-2 rounded-lg bg-[#65417f] text-white font-semibold disabled:opacity-50 hover:bg-opacity-80 transition-colors"
            >
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
