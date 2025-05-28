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
import { fetchApplicants } from "../fetchApplicants";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useTheme } from "next-themes";
import ApplicantModal from "./ApplicantModal";

export default function TopApplicants({ className }: { className?: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  const paginatedApplicants = selectedProject?.applicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(selectedProject?.applicants.length / itemsPerPage);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const data = await fetchApplicants();
        setProjects(data);
        setSelectedProject(data[0]); 
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };
    loadApplicants();
  }, []);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "#65417f" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 1px #65417f" : "none",
      borderWidth: "1px",
      "&:hover": { borderColor: "#65417f" },
      fontSize: "1.5rem",
      borderRadius: "0.75rem",
      paddingLeft: "2px",
      paddingRight: "2px",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderRadius: "0.75rem",
      marginTop: "4px",
      zIndex: 10,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#877691"
          : "#d6c8df"
        : "transparent",
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      cursor: "pointer",
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#ddd" : "#666",
      fontSize: "0.875rem",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#000000",
      ":hover": {
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    }),
  };

  const projectOptions = projects.map((proj) => ({
    label: proj.projectName,
    value: proj.projectName,
  }));

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-[#f8f6fa] px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-[#311a42]",
        className,
        "transition-opacity duration-500",
        loading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Select
          options={projectOptions}
          value={projectOptions.find((o) => o.value === selectedProject?.projectName)}
          onChange={(option) => {
            const selected = projects.find((p) => p.projectName === option?.value);
            setSelectedProject(selected || null);
            setCurrentPage(1); 
          }}
          styles={customStyles}
          isSearchable={false}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
            <TableHead className="min-w-[130px] !text-left">Nombre</TableHead>
            <TableHead>Fecha de Aplicación</TableHead>
            <TableHead>Intereses</TableHead>
            <TableHead>Habilidades</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedApplicants?.map((a: any, i: number) => (
            <TableRow
              key={a.employeeId}
              onClick={() => setSelectedApplicant(a)}
              className="cursor-pointer text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
            >
              <TableCell className="text-left">{a.name}</TableCell>
              <TableCell>{a.applicationDate}</TableCell>
              <TableCell>{a.interests}</TableCell>
              <TableCell>{a.skills}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center text-sm text-gray-800 dark:text-white">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {selectedApplicant && (
        <ApplicantModal
          employee={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
}
