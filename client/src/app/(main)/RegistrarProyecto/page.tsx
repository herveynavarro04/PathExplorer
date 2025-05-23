// page.tsx
"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import LoadingPage from "components/LoadingPage";
import { AllAnalysis } from "./anadirempleado";
import { useRouter } from "next/navigation";


export default function RegistrarProyectoPage() {
  const [loading, setLoading] = useState(true);
  const [empleadosRequeridos, setEmpleadosRequeridos] = useState(4);
  const [mostrarModuloEmpleados, setMostrarModuloEmpleados] = useState(false);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState<(string | null)[]>(Array(empleadosRequeridos).fill(null));
  const [indiceActivo, setIndiceActivo] = useState<number | null>(null);
  const router = useRouter();


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleAgregarEmpleado = (nombre: string, index: number) => {
    const copia = [...empleadosSeleccionados];
    copia[index] = nombre;
    setEmpleadosSeleccionados(copia);
    setMostrarModuloEmpleados(false);
    setIndiceActivo(null);
  };

  return (
    <LoadingPage loading={loading}>
      <div className="grid gap-4 md:gap-6 2xl:gap-7.5">
        <div className="bg-[#f3eafc] rounded-xl p-8 text-[#3E0567]">
          <h2 className="text-2xl font-bold mb-4">Registrar Proyecto</h2>

          <div className="flex justify-between items-start">
            <input
              className="bg-[#d5b9f1] rounded-xl px-6 py-3 text-xl font-semibold w-[70%] placeholder-[#3E0567]"
              placeholder="Nombre del Proyecto"
            />
            <button onClick={() => router.push("/Project-Manager")}
            className="bg-[#7744dd] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#6a37cb] transition">
              Agregar Proyecto
            </button>
          </div>

          <textarea
            placeholder="Descripción"
            className="mt-6 bg-[#d5b9f1] w-full rounded-xl p-4 h-24 placeholder-[#3E0567]"
          />

          <div className="flex flex-wrap gap-4 mt-6">
            <div>
              <label className="block font-semibold mb-1">Fecha Inicio</label>
              <input
                type="date"
                className="bg-[#d5b9f1] px-4 py-2 rounded-xl placeholder-[#3E0567]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Fecha Fin</label>
              <input
                type="date"
                className="bg-[#d5b9f1] px-4 py-2 rounded-xl placeholder-[#3E0567]"
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">Nombre del Cliente</label>
              <input
                type="text"
                placeholder="Nombre del Cliente"
                className="bg-[#d5b9f1] px-4 py-2 w-full rounded-xl placeholder-[#3E0567]"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <h3 className="font-semibold text-lg">Equipo de trabajo</h3>
            <div>
              <span className="text-sm text-[#7744dd] font-semibold mr-2">
                Cantidad de empleados requeridos
              </span>
              <span className="bg-[#d5b9f1] px-3 py-1 rounded-xl font-semibold">
                {empleadosRequeridos}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {empleadosSeleccionados.map((emp, idx) => (
              <div
                key={idx}
                className="bg-[#d5b9f1] w-20 h-20 rounded-xl flex flex-col items-center justify-center text-xs text-[#7744dd] font-bold cursor-pointer hover:scale-105 transition"
                onClick={() => {
                  setIndiceActivo(idx);
                  setMostrarModuloEmpleados(true);
                }}
              >
                {emp ? (
                  <>
                    <img
                      src="/profile.png"
                      className="w-10 h-10 rounded-full mb-1"
                      alt="perfil"
                    />
                    <span className="text-center text-[11px]">{emp}</span>
                  </>
                ) : (
                  <span className="text-2xl">+</span>
                )}
              </div>
            ))}
          </div>

          {mostrarModuloEmpleados && indiceActivo !== null && (
            <div className="mt-6">
              <AllAnalysis
                onAddEmpleado={handleAgregarEmpleado}
                indiceActivo={indiceActivo}
                empleadosYaAsignados={empleadosSeleccionados.filter(Boolean) as string[]}
              />
            </div>
          )}
        </div>
      </div>
    </LoadingPage>
  );
}
