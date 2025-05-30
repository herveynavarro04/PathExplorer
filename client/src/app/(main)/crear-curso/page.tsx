"use client";

import { useEffect, useState } from "react";
import EmployeesCard from "./EmployeesCard";
import { useRouter } from "next/navigation";


interface GetEmployeesResponseDto {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  chargeability: number;
  position: string;
  skillCount: number;
  interestCount: number;
}

export default function RegistrarCurso() {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [employees, setEmployees] = useState<GetEmployeesResponseDto[]>([]);
  const [showEmployees, setShowEmployees] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const router = useRouter();


  useEffect(() => {
    const dummyData: GetEmployeesResponseDto[] = [
  {
    employeeId: "1",
    email: "luis.perez@example.com",
    firstName: "Luis",
    lastName: "Pérez",
    chargeability: 95,
    position: "Diseñador UI",
    skillCount: 3,
    interestCount: 2,
  },
  {
    employeeId: "2",
    email: "paula.ortiz@example.com",
    firstName: "Paula",
    lastName: "Ortíz",
    chargeability: 92,
    position: "Diseñadora UX",
    skillCount: 4,
    interestCount: 3,
  },
  {
    employeeId: "3",
    email: "carlos.mendez@example.com",
    firstName: "Carlos",
    lastName: "Méndez",
    chargeability: 88,
    position: "Full Stack Developer",
    skillCount: 5,
    interestCount: 4,
  },
  {
    employeeId: "4",
    email: "sofia.lopez@example.com",
    firstName: "Sofía",
    lastName: "López",
    chargeability: 91,
    position: "Backend Developer",
    skillCount: 4,
    interestCount: 2,
  },
  {
    employeeId: "5",
    email: "marco.ramirez@example.com",
    firstName: "Marco",
    lastName: "Ramírez",
    chargeability: 87,
    position: "Product Manager",
    skillCount: 6,
    interestCount: 5,
  },
];


    setEmployees(dummyData);
  }, []);

  const handleToggleEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!showEmployees) {
      setShowEmployees(true);
      return;
    }

    const curso = {
      title,
      information,
      url,
      createdAt,
      duration,
      assignedEmployees: selectedEmployees,
    };

    console.log("Curso registrado con empleados:", curso);

    setTitle("");
    setInformation("");
    setUrl("");
    setCreatedAt(null);
    setDuration("");
    setSelectedEmployees([]);
    setShowEmployees(false);
  };

  return (
    <>
    <div className="max-w-full mx-auto w-full px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-lg text-[#65417f] hover:font-semibold mb-4"
      >
        ← Regresar
      </button>
    </div>
    <div className="max-w-[970px] mx-auto w-full px-4">
      <div className="p-6 bg-white dark:bg-[#2b1e3b] rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Registrar Curso
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            required
          />

          <input
            type="number"
            placeholder="Duración (en horas)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#65417f] text-white rounded-md hover:bg-[#5a366e] text-sm font-semibold"
          >
            {showEmployees ? "Registrar Curso" : "Asignar Curso"}
          </button>
        </form>
      </div>

      {showEmployees && (
        <EmployeesCard
          employees={employees}
          selected={selectedEmployees}
          onToggle={handleToggleEmployee}
        />
      )}
    </div>
    </>
  );
}
