"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "components/ui/table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { authFetch } from "@utils/authFetch";
import CertModal from "app/(main)/Certificados/CertModal";
import { useSelectedEmployee } from "context/SelectedEmployeeContext";

interface Certificate {
  certificateId: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  information: string;
  obtainedAt: string;
}

export default function CertificatesCard() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items
    .filter((c) => !("removing" in c))
    .slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const { selectedEmployeeId } = useSelectedEmployee();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!selectedEmployeeId) return;

      try {
        const response = await authFetch<{ certificates: Certificate[] }>(
          `http://localhost:8080/api/certificates/${selectedEmployeeId}`
        );

        if (response && Array.isArray(response.certificates)) {
          const pendingOnly = response.certificates.filter(
            (c) => c.status === "pending"
          );
          setItems(pendingOnly);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [selectedEmployeeId]);

  const updateStatus = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    const res = await authFetch(
      `http://localhost:8080/api/certificates/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res !== false) {
      setItems((prev) => prev.filter((c) => c.certificateId !== id));
    }
  };

  return (
    <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl relative min-h-[22rem]">
      <h3 className="text-xl font-semibold text-[#65417f] dark:text-white mb-2">
        Certificados pendientes
      </h3>

      <div className="min-h-[12rem]">
        {currentItems.length === 0 && !loading ? (
          <p className="text-center text-gray-500 pt-20">
            No hay certificados pendientes del empleado.
          </p>
        ) : (
          <Table>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow
                  key={item.certificateId}
                  className="border-b border-gray-200 dark:border-white/10"
                >
                  <TableCell>
                    <div className="flex justify-between items-center w-full">
                      <span>{item.title}</span>
                      <button
                        onClick={() => setSelectedCert(item)}
                        className="text-[#65417f] dark:text-white text-xs underline"
                      >
                        Ver más
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      className="text-sm px-4 py-1 bg-[#D0BFDB] text-[#65417f] rounded-[50px]"
                      onClick={() =>
                        updateStatus(item.certificateId, "approved")
                      }
                    >
                      Aprobar
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      className="text-sm px-4 py-1 bg-[#65417f] text-[#D0BFDB] rounded-[50px]"
                      onClick={() =>
                        updateStatus(item.certificateId, "rejected")
                      }
                    >
                      Rechazar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Paginación siempre al fondo */}
      <div className="absolute bottom-4 right-4">
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-200 dark:bg-white/10 disabled:opacity-50"
            >
              <FaChevronLeft className="text-gray-700 dark:text-white" />
            </button>

            <span className="text-sm font-medium text-dark dark:text-white">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-200 dark:bg-white/10 disabled:opacity-50"
            >
              <FaChevronRight className="text-gray-700 dark:text-white" />
            </button>
          </div>
        )}
      </div>

      {selectedCert && (
        <CertModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}
