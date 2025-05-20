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
import { getAppsAuto } from "../fetchAuto";
import { useEffect, useState } from "react";

type AppsAuto = {
  employee_name: string;
  date: string;
  cargability: string;
  interests: string;
  skills: string;
};

export function TopAppsAuto({ className }: { className?: string }) {
  const [data, setData] = useState<AppsAuto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppsAuto = async () => {
      try {
        const appsAuto = await getAppsAuto();
        setData(appsAuto);
      } catch (err) {
        console.error("Error fetching recommended applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppsAuto();
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
        Sistema de automatización
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
          {data.map((auto, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
              key={auto.employee_name + i}
            >
              <TableCell className="flex min-w-fit items-center max-w-fit text-left">
                <div>{auto.employee_name}</div>
              </TableCell>
              <TableCell>{auto.date}</TableCell>
              <TableCell>{auto.cargability}</TableCell>
              <TableCell>{auto.interests}</TableCell>
              <TableCell>{auto.skills}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
