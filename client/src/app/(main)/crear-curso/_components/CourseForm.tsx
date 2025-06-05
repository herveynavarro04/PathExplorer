"use client";

import React, { useState } from "react";

interface HandleSubmitProps {
  title: string;
  duration: string;
  information: string;
  url: string;
  mandatory: boolean;
}

interface CourseFormProps {
  handleSubmit: (postRequest: HandleSubmitProps) => void;
  showEmployees: boolean;
  setShowEmployees: (showEmployees: boolean) => void;
  addEmployees: string[];
  title: string;
  setTitle: (title: string) => void;
  information: string;
  setInformation: (information: string) => void;
  urlCourse: string;
  setUrlCourse: (urlCourse: string) => void;
  mandatory: boolean;
  setMandatory: (mandatory: boolean) => void;
  duration: number;
  setDuration: (duration: number) => void;
  resetWithFade: () => void;
}

const CourseForm = ({
  handleSubmit,
  showEmployees,
  setShowEmployees,
  addEmployees,
  title,
  setTitle,
  information,
  setInformation,
  urlCourse,
  setUrlCourse,
  mandatory,
  setMandatory,
  duration,
  setDuration,
  resetWithFade,
}: CourseFormProps) => {
  const [showValidation, setShowValidation] = useState(false);
  const [durationError, setDurationError] = useState(false);

  return (
    <div className="max-w-[970px] mx-auto w-full px-4">
      <div className="p-6 bg-white dark:bg-[#2b1e3b] rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Registrar Curso
        </h2>

        <form
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (duration <= 0) {
              setDurationError(true);
              setTimeout(() => setDurationError(false), 3000);

              return;
            } else {
              setDurationError(false);
            }

            if (!showEmployees) {
              setShowEmployees(true);
            } else if (addEmployees.length > 0) {
              setShowValidation(false);
              await handleSubmit({
                title,
                duration: `${duration}h`,
                information,
                url: urlCourse,
                mandatory,
              });
              resetWithFade();
            } else {
              setShowValidation(true);
              setTimeout(() => setShowValidation(false), 3000);
            }
          }}
          className="space-y-4 relative"
        >
          <input
            type="text"
            placeholder="Nombre del Curso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            required
          />

          <textarea
            placeholder="Descripción del Curso (máx. 100 caracteres)"
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            required
            maxLength={100}
          />

          <input
            type="text"
            placeholder="URL del Curso"
            value={urlCourse}
            onChange={(e) => setUrlCourse(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            required
          />

          <div className="flex gap-3">
            <div className="relative max-w-[15rem] w-full">
              <input
                type="number"
                placeholder="Duración (en horas)"
                value={duration === 0 ? "" : duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className={`w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white ${
                  durationError ? "border-yellow-400" : ""
                }`}
                required
              />
              {durationError && (
                <div className="absolute top-[100%] left-0 mt-1 bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded shadow z-10 w-max">
                  La duración debe ser mayor a 0 horas.
                </div>
              )}
            </div>

            <select
              value={mandatory ? "obligatorio" : "opcional"}
              onChange={(e) => setMandatory(e.target.value === "obligatorio")}
              className="w-full max-w-[15rem] p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            >
              <option value="obligatorio">Obligatorio</option>
              <option value="opcional">Opcional</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#65417f] text-white rounded-md hover:bg-[#5a366e] text-sm font-semibold"
          >
            {showEmployees ? "Registrar Curso" : "Asignar Curso"}
          </button>

          {showValidation && (
            <div className="absolute bottom-[-2.2rem] left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm px-4 py-2 rounded shadow-md z-20">
              Debes seleccionar al menos un empleado.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
