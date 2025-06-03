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
import UserDetailsModalApplication from "./UserDetailsModalApplication";

interface GetEmployeesResponseDto {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  appliedAt: Date;
  skillCount: number;
  interestCount: number;
}

interface GetManagerEmployeesResponseProps {
  employees: GetEmployeesResponseDto[];
  selectEmployeeId: string;
  setSelectEmployeeId: (selectEmployeeId: string) => void;
  handleSubmitApplication: (updatedFields: Record<string, any>) => void;
  onEmployeeSelect?: (employeeId: string) => void;
  selectedEmployees?: { employeeId: string; position: string }[];
  onClose: () => void;
}

export default function TopAnalysis({
  employees,
  selectEmployeeId,
  setSelectEmployeeId,
  handleSubmitApplication,
  onEmployeeSelect,
  onClose,
  selectedEmployees = [],
}: GetManagerEmployeesResponseProps) {
  const [sortKey, setSortKey] = useState<
    "interestCount" | "skillCount" | "employee_name" | "appliedAt"
  >(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const availableEmployees = employees.filter(
    (e) => !selectedEmployees.some((se) => se.employeeId === e.employeeId)
  );

  const paginatedRaw = availableEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (
    key: "interestCount" | "skillCount" | "employee_name" | "appliedAt"
  ) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleEmployeeClick = (employeeId: string) => {
    setSelectEmployeeId(employeeId);
  };

  const paginatedemployees = [...paginatedRaw].sort((a, b) => {
    if (!sortKey) return 0;

    let valA: string | number;
    let valB: string | number;

    if (sortKey === "employee_name") {
      valA = `${a.firstName} ${a.lastName}`;
      valB = `${b.firstName} ${b.lastName}`;
    } else if (sortKey === "appliedAt") {
      valA = new Date(a.appliedAt).getTime();
      valB = new Date(b.appliedAt).getTime();
    } else {
      valA = a[sortKey];
      valB = b[sortKey];
    }

    const isNumeric = typeof valA === "number" && typeof valB === "number";
    if (isNumeric) {
      return sortAsc ? valA - valB : valB - valA;
    }

    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  function renderHeader(
    label: string,
    key: "interestCount" | "skillCount" | "employee_name" | "appliedAt"
  ) {
    return (
      <TableHead
        className={`cursor-pointer px-2 py-1 select-none ${
          key === "employee_name" ? "text-left" : "text-center"
        }`}
        onClick={() => handleSort(key)}
      >
        <div
          className={`flex items-center gap-1 ${
            key === "employee_name" ? "justify-start" : "justify-center"
          }`}
        >
          <span>{label}</span>
          {sortKey === key ? (
            <img
              src={sortAsc ? "/UpIcon.png" : "/DropdownIcon.png"}
              alt="sort"
              className="w-4 h-4"
            />
          ) : (
            <img
              src="/DropdownIcon.png"
              alt="inactive sort"
              className="w-4 h-4 opacity-25"
            />
          )}
        </div>
      </TableHead>
    );
  }

  return (
    <div className="w-full min-h-[30rem] rounded-[10px] bg-white dark:bg-[#311a42] px-7.5 py-6 max-w-[75rem] mx-auto">
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Aplicantes
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
            {renderHeader("Nombre", "employee_name")}
            {renderHeader("Aplicación", "appliedAt")}
            {renderHeader("Intereses", "interestCount")}
            {renderHeader("Habilidades", "skillCount")}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedemployees.map((employee) => (
            <TableRow
              key={employee.employeeId}
              onClick={() => handleEmployeeClick(employee.employeeId)}
              className="cursor-pointer text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
            >
              <TableCell className="text-left">
                {employee.firstName + " " + employee.lastName}
              </TableCell>
              <TableCell className="text-center">
                {new Date(employee.appliedAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-center">
                {employee.interestCount}
              </TableCell>
              <TableCell className="text-center">
                {employee.skillCount}
              </TableCell>
            </TableRow>
          ))}

          {Array.from({ length: 9 - paginatedemployees.length }).map(
            (_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell colSpan={9} className="h-[56px]">
                  &nbsp;
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4 gap-2">
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

      {selectEmployeeId && (
        <UserDetailsModalApplication
          employeeId={selectEmployeeId}
          handleSubmitApplication={handleSubmitApplication}
          onClose={onClose}
          onSelect={(employeeId) => {
            if (onEmployeeSelect) onEmployeeSelect(employeeId);
            setSelectEmployeeId(null);
          }}
        />
      )}
    </div>
  );
}
