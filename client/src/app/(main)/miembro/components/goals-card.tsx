"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "components/ui/table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { authFetch } from "@utils/authFetch";
import { useSelectedEmployee } from "context/SelectedEmployeeContext";

interface Goal {
  goalId: string;
  information: string;
  status: "pending" | "approved" | "rejected";
  completed: boolean;
  term: string;
}

export default function GoalsCard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = goals.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(goals.length / itemsPerPage);
  const url = process.env.NEXT_PUBLIC_API_URL!;

  const { selectedEmployeeId } = useSelectedEmployee();

  useEffect(() => {
    const fetchGoals = async () => {
      if (!selectedEmployeeId) return;

      try {
        const response = await authFetch<{ goals: Goal[] }>(
          `${url}/goals/${selectedEmployeeId}`
        );

        if (response && Array.isArray(response.goals)) {
          const pendingOnly = response.goals.filter(
            (g) => g.status === "pending"
          );
          setGoals(pendingOnly);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [selectedEmployeeId]);

  const updateStatus = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    const res = await authFetch(`${url}/goals/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    if (res !== false) {
      setGoals((prev) => prev.filter((g) => g.goalId !== id));
    }
  };

  return (
    <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl relative min-h-[22rem]">
      <h3 className="text-xl font-semibold text-[#65417f] dark:text-white mb-2">
        Metas registradas
      </h3>

      <div className="min-h-[12rem]">
        {currentItems.length === 0 && !loading ? (
          <p className="text-center text-gray-500 pt-20">
            No hay metas pendientes del empleado.
          </p>
        ) : (
          <Table>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow
                  key={item.goalId}
                  className="border-b border-gray-200 dark:border-white/10"
                >
                  <TableCell>
                    <div className="flex justify-between items-center w-full">
                      <span>{item.information}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center w-full">
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(item.term).toLocaleDateString("es-MX")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      className="text-sm px-4 py-1 bg-[#D0BFDB] text-[#65417f] rounded-[50px]"
                      onClick={() => updateStatus(item.goalId, "approved")}
                    >
                      Aprobar
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      className="text-sm px-4 py-1 bg-[#65417f] text-[#D0BFDB] rounded-[50px]"
                      onClick={() => updateStatus(item.goalId, "rejected")}
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
    </div>
  );
}
