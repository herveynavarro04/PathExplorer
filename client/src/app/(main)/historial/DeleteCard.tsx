"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { validation } from "@utils/validation";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

interface DeleteCardProps {
  setOpenDeleteCard: (openDeleteCard: boolean) => void;
  historyId: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteCard = ({
  setOpenDeleteCard,
  historyId,
  setRefresh,
}: DeleteCardProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const url = "http://localhost:8080/api";
  const [triggerDelete, setTriggerDelete] = useState<boolean>(false);

  const closeModal = () => {
    console.log("Closing modal...");
    setOpenDeleteCard(false);
    setIsVisible(false);
  };

  useEffect(() => {
    const deleteData = async () => {
      if (!triggerDelete) return;

      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      try {
        const response = await authFetch(`${url}/history/${historyId}`, {
          method: "DELETE",
        });
        if (!response) {
          router.push("/login");
          return;
        }
        setRefresh((prev) => !prev);
        console.log("Deleted:", response);
      } catch (error) {
        console.error("Error deleting", error);
      } finally {
        closeModal();
      }
    };

    deleteData();
  }, [triggerDelete]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      console.log("Click event triggered", { target });

      if (modalRef.current && !modalRef.current.contains(target)) {
        console.log("Click outside detected");
        closeModal();
      } else {
        console.log("Click inside modal, ignoring");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
      <div
        ref={modalRef}
        className={`bg-[#fefefe] dark:bg-[#311a42] text-gray-800 dark:text-white rounded-lg p-6 max-w-md w-full transition-all duration-300 ease-in-out shadow-xl ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">¿Eliminar este empleo?</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Esta acción no se puede deshacer. ¿Estás seguro de que quieres
          eliminarlo?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setTriggerDelete(true);
            }}
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

export default DeleteCard;
