"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { cn } from "lib/utils";
import { getAllAnalysis } from "../fetch-completo";
import { useEffect, useState } from "react";
import { AddEmployeeModal } from "./modalEmpleado";

type Analysis = {
  employee_name: string;
  role: string;
  cargability: string;
  interests: string;
  skills: string;
};

export function AllAnalysis({ className }: { className?: string }) {
  const [data, setData] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortKey, setSortKey] = useState<keyof Analysis | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [addedEmployees, setAddedEmployees] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const analysis = await getAllAnalysis();
        setData(analysis);
      } catch (err) {
        console.error("Error fetching analysis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  const handleAddEmployee = (employeeName: string) => {
    if (!addedEmployees.includes(employeeName)) {
      setAddedEmployees((prev) => [...prev, employeeName]);
    }
  };

  const openModal = (employeeName: string) => {
    setSelectedEmployee(employeeName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee("");
  };

  const handleSort = (key: keyof Analysis) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const valA = a[sortKey]?.toLowerCase?.() || a[sortKey];
    const valB = b[sortKey]?.toLowerCase?.() || b[sortKey];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortAsc ? valA - valB : valB - valA;
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return sortAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0;
  });

  const renderHeader = (label: string, key: keyof Analysis) => (
    <TableHead
      className="cursor-pointer text-center px-2 py-1 select-none"
      onClick={() => handleSort(key)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {sortKey === key ? (
          <img
            src={sortAsc ? "/UpIcon.png" : "/DropdownIcon.png"}
            alt="sort"
            className="w-8 h-8"
          />
        ) : (
          <img
            src="/DropdownIcon.png"
            alt="inactive sort"
            className="w-8 h-8 opacity-25"
          />
        )}
      </div>
    </TableHead>
  );

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-[#f8f6fa] px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-[#311a42]",
        className,
        "transition-opacity duration-500",
        loading ? "opacity-0" : "opacity-100"
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Análisis de empleados
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase text-center dark:hover:bg-transparent">
            {renderHeader("Nombre", "employee_name")}
            {renderHeader("Puesto", "role")}
            {renderHeader("Cargabilidad", "cargability")}
            {renderHeader("Intereses", "interests")}
            {renderHeader("Habilidades", "skills")}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedData.map((analyse, i) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
              key={analyse.employee_name + i}
            >
              <TableCell className="text-left">{analyse.employee_name}</TableCell>
              <TableCell className="text-left">{analyse.role}</TableCell>
              <TableCell className="text-left">{analyse.cargability}</TableCell>
              <TableCell className="text-left">{analyse.interests}</TableCell>
              <TableCell className="text-left">{analyse.skills}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        employeeName={selectedEmployee}
        onAdd={handleAddEmployee}
      />
    </div>
  );
}
