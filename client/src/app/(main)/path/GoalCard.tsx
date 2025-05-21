import React from "react";
import { FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

interface GoalCardProps {
  information: string;
  term: string;
  completed: boolean;
  status: string;
}

const GoalCard = ({ information, term, completed, status }: GoalCardProps) => {
  let Icon;
  let iconColor;

  if (status === "pending") {
    Icon = FiClock;
    iconColor = "text-yellow-500";
  } else if (status === "approved") {
    Icon = FiCheckCircle;
    iconColor = "text-green-500";
  } else {
    Icon = FiXCircle;
    iconColor = "text-red-500";
  }

  return (
    <div className="flex items-center justify-between bg-[#eee9f3] dark:bg-[#644782] border dark:border-[#444] p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <Icon className={iconColor} size={20} />
        <div>
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            {information}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estado: {completed ? "Meta Completada" : "Meta en Progreso"}
          </p>
        </div>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{term}</span>
    </div>
  );
};

export default GoalCard;
