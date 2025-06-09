"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "./input";
import RegisterEmployeeModal from "./RegisterEmployeeModal";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";
import UserDetailsModalAdmin from "./UserDetailsModalAdminEmployee";

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  level: number;
  rol: string;
  active: boolean;
}

export default function EmployeeTable() {
  const [fadeIn, setFadeIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rolFilter, setrolFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"name" | "level" | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const url = "http://localhost:8080/api";
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateEmployeeStatus = async (update: { status: boolean }) => {
    if (!selectedEmployeeId) return;
    try {
      const res = validation();
      if (!res) return router.push("/login");

      const response = await authFetch(
        `${url}/employee/${selectedEmployeeId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify(update),
        }
      );

      if (!response) return router.push("/login");

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.employeeId === selectedEmployeeId
            ? { ...emp, active: update.status }
            : emp
        )
      );

      setSelectedEmployeeId(null);
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    const fetchEmployees = async () => {
      try {
        const response = await authFetch<Employee[]>(`${url}/employee/all`);
        if (!response) return router.push("/login");
        setEmployees(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleRegisterEmployee = async (
    newEmp: Omit<Employee, "employeeId" | "active">
  ) => {
    const res = validation();
    if (!res) return router.push("/login");
    try {
      const response = await authFetch<Employee>(`${url}/employees`, {
        method: "POST",
        body: JSON.stringify(newEmp),
      });
      if (!response) return router.push("/login");
      setEmployees((prev) => [...prev, response]);
      setShowModal(false);
    } catch (err) {
      console.error("Error registering employee", err);
    }
  };

  const itemsPerPage = 10;

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesrol = rolFilter ? emp.rol === rolFilter : true;
    return matchesSearch && matchesrol;
  });

  const sortedEmployees = sortKey
    ? [...filteredEmployees].sort((a, b) => {
        let valA: string | number =
          sortKey === "name" ? `${a.firstName} ${a.lastName}` : a.level;
        let valB: string | number =
          sortKey === "name" ? `${b.firstName} ${b.lastName}` : b.level;
        return sortAsc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      })
    : filteredEmployees;

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function renderHeader(label: string, key: "name" | "level") {
    return (
      <TableHead
        className="cursor-pointer select-none"
        onClick={() => {
          if (sortKey === key) {
            setSortAsc((prev) => !prev);
          } else {
            setSortKey(key);
            setSortAsc(true);
          }
        }}
      >
        <div className="flex items-center gap-1">
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
    <div
      className={`w-full max-w-[75rem] mx-auto h-[43rem] bg-white dark:bg-[#311a42] rounded-[10px] px-7 py-1 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[14rem]"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-[#65417f] text-white rounded-md font-semibold hover:bg-opacity-90 hover:cursor-pointer"
        >
          Registrar empleado
        </button>
        {showModal && (
          <RegisterEmployeeModal
            onCancel={() => setShowModal(false)}
            onConfirm={handleRegisterEmployee}
          />
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase text-sm text-[#6c63ff] dark:text-white">
            {renderHeader("Nombre", "name")}
            <TableHead className="text-left">Correo</TableHead>
            {renderHeader("Nivel", "level")}
            <TableHead className="text-center">Rol</TableHead>
            <TableHead className="text-center">Estatus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map((emp) => (
            <TableRow
              key={emp.employeeId}
              onClick={() => {
                if (emp.active) setSelectedEmployeeId(emp.employeeId);
              }}
              className={`hover:bg-[#ece5f1] text-dark hover:cursor-pointer ${
                emp.active === false ? "line-through text-gray-500" : ""
              }`}
            >
              <TableCell className="text-left">
                {emp.firstName} {emp.lastName}
              </TableCell>
              <TableCell className="text-left">{emp.email}</TableCell>
              <TableCell className="text-left">{emp.level}</TableCell>
              <TableCell className="text-center">{emp.rol}</TableCell>
              <TableCell className="text-center">
                <span
                  className={emp.active ? "text-green-700" : "text-red-500"}
                >
                  {emp.active ? "activo" : "eliminado"}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {Array.from({ length: itemsPerPage - paginatedEmployees.length }).map(
            (_, idx) => (
              <TableRow key={`empty-${idx}`}>
                <TableCell colSpan={5} className="h-[56px]">
                  &nbsp;
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-1 gap-2">
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

      {selectedEmployeeId && (
        <UserDetailsModalAdmin
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
          handleUpdateEmployeeStatus={handleUpdateEmployeeStatus}
        />
      )}
    </div>
  );
}
