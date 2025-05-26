
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaRegEdit, FaTimes } from "react-icons/fa";

export default function ProgressCard({
  progress,
  onProgressChange,
}: {
  progress: number;
  onProgressChange: (value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  const [tempProgress, setTempProgress] = useState(progress);

  useEffect(() => {
    setLocalProgress(progress);
    setTempProgress(progress);
  }, [progress]);

  const handleSave = () => {
    setLocalProgress(tempProgress);
    onProgressChange(tempProgress);
    setIsEditing(false);
    
  };

  const handleCancel = () => {
    setTempProgress(localProgress);
    setIsEditing(false);
  };

  return (
    <div className="rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#311a42] dark:shadow-card">
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 sm:px-6 xl:px-7.5 dark:border-dark-3">
        <h2 className="font-medium text-dark dark:text-white">Progreso del proyecto</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#65417f] px-2 py-[5px] font-medium text-white hover:bg-opacity-90"
              >
                <FaCheck size={14} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes size={14} />
              </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
          >
            <FaRegEdit size={15} />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 xl:p-10">
<div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mt-4 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#c6b0dc" strokeWidth="10" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#65417f"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - localProgress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - localProgress / 100) }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black dark:text-white">
            {localProgress}%
          </div>
        </div>

{!isEditing && (
  <div className="mt-4 text-center">
    <p className="inline-block text-xs rounded-md px-2 py-1 text-gray-900 dark:text-white ">
      Actualiza el progreso del proyecto
    </p>
  </div>
)}


        {isEditing && (
          <div className="mt-4 text-center">
            <input
              type="number"
              value={tempProgress}
              onChange={(e) => {
                const val = Math.min(100, Math.max(0, parseInt(e.target.value)));
                setTempProgress(isNaN(val) ? 0 : val);
              }}
              className="text-center w-20 rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
