"use client";

import { useState } from "react";
import { cn } from "lib/utils";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";

interface DatesCardProps {
  startDate: Date;
  endDate: Date;
  editable?: boolean;
}

export default function DatesCard({
  startDate,
  endDate,
  editable = true,
}: DatesCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStartDate, setCurrentStartDate] = useState(startDate);
  const [currentEndDate, setCurrentEndDate] = useState(endDate);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleSave = () => {
    setCurrentStartDate(tempStartDate);
    setCurrentEndDate(tempEndDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempStartDate(currentStartDate);
    setTempEndDate(currentEndDate);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "relative rounded-xl bg-white dark:bg-[#311a42] px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-700 dark:text-gray-300"
      )}
    >
      {editable && (
        <div className="absolute top-2 right-2 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-lg bg-[#65417f] px-2 py-1 font-medium text-white hover:bg-opacity-90"
              >
                <FaCheck size={12} />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes size={13} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
            >
              <FaRegEdit size={15} />
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-black dark:text-white">
            Inicio
          </p>
          {editable && isEditing ? (
            <input
              type="date"
              className="w-full rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f]"
              value={tempStartDate.toISOString().split("T")[0]}
              onChange={(e) => setTempStartDate(new Date(e.target.value))}
            />
          ) : (
            <div className="text-[#65417f] rounded-xl font-medium break-words">
              {currentStartDate.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-black dark:text-white">Fin</p>
          {editable && isEditing ? (
            <input
              type="date"
              className="w-full rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f]"
              value={tempEndDate.toISOString().split("T")[0]}
              onChange={(e) => setTempEndDate(new Date(e.target.value))}
            />
          ) : (
            <div className="text-[#65417f] rounded-xl font-medium break-words">
              {currentEndDate.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
