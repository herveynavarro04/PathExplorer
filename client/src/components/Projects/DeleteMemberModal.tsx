"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";
import { validation } from "@utils/validation";

interface DeleteMemberModalProps {
  projectId: string;
  employeeIdToDelete: string;
  setEmployeeIdToDelete: (employeeIdToDelete: string) => void;
  employeeNameToDelete: string;
  setEmployeeNameToDelete: (employeeNameToDelete: string) => void;
  setShowModal: (showModal: boolean) => void;
  setTriggerEmployeesRefresh: (triggerEmployeesRefresh: boolean) => void;
}

const DeleteMemberModal = ({
  projectId,
  employeeIdToDelete,
  setEmployeeIdToDelete,
  employeeNameToDelete,
  setEmployeeNameToDelete,
  setShowModal,
  setTriggerEmployeesRefresh,
}: DeleteMemberModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;

  const handleDelete = async () => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    try {
      const response = await authFetch(
        `${url}/projects/${projectId}/${employeeIdToDelete}`,
        {
          method: "PATCH",
        }
      );
      if (!response) {
        router.push("/login");
        return;
      }
      console.log(response);

      onClose();
      setTriggerEmployeesRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  };

  const onClose = () => {
    setShowModal(false);
    setEmployeeIdToDelete(null);
    setEmployeeNameToDelete(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
      <div
        ref={modalRef}
        className={`bg-[#fefefe] dark:bg-[#311a42] text-gray-800 dark:text-white rounded-lg p-6 max-w-md w-full transition-all duration-300 ease-in-out shadow-xl ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">
          ¿Eliminar a {employeeNameToDelete} del equipo?
        </h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar
          a este miembro?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteMemberModal;
