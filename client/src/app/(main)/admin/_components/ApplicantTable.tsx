"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { useEffect, useState } from "react";
import AssignEmployeeModal from "./AssignEmployeeModal";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import UserDetailsModalPeopleLead from "./UserDetailsModalAdminPeopleLead";
import DeleteModal from "./DeleteModal";

interface GetPeopleLeadApplicantsDto {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  appliedAt: string;
  skillCount: number;
  interestCount: number;
}

type SortKey = "employee_name" | "appliedAt" | "interestCount" | "skillCount";

export default function ApplicantTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [showApplicantModal, setShowApplicantModal] = useState<boolean>(false);
  const itemsPerPage = 10;
  const [applicants, setApplicants] = useState<GetPeopleLeadApplicantsDto[]>(
    []
  );
  const [selectedApplicant, setSelectedApplicant] =
    useState<GetPeopleLeadApplicantsDto>(null);
  const [showApplicantPeopleLeadModal, setShowApplicantPeopleLeadModal] =
    useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;

  const handleClickApplicant = (applicantId: string) => {
    setEmployeeId(applicantId);
    setShowApplicantModal(true);
  };

  const handleClickRejectApplicant = (
    applicant: GetPeopleLeadApplicantsDto
  ) => {
    setShowApplicantPeopleLeadModal(false);
    setSelectedApplicant(applicant);
    setShowDeleteModal(true);
  };

  const handleClickAcceptApplicant = (
    applicant: GetPeopleLeadApplicantsDto
  ) => {
    setShowDeleteModal(false);
    setSelectedApplicant(applicant);
    setShowApplicantPeopleLeadModal(true);
  };

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedApplicant(null);
  };

  const onClose = () => {
    setShowApplicantModal(false);
    setEmployeeId(null);
  };

  const handlePatchPeopleLead = async (params: {
    status: string;
    employeesAssigned: string[];
  }) => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    try {
      const response = await authFetch(
        `${url}/people-lead/${selectedApplicant.employeeId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: params.status,
            employeesAssigned: params.employeesAssigned,
          }),
        }
      );
      if (!response) {
        router.push("/login");
        return;
      }
      setTriggerRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error patching people lead", error);
    }
  };

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    const loadApplicants = async () => {
      try {
        const response = await authFetch<GetPeopleLeadApplicantsDto[]>(
          `${url}/people-lead/applicants`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        setTimeout(() => setFadeIn(true), 25);
        setLoading(false);
        setApplicants(response);
      } catch (error) {
        console.error("Error fetching the applicants", error);
      }
    };
    loadApplicants();
  }, [triggerRefresh]);

  const sortedApplicants = [...applicants].sort((a, b) => {
    if (!sortKey) return 0;

    let valA: string | number;
    let valB: string | number;

    if (sortKey === "employee_name") {
      valA = `${a.firstName} ${a.lastName}`;
      valB = `${b.firstName} ${b.lastName}`;
    } else if (sortKey === "appliedAt") {
      valA = new Date(a.appliedAt).getTime();
      valB = new Date(b.appliedAt).getTime();
    } else {
      valA = a[sortKey];
      valB = b[sortKey];
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return sortAsc ? valA - valB : valB - valA;
    }

    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const paginated = sortedApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const renderHeader = (label: string, key: SortKey) => (
    <TableHead
      className={`cursor-pointer select-none ${
        key === "employee_name" ? "text-left" : "text-center"
      }`}
      onClick={() => handleSort(key)}
    >
      <div
        className={`flex items-center gap-1 ${
          key === "employee_name" ? "justify-start" : "justify-center"
        }`}
      >
        <span>{label}</span>
        {sortKey === key ? (
          <img
            src={sortAsc ? "/UpIcon.png" : "/DropdownIcon.png"}
            alt="sort"
            className="w-4 h-4"
          />
        ) : (
          <img
            src="/DropdownIcon.png"
            alt="inactive sort"
            className="w-4 h-4 opacity-25"
          />
        )}
      </div>
    </TableHead>
  );

  if (loading && !applicants) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div
      className={`mx-auto w-full transition-opacity duration-300 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full h-[43rem] rounded-[10px] bg-white dark:bg-[#311a42] px-4 py-1">
        <Table>
          <TableHeader>
            <TableRow className="border-none uppercase text-sm text-[#6c63ff] dark:text-white">
              {renderHeader("Nombre", "employee_name")}
              <TableHead className="text-left">Correo</TableHead>
              {renderHeader("Fecha de aplicación", "appliedAt")}
              {renderHeader("Intereses", "interestCount")}
              {renderHeader("Habilidades", "skillCount")}
              <TableHead className="text-center">Aceptar/Rechazar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((applicant) => (
              <TableRow
                key={applicant.employeeId}
                className="cursor-pointer text-center text-sm font-medium text-dark dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A]"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest(".no-propagate")) {
                    handleClickApplicant(applicant.employeeId);
                  }
                }}
              >
                <TableCell className="text-left">
                  {applicant.firstName + " " + applicant.lastName}
                </TableCell>
                <TableCell className="text-left">{applicant.email}</TableCell>
                <TableCell className="text-center">
                  {new Date(applicant.appliedAt).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {applicant.interestCount}
                </TableCell>
                <TableCell className="text-center">
                  {applicant.skillCount}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickAcceptApplicant(applicant);
                      }}
                      className="no-propagate px-3 py-1 bg-[#65417f] text-white rounded hover:bg-[#7a4b9d]"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickRejectApplicant(applicant);
                      }}
                      className="no-propagate px-3 py-1 bg-gray-3 text-gray-7 hover:text-white rounded hover:bg-red-600 border border-gray-6"
                    >
                      Rechazar
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {Array.from({ length: itemsPerPage - paginated.length }).map(
              (_, index) => (
                <TableRow key={`empty-${index}`}>
                  <TableCell colSpan={6} className="h-[56px]">
                    &nbsp;
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm font-medium self-center text-dark dark:text-white">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        {showApplicantModal && (
          <UserDetailsModalPeopleLead
            employeeId={employeeId}
            onClose={onClose}
          />
        )}

        {showDeleteModal && selectedApplicant && (
          <DeleteModal
            onCloseDeleteModal={onCloseDeleteModal}
            handlePatchPeopleLead={handlePatchPeopleLead}
          />
        )}

        {showApplicantPeopleLeadModal && selectedApplicant && (
          <AssignEmployeeModal
            applicant={selectedApplicant}
            setSelectedApplicant={setSelectedApplicant}
            handlePatchPeopleLead={handlePatchPeopleLead}
            setShowApplicantModal={setShowApplicantPeopleLeadModal}
          />
        )}
      </div>
    </div>
  );
}
