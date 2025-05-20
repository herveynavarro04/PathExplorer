"use client"

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    
    const [addedEmployees, setAddedEmployees] = useState<string[]>([]);

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
            <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
                <TableHead className="min-w-[130px] !text-left">Nombre</TableHead>
                <TableHead>Puesto Actual</TableHead>
                <TableHead>Cargabilidad</TableHead>
                <TableHead>Intereses</TableHead>
                <TableHead>Habilidades</TableHead>
                <TableHead />
            </TableRow>
            </TableHeader>

            <TableBody>
            {data.map((analyse, i) => (
                <TableRow
                className="text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
                key={analyse.employee_name + i}
                >
                <TableCell className="flex min-w-fit items-center max-w-fit text-left">
                    <div>{analyse.employee_name}</div>
                </TableCell>
                <TableCell>{analyse.role}</TableCell>
                <TableCell>{analyse.cargability}</TableCell>
                <TableCell>{analyse.interests}</TableCell>
                <TableCell>{analyse.skills}</TableCell>
                <TableCell>
                {addedEmployees.includes(analyse.employee_name) ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <span className="text-xl">✓</span> Añadido
                    </div>
                    ) : (
                    <button
                        onClick={() => openModal(analyse.employee_name)}
                        className="flex items-center gap-2 text-sm text-dark dark:text-white font-medium hover:bg-[#9F86B1FF] dark:hover:bg-[#FFFFFF1A] rounded-lg px-4 py-2 transition-colors duration-200"
                    >
                        <span className="text-xl font-bold">+</span> Añadir
                    </button>
                )}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        {/* MODAL */}
        <AddEmployeeModal
            isOpen={isModalOpen}
            onClose={closeModal}
            employeeName={selectedEmployee}
            onAdd={handleAddEmployee}
        />
    </div>
    );
}
