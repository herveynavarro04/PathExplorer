"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { cn } from "lib/utils";
import { getInfoNotification } from "./fetch"; // ajusta el path si está en otra carpeta

type InfoItem = {
  empleado: string;
  tema: string;
  descripcion: string;
};

export default function TablaRetroalimentacion({
  className = "",
  loading = false,
}: {
  className?: string;
  loading?: boolean;
}) {
  const [data, setData] = useState<InfoItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getInfoNotification();
      setData(result);
    }
    fetchData();
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
        Notificaciones
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
            <TableHead className="min-w-[130px] !text-left">Empleado</TableHead>
            <TableHead className="!text-left">Tema</TableHead>
            <TableHead className="min-w-[130px] !text-left">Descripción</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, i) => (
            <TableRow
              key={i}
              className="text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
            >
              <TableCell className="text-left">{item.empleado}</TableCell>
              <TableCell className="text-left">{item.tema}</TableCell>
              <TableCell className="text-left">{item.descripcion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
