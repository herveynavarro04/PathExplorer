"use client";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiInfo, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import GoalCard from "./GoalCard";

interface Goal {
  information: string;
  term: string;
  completed: boolean;
  status: string;
}

interface GoalCardClientProps {
  goals: Goal[];
  setOpenForm: (openForm: boolean) => void;
}

const GoalCardClient = ({ goals, setOpenForm }: GoalCardClientProps) => {
  return (
    <section className="max-w-5xl mx-auto bg-white dark:bg-[#4f2e6f] shadow-lg rounded-2xl p-6 h-[20rem] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 relative group">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Mis metas profesionales
          </h2>

          {/* Info icon */}
          <FiInfo
            className="text-gray-500 dark:text-gray-300 cursor-pointer"
            size={18}
          />

          {/* Tooltip */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 w-72 text-sm bg-white dark:bg-[#2b2b2b] text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-3 z-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-600" size={16} />
                Meta validada por el People Lead
              </li>
              <li className="flex items-center gap-2">
                <FiXCircle className="text-red-500" size={16} />
                Meta rechazada
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-yellow-500" size={16} />
                En espera de validación
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 bg-[#65417f] hover:bg-[#5a366e] text-white font-medium px-4 py-2 rounded-full transition"
        >
          <CiCirclePlus size={20} /> Registrar nueva meta
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2" style={{ flexGrow: 1 }}>
        {goals.map((goal, idx) => (
          <GoalCard
            key={idx}
            information={goal.information}
            term={goal.term}
            completed={goal.completed}
            status={goal.status}
          />
        ))}
      </div>
    </section>
  );
};

export default GoalCardClient;
