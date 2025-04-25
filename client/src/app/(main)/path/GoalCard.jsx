import React from "react";
import {
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

const GoalCard = ({ information, term, completed }) => {
  const Icon = completed ? FiCheckCircle : FiXCircle;

  return (
    <div
      className="flex items-center justify-between bg-white/10 backdrop-blur-sm
                 p-4 rounded-2xl shadow-md"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-white" size={20} />
        <p className="italic">{information}</p>
      </div>
      <span className="text-sm font-medium">{term}</span>
    </div>
  );
};

export default GoalCard;
