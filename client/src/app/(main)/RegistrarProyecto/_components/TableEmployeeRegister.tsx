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
import UserDetailsRegisterModal from "./UserDetailsRegisterModal";

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

interface GetManagerEmployeesResponseProps {
  employees: GetEmployeesResponseDto[];
  onEmployeeSelect?: (employeeId: string) => void;
  selectedEmployeeIds?: string[];
}

export function EmployeesTable({
  employees,
  onEmployeeSelect,
  selectedEmployeeIds,
}: GetManagerEmployeesResponseProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [sortKey, setSortKey] = useState<
    | "position"
    | "chargeability"
    | "interestCount"
    | "skillCount"
    | "employee_name"
  >(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const availableEmployees = employees.filter(
    (e) => !selectedEmployeeIds?.includes(e.employeeId)
  );

  const paginatedRaw = availableEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (
    key:
      | "position"
      | "chargeability"
      | "interestCount"
      | "skillCount"
      | "employee_name"
  ) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleEmployeeClick = (employeeId: string) => {
    if (modalLoading) return;

    setModalLoading(true);
    setSelectedUser(employeeId);
  };

  const paginatedemployees = [...paginatedRaw].sort((a, b) => {
    if (!sortKey) return 0;

    let valA: string | number;
    let valB: string | number;

    if (sortKey === "employee_name") {
      valA = `${a.firstName} ${a.lastName}`;
      valB = `${b.firstName} ${b.lastName}`;
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
    key:
      | "position"
      | "chargeability"
      | "interestCount"
      | "skillCount"
      | "employee_name"
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
        Empleados Activos
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
            {renderHeader("Nombre", "employee_name")}
            {renderHeader("Puesto", "position")}
            {renderHeader("Cargabilidad", "chargeability")}
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
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.chargeability}</TableCell>
              <TableCell>{employee.interestCount}</TableCell>
              <TableCell>{employee.skillCount}</TableCell>
            </TableRow>
          ))}

          {Array.from({ length: 5 - paginatedemployees.length }).map(
            (_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell colSpan={5} className="h-[56px]">
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

      {selectedUser && (
        <UserDetailsRegisterModal
          employeeId={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setModalLoading(false);
          }}
          onLoadComplete={() => setModalLoading(false)}
          onSelect={(employeeId) => {
            if (onEmployeeSelect) onEmployeeSelect(employeeId);
            setSelectedUser(null);
            setModalLoading(false);
          }}
        />
      )}
    </div>
  );
}
