"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "lib/utils";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import DeleteMemberModal from "./DeleteMemberModal";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";

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
  setTriggerEmployeesRefresh: (triggerEmployeesRefresh: boolean) => void;
  editable?: boolean;
}

export default function TeamCard({
  projectId,
  employees,
  onFeedbackClick,
  setTriggerEmployeesRefresh,
  editable = true,
}: TeamCardProps) {
  const membersPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [employeeIdTodelete, setEmployeeIdToDelete] = useState<string>(null);
  const [employeeNameToDelete, setEmployeeNameToDelete] =
    useState<string>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editChargeabilityMap, setEditChargeabilityMap] = useState<
    Record<string, boolean>
  >({});
  const [tempChargeabilityMap, setTempChargeabilityMap] = useState<
    Record<string, number>
  >({});
  const [confirmedChargeabilityMap, setConfirmedChargeabilityMap] = useState<
    Record<string, number>
  >({});
  const totalPages = Math.ceil(employees.length / membersPerPage);
  const startIdx = (currentPage - 1) * membersPerPage;
  const currentMembers = employees.slice(startIdx, startIdx + membersPerPage); // mantener orden original
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;

  const handleDeleteInfo = (employeeId: string, employeeName: string) => {
    setEmployeeIdToDelete(employeeId);
    setEmployeeNameToDelete(employeeName);
    setShowModal(true);
  };

  const handleEditChargeability = (
    employeeId: string,
    chargeability: number
  ) => {
    setEditChargeabilityMap((prev) => ({ ...prev, [employeeId]: true }));
    setTempChargeabilityMap((prev) => ({
      ...prev,
      [employeeId]: chargeability ?? 0,
    }));
  };

  const handleSave = async (
    employeeId: string,
    originalChargeability: number
  ) => {
    const newChargeability = tempChargeabilityMap[employeeId];

    setConfirmedChargeabilityMap((prev) => ({
      ...prev,
      [employeeId]: newChargeability,
    }));

    onSubmit(employeeId);

    if (newChargeability !== originalChargeability) {
      await handleSubmit({
        employeeId,
        tempMemberChargeability: newChargeability,
      });
    }
  };

  const onCancel = (employeeId: string, originalChargeability: number) => {
    setEditChargeabilityMap((prev) => ({ ...prev, [employeeId]: false }));
    setTempChargeabilityMap((prev) => ({
      ...prev,
      [employeeId]: originalChargeability ?? 0,
    }));
  };

  const onSubmit = (employeeId: string) => {
    setEditChargeabilityMap((prev) => ({ ...prev, [employeeId]: false }));
  };

  const handleSubmit = async ({
    employeeId,
    tempMemberChargeability,
  }: {
    employeeId: string;
    tempMemberChargeability: number;
  }) => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    try {
      const response = await authFetch(
        `${url}/projects/${projectId}/${employeeId}/chargeability`,
        {
          method: "PATCH",
          body: JSON.stringify({
            newChargeability: tempMemberChargeability,
          }),
        }
      );
      if (!response) {
        router.push("/login");
        return;
      }

      setTriggerEmployeesRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error patching chargeability", error);
    }
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
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes size={14} />
              </button>
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
        {employees.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-center text-black dark:text-gray-300 text-sm">
            {editable
              ? "Aún no agregas empleados al proyecto, revisa la sección de aplicantes"
              : "Ya no es posible visualizar a los empleados que estuvieron en este proyecto"}
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            {currentMembers.map((member) => {
              const isEditingChargeability =
                editChargeabilityMap[member.employeeId] || false;
              const tempValue =
                tempChargeabilityMap[member.employeeId] ??
                confirmedChargeabilityMap[member.employeeId] ??
                member.chargeability ??
                0;

              return (
                <div
                  key={member.employeeId}
                  className="flex flex-col items-center text-center relative min-h-[20rem] gap-3 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-[#65417f] dark:text-white font-semibold">
                      {member.employeeName}
                    </h4>
                    {editable && isEditing && (
                      <button
                        onClick={() =>
                          handleDeleteInfo(
                            member.employeeId,
                            member.employeeName
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes size={12} />
                      </button>
                    )}
                  </div>

                  <div className="w-28 sm:w-32 aspect-square relative">
                    <Image
                      src={
                        member.profilePic
                          ? `data:image/png;base64,${member.profilePic}`
                          : "/profile.png"
                      }
                      alt="Foto de perfil"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member.position}
                    </p>
                    <div className="flex gap-[0.5rem] items-center">
                      {!isEditing ? (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {member.chargeability === null ? (
                            <span>0%</span>
                          ) : (
                            <span>{`${confirmedChargeabilityMap[member.employeeId] ?? member.chargeability}%`}</span>
                          )}
                        </p>
                      ) : !isEditingChargeability ? (
                        <>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {member.chargeability === null ? (
                              <span>0%</span>
                            ) : (
                              <span>{`${confirmedChargeabilityMap[member.employeeId] ?? member.chargeability}%`}</span>
                            )}
                          </p>
                          <button
                            onClick={() =>
                              handleEditChargeability(
                                member.employeeId,
                                member.chargeability
                              )
                            }
                            className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
                          >
                            <FaRegEdit size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={tempValue}
                            onChange={(e) =>
                              setTempChargeabilityMap((prev) => ({
                                ...prev,
                                [member.employeeId]: Number(e.target.value),
                              }))
                            }
                            className="w-16 rounded-md border px-2 py-1 text-sm text-gray-800"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleSave(
                                member.employeeId,
                                member.chargeability
                              )
                            }
                            className="rounded-lg bg-[#65417f] px-2 py-1 font-medium text-white hover:bg-opacity-90"
                          >
                            <FaCheck size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onCancel(member.employeeId, member.chargeability)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTimes size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    className="text-sm text-[#5a3bb3] dark:text-white hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A] rounded-[10px] px-3 py-2"
                    onClick={() =>
                      onFeedbackClick(member.employeeId, member.employeeName)
                    }
                  >
                    + Añadir retroalimentación
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-4">
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
          setTriggerEmployeesRefresh={setTriggerEmployeesRefresh}
        />
      )}
    </div>
  );
}
