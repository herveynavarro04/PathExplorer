
import { FaRegTrashAlt } from "react-icons/fa";
import { cn } from "lib/utils";

type CertCardProps = {
  certificateId: string;
  title: string;
  status: "pending" | "rejected" | "validated";
  createdAt: string;
  information?: string;
  onClick: (certificate: any) => void;
  onDelete: (certificateId: string) => void;
  className?: string;
};

const CertCard: React.FC<CertCardProps> = ({
  certificateId,
  title,
  status,
  createdAt,
  information,
  onClick,
  onDelete,
  className,
}) => {
  const statusMap = {
    pending: { label: "Pendiente", color: "bg-yellow-200 text-yellow-800" },
    rejected: { label: "Rechazado", color: "bg-red-200 text-red-800" },
    validated: { label: "Aprobado", color: "bg-green-200 text-green-800" },
  };

  const statusInfo = statusMap[status] || {
    label: status,
    color: "bg-gray-200 text-gray-800",
  };

  return (
    <div
      onClick={() => onClick({ certificateId, title, status, createdAt, information })}
      className={cn("rounded-[10px] bg-[#f8f6fa] shadow-1 hover:scale-105 transition duration-300 ease-in-out hover:cursor-pointer dark:bg-[#482a5e] relative h-[10rem]", className)}
    >
      <div className="border-b border-stroke px-2 py-2 bg-[#eee9f3] dark:bg-[#644782] rounded-t-[10px] font-medium text-dark dark:text-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm px-2 py-1 rounded capitalize", statusInfo.color)}>
            {statusInfo.label}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(certificateId);
            }}
            className="text-red-600 hover:text-red-800"
            title="Eliminar"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-3rem)] flex flex-col items-center justify-center px-4 text-sm text-gray-700 dark:text-gray-200">
        <p className="text-center mt-1">{information}</p>
      </div>
    </div>
  );
};

export default CertCard;
