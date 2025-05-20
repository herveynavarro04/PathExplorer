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
import { getAppsAct } from "../fetchAct";
import { useEffect, useState } from "react";

type AppsAct = {
    employee_name: string;
    date: string;
    cargability: string;
    interests: string;
    skills: string;
};

export function TopAppsAct({ className }: { className?: string }) {
    const [data, setData] = useState<AppsAct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppsAct = async () => {
        try {
            const appsAct= await getAppsAct();
            setData(appsAct);
        } catch (err) {
            console.error("Error fetching recommended applicants:", err);
        } finally {
            setLoading(false);
        }
    };

        fetchAppsAct();
    }, []);

    return (
        <div
        className={cn(
            "mt-6 grid rounded-[10px] bg-[#f8f6fa] px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-[#311a42]",
            className,
            "transition-opacity duration-500",
            loading ? "opacity-0" : "opacity-100"
        )}
        >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Actualización Página Web
        </h2>

        <Table>
            <TableHeader>
            <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
                <TableHead className="min-w-[130px] !text-left">Nombre</TableHead>
                <TableHead>Fecha de Aplicación</TableHead>
                <TableHead>Cargabilidad</TableHead>
                <TableHead>Intereses</TableHead>
                <TableHead>Habilidades</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
            {data.map((act, i) => (
                <TableRow
                className="text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
                key={act.employee_name + i}
                >
                <TableCell className="flex min-w-fit items-center max-w-fit text-left">
                    <div>{act.employee_name}</div>
                </TableCell>
                <TableCell>{act.date}</TableCell>
                <TableCell>{act.cargability}</TableCell>
                <TableCell>{act.interests}</TableCell>
                <TableCell>{act.skills}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    );
}
