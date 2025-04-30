import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table"
import { cn } from "lib/utils";
import { getRecommendedProjects } from "../fetch";

export async function TopProjects({ className }: { className?: string }) {
  const data = await getRecommendedProjects();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-[#f8f6fa] px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-[#311a42] ",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Proyectos relacionados a tu perfil
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-tranpsarent ">
            <TableHead className="min-w-[130px] !text-left ">Nombre</TableHead>
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
          
                <div className="">{project.project_name}</div>
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
