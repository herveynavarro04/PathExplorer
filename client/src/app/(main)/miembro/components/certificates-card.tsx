"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "components/ui/table";
import CertModal from "app/(main)/Certificados/CertModal";

export default function CertificatesCard({ items }: { items: any[] }) {
  const [status, setStatus] = useState<(null | "aprobado" | "rechazado")[]>(
    Array(items.length).fill(null)
  );

  const handleDecision = (index: number, decision: "aprobado" | "rechazado") => {
    const updated = [...status];
    updated[index] = decision;
    setStatus(updated);
  };

  return (
    <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl">
      <h3 className="text-xl font-semibold text-[#65417f] dark:text-white mb-2">Certificados</h3>
      <Table>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>
                {item.name}
                <button className="ml-4 text-[#65417f] dark:text-white text-xs">Ver más</button>
              </TableCell>
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
