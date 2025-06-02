"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "lib/utils";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import DeleteMemberModal from "./DeleteMemberModal";

interface GetEmployeesByProjectResponseDto {
  profilePic: string;
  position: string;
  employeeName: string;
  employeeId: string;
  chargeability: number;
}

interface TeamCardProps {
  projectId: string;
  employees: GetEmployeesByProjectResponseDto[];
  onFeedbackClick: (employeeId: string, employeeName: string) => void;
  setTriggerRefresh: (triggerRefresh: boolean) => void;

  editable?: boolean;
}

export default function TeamCard({
  projectId,
  employees,
  onFeedbackClick,
  setTriggerRefresh,
  editable = true,
}: TeamCardProps) {
  const membersPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeIdTodelete, setEmployeeIdToDelete] = useState<string>(null);
  const [employeeNameToDelete, setEmployeeNameToDelete] =
    useState<string>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const totalPages = Math.ceil(employees.length / membersPerPage);
  const startIdx = (currentPage - 1) * membersPerPage;
  const currentMembers = employees.slice(startIdx, startIdx + membersPerPage);

  const handleDeleteInfo = (employeeId: string, employeeName: string) => {
    setEmployeeIdToDelete(employeeId);
    setEmployeeNameToDelete(employeeName);
    setShowModal(true);
  };

  return (
    <div
      className={cn(
        "rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#311a42] dark:shadow-card min-h-[24rem] sm:min-h-[20rem] xl:min-h-[27rem] flex flex-col justify-between"
      )}
    >
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 sm:px-6 xl:px-7.5 dark:border-dark-3">
        <h2 className="font-medium text-dark dark:text-white">Equipo</h2>
        {editable && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
              >
                <FaRegEdit size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 xl:p-10 flex-grow">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
          {currentMembers.map((member) => (
            <div key={member.employeeId} className="text-center relative">
              <div className="flex justify-center items-center gap-2 pb-1">
                <h4 className="text-[#65417f] dark:text-white font-semibold">
                  {member.employeeName}
                </h4>
                {editable && isEditing && (
                  <button
                    onClick={() =>
                      handleDeleteInfo(member.employeeId, member.employeeName)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>

              <Image
                src={
                  member.profilePic
                    ? `data:image/png;base64,${member.profilePic}`
                    : "/profile.png"
                }
                alt="Foto de perfil"
                width={180}
                height={180}
                className="rounded-full object-cover"
              />

              <p className="text-sm">{member.position}</p>
              <p className="text-sm pb-3">{member.chargeability}</p>
              <button
                className="text-sm text-[#5a3bb3] dark:text-white mt-1 hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A] rounded-[10px] p-2"
                onClick={() =>
                  onFeedbackClick(member.employeeId, member.employeeName)
                }
              >
                + Añadir retroalimentación
              </button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-7 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sm self-center">
              {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <DeleteMemberModal
          projectId={projectId}
          employeeIdToDelete={employeeIdTodelete}
          setEmployeeIdToDelete={setEmployeeIdToDelete}
          employeeNameToDelete={employeeNameToDelete}
          setEmployeeNameToDelete={setEmployeeNameToDelete}
          setShowModal={setShowModal}
          setTriggerRefresh={setTriggerRefresh}
        />
      )}
    </div>
  );
}
