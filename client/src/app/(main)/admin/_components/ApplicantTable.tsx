"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { useState } from "react";
import AssignEmployeeModal from "./AssignEmployeeModal";

interface Applicant {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  appliedAt: string;
  interestCount: number;
  skillCount: number;
}

const mockApplicants: Applicant[] = [
  {
    employeeId: "1",
    firstName: "Sofia",
    lastName: "Jiménez",
    email: "sofia@accenture.com",
    appliedAt: "2025-05-10",
    interestCount: 3,
    skillCount: 3,
  },
  {
    employeeId: "2",
    firstName: "Mauricio",
    lastName: "Lozano",
    email: "mauricio@accenture.com",
    appliedAt: "2025-05-09",
    interestCount: 4,
    skillCount: 3,
  },
];

export default function ApplicantTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockApplicants.length / itemsPerPage);
  const paginated = mockApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative w-full h-[43rem] rounded-[10px] bg-white dark:bg-[#311a42] px-4 py-1">
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase text-sm text-[#6c63ff] dark:text-white">
            <TableHead className="text-left">Nombre</TableHead>
            <TableHead className="text-left">Correo</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead className="text-center">Intereses</TableHead>
            <TableHead className="text-center">Habilidades</TableHead>
            <TableHead className="text-center">Aceptar/Rechazar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-dark dark:text-white">
          {paginated.map((applicant) => (
            <TableRow
              key={applicant.employeeId}
              className="text-center text-sm hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
            >
              <TableCell className="text-left">
                {applicant.firstName + " " + applicant.lastName}
              </TableCell>
              <TableCell className="text-left">{applicant.email}</TableCell>
              <TableCell>
                {new Date(applicant.appliedAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{applicant.interestCount}</TableCell>
              <TableCell>{applicant.skillCount}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setSelectedApplicant(applicant)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Aceptar
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Rechazar
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm font-medium self-center text-dark dark:text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {selectedApplicant && (
        <AssignEmployeeModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
