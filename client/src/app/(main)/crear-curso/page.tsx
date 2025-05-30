"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

export default function RegistrarCurso() {
  const [CourseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [obtainedDate, setObtainedDate] = useState<Date | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías mandar la data a tu backend o API
    const Curso = {
      nombre: CourseName,
      descripcion: description,
      url,
      fechaObtencion: obtainedDate,
      duracion: duration,
    };

    console.log("Curso registrado:", Curso);

    // Reset
    setCourseName("");
    setDescription("");
    setUrl("");
    setObtainedDate(null);
    setDuration("");
  };

  return (
    <>
      <div
        className={`mx-auto w-full max-w-[970px] items-center transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[75rem] mx-auto p-6 bg-white dark:bg-[#2b1e3b] rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Registrar Curso
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del Curso"
              value={CourseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />

            <textarea
              placeholder="Descripción del Curso (máx. 100 caracteres)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
              maxLength={100}
            />

            <input
              type="text"
              placeholder="URL del Curso"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />

            <div className="flex gap-5">
              <DatePicker
                selected={obtainedDate}
                onChange={(date: Date | null) => setObtainedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha de obtención"
                className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
                locale={es}
              />

              <input
                type="number"
                placeholder="Duración (en horas)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#65417f] text-white rounded-md hover:bg-[#5a366e] text-sm font-semibold"
            >
              Registrar Curso
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
