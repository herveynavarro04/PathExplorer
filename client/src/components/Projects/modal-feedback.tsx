"use client";

import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";
import { validation } from "@utils/validation";

type ModalFeedbackProps = {
  onClose: () => void;
  selectedEmployeeId: string;
  selectedEmployeeName: string;
};

export default function ModalFeedback({
  onClose,
  selectedEmployeeId,
  selectedEmployeeName,
}: ModalFeedbackProps) {
  const [information, setInformation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const url = "http://localhost:8080/api";

  const handleSubmit = async () => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    try {
      const response = await authFetch(
        `${url}/feedback/${selectedEmployeeId}`,
        {
          method: "POST",
          body: JSON.stringify({ information }),
        }
      );
      if (!response) {
        router.push("/login");
        return;
      }

      console.log(response);

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setInformation("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to update skills:", error);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#f3e8ff] dark:bg-[#311a42] p-6 rounded-xl w-96 text-center shadow-xl"
      >
        <h2 className="text-lg font-bold text-[#65417f] dark:text-white mb-2">
          Retroalimentación para {selectedEmployeeName}
        </h2>

        {!submitted ? (
          <>
            <textarea
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full h-24 border text-black dark:text-white rounded-md p-2 mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-[#65417f] hover:bg-opacity-80 text-white px-4 py-2 rounded-lg"
              >
                Guardar
              </button>
              <button
                onClick={onClose}
                className="justify-center rounded-lg bg-[#cec2d7] border-stroke px-4 py-2 font-medium dark:bg-gray-600 dark:hover:bg-opacity-75 text-dark hover:bg-opacity-80 dark:text-white"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <p className="text-[#5a3bb3] dark:text-white font-medium">
            ¡Retroalimentación enviada!
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
