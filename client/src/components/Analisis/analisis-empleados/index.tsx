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
import { getRecommendedAnalysis } from "../fetch";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserDetailsModal from "./UserDetailsModal";


type Analysis = {
  employee_name: string;
  role: string;
  cargability: string;
  interests: string;
  skills: string;
};

export function TopAnalysis({ className }: { className?: string }) {
  const [data, setData] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<Analysis | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const analysis = await getRecommendedAnalysis();
        setData(analysis);
      } catch (err) {
        console.error("Error fetching recommended analysis:", err);
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
        <Link href="/Analisis-Empleados">
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A] rounded-[10px] p-2">
            Análisis de empleados
        </h2>
        </Link>
            <Table>
                <TableHeader>
                <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
                    <TableHead className="min-w-[130px] !text-left">Nombre</TableHead>
                    <TableHead>Puesto Actual</TableHead>
                    <TableHead>Cargabilidad</TableHead>
                    <TableHead>Intereses</TableHead>
                    <TableHead>Habilidades</TableHead>
                </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((analyse, i) => (
                    <TableRow
                      key={analyse.employee_name + i}
                      onClick={() => setSelectedUser(analyse)}
                      className="cursor-pointer text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
                    >
                      <TableCell className="flex min-w-fit items-center max-w-fit text-left">
                        <div>{analyse.employee_name}</div>
                      </TableCell>
                      <TableCell>{analyse.role}</TableCell>
                      <TableCell>{analyse.cargability}</TableCell>
                      <TableCell>{analyse.interests}</TableCell>
                      <TableCell>{analyse.skills}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
    </div>
    );
}
