import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { cn } from "lib/utils";

interface HistoryCardProps {
  posicion: string;
  descripcion: string;
  empresa: string;
  fecha_inicio: string;
  fecha_fin: string;
  setOpendDeleteCard: (open: boolean) => void;
  onClick?: () => void;
  className?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  posicion,
  descripcion,
  empresa,
  fecha_inicio,
  fecha_fin,
  setOpendDeleteCard,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#482a5e] dark:shadow-card relative h-[14rem]",
        className
      )}
    >
      <div className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-dark dark:text-white sm:px-6 xl:px-7.5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{posicion}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{empresa}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpendDeleteCard(true);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Eliminar entrada"
            title="Eliminar entrada"
          >
            <FaRegTrashAlt size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 xl:p-10 text-sm text-gray-700 dark:text-gray-200 space-y-4">
        <p>{descripcion}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {fecha_inicio} &ndash; {fecha_fin}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;

