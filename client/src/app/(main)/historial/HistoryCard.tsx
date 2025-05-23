import React from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { cn } from "lib/utils";

interface HistoryCardProps {
  historyId: string;
  information: string;
  position: string;
  startDate: string;
  endDate: string;
  company: string;
  setHistoryId: (historyId: string | null) => void;
  setInformation: (information: string) => void;
  setPosition: (position: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setCompany: (company: string) => void;
  setOpenAddHistory: (openAddHistory: boolean) => void;
  setOpendDeleteCard: (openDeleteCard: boolean) => void;
  setIsPatch: (isPatch: boolean) => void;
}

const formatDateToMonthYear = (date: string) => {
  const d = new Date(date);
  const month = d.toLocaleDateString("es-MX", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = d.getFullYear();
  return `${capitalizedMonth} ${year}`;
};

const HistoryCard = ({
  historyId,
  information,
  position,
  startDate,
  endDate,
  company,
  setHistoryId,
  setInformation,
  setPosition,
  setStartDate,
  setEndDate,
  setCompany,
  setOpenAddHistory,
  setOpendDeleteCard,
  setIsPatch,
}: HistoryCardProps) => {
  const onEdit = () => {
    setHistoryId(historyId);
    setInformation(information);
    setPosition(position);
    setStartDate(startDate);
    setEndDate(endDate);
    setCompany(company);
    setOpenAddHistory(true);
    setIsPatch(true);
  };

  const onDelete = () => {
    setHistoryId(historyId);
    setOpendDeleteCard(true);
  };

  return (
    <div
      className={cn(
        "rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#482a5e] dark:shadow-card relative h-[14rem]"
      )}
    >
      <div className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark dark:text-white sm:px-6 xl:px-7.5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{position}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {company}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Editar entrada"
              title="Editar entrada"
            >
              <FaRegEdit size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Eliminar entrada"
              title="Eliminar entrada"
            >
              <FaRegTrashAlt size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 xl:p-10 text-sm text-gray-700 dark:text-gray-200 space-y-4">
        <p>{information}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDateToMonthYear(startDate)} &ndash;{" "}
          {formatDateToMonthYear(endDate)}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
