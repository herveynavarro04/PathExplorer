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
import { getRecommendedProjects } from "../fetch";
import { useEffect, useState } from "react";

type Project = {
  project_name: string;
  client: string;
  id_project_manager: string;
};

export function TopProjects({ className }: { className?: string }) {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getRecommendedProjects();
        setData(projects);
      } catch (err) {
        console.error("Error fetching recommended projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
        Proyectos relacionados a tu perfil
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
            <TableHead className="min-w-[130px] !text-left">Nombre</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Administrador</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((project, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
              key={project.project_name + i}
            >
              <TableCell className="flex min-w-fit items-center max-w-fit text-left">
                <div>{project.project_name}</div>
              </TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.id_project_manager}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
