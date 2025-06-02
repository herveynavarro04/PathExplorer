"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "components/ui/table";

export default function GoalsCard({ goals }: { goals: any[] }) {
  const [status, setStatus] = useState<(null | "aprobado" | "rechazado")[]>(
    Array(goals.length).fill(null)
  );

  const handleDecision = (index: number, decision: "aprobado" | "rechazado") => {
    const updated = [...status];
    updated[index] = decision;
    setStatus(updated);
  };

  return (
    <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl">
      <h3 className="text-xl font-semibold text-[#65417f] dark:text-white mb-2">Metas</h3>
      <Table>
        <TableBody>
          {goals.map((goal, i) => (
            <TableRow key={i}>
              <TableCell>{goal.description}</TableCell>
              <TableCell>
                {status[i] === "aprobado" ? (
                  <span className="text-green-600 font-semibold flex items-center gap-1">✅ Aprobado</span>
                ) : (
                  <button
                    className="text-sm px-4 py-1 bg-[#D0BFDB] text-[#5a3bb3] rounded-[50px]"
                    onClick={() => handleDecision(i, "aprobado")}
                  >
                    Aprobar
                  </button>
                )}
              </TableCell>
              <TableCell>
                {status[i] === "rechazado" ? (
                  <span className="text-red-600 font-semibold flex items-center gap-1">❌ Rechazado</span>
                ) : (
                  <button
                    className="text-sm px-4 py-1 bg-[#5a3bb3] text-[#D0BFDB] rounded-[50px]"
                    onClick={() => handleDecision(i, "rechazado")}
                  >
                    Rechazar
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
