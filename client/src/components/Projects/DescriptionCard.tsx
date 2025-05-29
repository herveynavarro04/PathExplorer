"use client";

import { useState } from "react";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import { cn } from "lib/utils";

interface DescriptionCardProps {
  description: string;
  editable: boolean;
}

export default function DescriptionCard({
  description,
  editable = true,
}: {
  description: string;
  editable?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(description);
  const [tempDesc, setTempDesc] = useState(description);

  const handleSave = () => {
    setDesc(tempDesc);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDesc(desc);
    setIsEditing(false);
  };

  return (
    <div className="rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#311a42] dark:shadow-card">
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 sm:px-6 xl:px-7.5 dark:border-dark-3">
        <h2 className="text-sm sm:text-base font-medium text-dark dark:text-white">
          Descripción
        </h2>
        {editable && (
          <div className="flex items-center gap-2">
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
                <FaRegEdit size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={cn("p-4 sm:p-6 xl:p-10")}>
        <div className="flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">
          {editable && isEditing ? (
            <textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              rows={3}
              className="w-full resize-none text-center rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f] text-sm"
            />
          ) : (
            <span className="text-center block w-full break-words">{desc}</span>
          )}
        </div>
      </div>
    </div>
  );
}
