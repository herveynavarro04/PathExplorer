"use client";

import { TableRow, TableCell } from "components/ui/table";
import { cn } from "lib/utils";

interface ProjectTableRowProps {
  projectId: string;
  projectName: string;
  client: string;
  managerName: string;
  handleProjectClick: (projectId: string) => void;
}

export default function ProjectTableRow({
  projectId,
  projectName,
  client,
  managerName,
  handleProjectClick,
}: ProjectTableRowProps) {
  return (
    <TableRow
      className={cn(
        "text-center text-base font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]",
        "cursor-pointer"
      )}
      onClick={() => handleProjectClick(projectId)}
    >
      <TableCell className="flex min-w-fit items-center max-w-fit text-left">
        <div>{projectName}</div>
      </TableCell>
      <TableCell>{client}</TableCell>
      <TableCell>{managerName}</TableCell>
    </TableRow>
  );
}
