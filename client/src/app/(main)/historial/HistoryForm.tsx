"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { validation } from "@utils/validation";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

interface HistoryFormProps {
  historyId: string | null;
  setHistoryId: (id: string | null) => void;
  information: string;
  setInformation: (value: string) => void;
  position: string;
  setPosition: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  setOpenAddHistory: (value: boolean) => void;
  isPost: boolean;
  isPatch: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryForm = ({
  historyId,
  setHistoryId,
  information,
  setInformation,
  position,
  setPosition,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  company,
  setCompany,
  setOpenAddHistory,
  isPost,
  isPatch,
  setRefresh,
}: HistoryFormProps) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const initialValuesRef = useRef<Map<string, string>>(new Map(null));
  const [triggerPatch, setTriggerPatch] = useState<boolean>(false);
  const [triggerPost, setTriggerPost] = useState<boolean>(false);
  const hasMounted = useRef(false);
  const url = "http://localhost:8080/api";

  const closeAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpenAddHistory(false);
      resetForm();
      setHistoryId(null);
    }, 200);
  };

  const resetForm = () => {
    setHistoryId("");
    setPosition("");
    setCompany("");
    setInformation("");
    setStartDate("");
    setEndDate("");
  };

  const getLastDayOfMonthISOString = (monthStr: string): string => {
    if (!monthStr || !monthStr.includes("-")) {
      throw new Error(`Invalid date format passed: ${monthStr}`);
    }

    const [year, month] = monthStr.split("-").map(Number);

    if (isNaN(year) || isNaN(month)) {
      throw new Error(`Invalid year/month values: ${year}, ${month}`);
    }

    const date = new Date(year, month, 0);
    return date.toISOString();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        closeAnimation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isPost) return;
    if (
      !triggerPost ||
      !information ||
      !position ||
      !startDate ||
      !endDate ||
      !company
    )
      return;
    const PostData = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      const postValues = {
        information,
        position,
        startDate: getLastDayOfMonthISOString(startDate),
        endDate: getLastDayOfMonthISOString(endDate),
        company,
      };

      console.log(postValues);

      try {
        const response = await authFetch(`${url}/history`, {
          method: "POST",
          body: JSON.stringify({
            ...postValues,
          }),
        });
        if (!response) {
          router.push("/login");
          return;
        }

        console.log(response);

        setRefresh((prev) => !prev);
      } catch (error) {
        console.error(`Failed posting, error: ${error}`);
      } finally {
        closeAnimation();
      }
    };
    PostData();
  }, [triggerPost]);

  useEffect(() => {
    if (!isPatch) return;
    if (!information || !position || !startDate || !endDate || !company) return;
    if (!initialValuesRef) return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const patchData = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      const currentValues = {
        information,
        position,
        startDate: getLastDayOfMonthISOString(startDate),
        endDate: getLastDayOfMonthISOString(endDate),
        company,
      };

      const payLoad: Record<string, string> = {};

      for (const [key, currentValue] of Object.entries(currentValues)) {
        const originalValue = initialValuesRef.current.get(key);

        const normalizedOriginal =
          key === "startDate" || key === "endDate"
            ? getLastDayOfMonthISOString(originalValue!)
            : originalValue;

        if (currentValue !== normalizedOriginal) {
          payLoad[key] = currentValue;
        }
      }

      if (Object.keys(payLoad).length === 0) {
        console.log("No se detectaron cambios. El modal sigue abierto.");
        return;
      }

      try {
        const response = await authFetch(`${url}/history`, {
          method: "PATCH",
          body: JSON.stringify({ historyId, ...payLoad }),
        });

        if (!response) {
          router.push("/login");
          return;
        }

        console.log("PATCH exitoso:", response);
        setRefresh((prev) => !prev);
        closeAnimation();
      } catch (error) {
        console.error("Error al hacer PATCH:", error);
      }
    };

    patchData();
  }, [triggerPatch]);

  useEffect(() => {
    if (!information || !position || !startDate || !endDate || !company) return;

    const map = new Map([
      ["information", information],
      ["position", position],
      ["startDate", startDate],
      ["endDate", endDate],
      ["company", company],
    ]);

    initialValuesRef.current = map;
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm bg-black/50">
      <form
        ref={modalRef}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (isPatch) setTriggerPatch((prev) => !prev);
          else setTriggerPost((prev) => !prev);
        }}
        className={`w-full max-w-3xl rounded-[10px] bg-[#f8f6fa] dark:bg-[#311a42] shadow-1 dark:shadow-card p-6 sm:p-8 space-y-6 transition-all duration-300 ease-in-out ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Puesto
            </label>
            <input
              className="w-full rounded-md p-3 bg-[#e7deed] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Escribe el nombre del puesto..."
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Descripción
            </label>
            <textarea
              rows={4}
              maxLength={250}
              className="w-full rounded-md p-3 bg-[#ede5f2] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Describe el trabajo realizado..."
              required
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Empresa
            </label>
            <input
              className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Nombre de la empresa"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Fecha Inicio
              </label>
              <input
                className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="month"
                required
                value={startDate ? startDate.slice(0, 7) : ""}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Fecha Fin
              </label>
              <input
                className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="month"
                required
                value={endDate ? endDate.slice(0, 7) : ""}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
            onClick={closeAnimation}
          >
            Cancelar
          </button>

          <input
            type="submit"
            value="Guardar Empleo"
            className="bg-[#7B2FE0] hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-md transition duration-200 cursor-pointer"
          />
        </div>
      </form>
    </div>,
    document.body
  );
};

export default HistoryForm;
