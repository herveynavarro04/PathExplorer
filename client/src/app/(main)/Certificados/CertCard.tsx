
import { FaRegTrashAlt} from "react-icons/fa";
import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

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
    pending: { label: "Pendiente", icon: <FiClock />, color: " text-yellow-500" },
    rejected: { label: "Rechazado", icon: <FiXCircle />, color: " text-red-700" },
    validated: { label: "Aprobado", icon: <FiCheckCircle />, color: "text-green-600" },
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
        <h2 className="text-lg font-semibold pl-2">{title}</h2>
        <div className="flex items-center gap-2">
          <span className={cn("text-md px-2 py-1 rounded capitalize", statusInfo.color)}>
            {statusInfo.icon}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(certificateId);
            }}
            className="text-gray-600 hover:text-red-800"
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
