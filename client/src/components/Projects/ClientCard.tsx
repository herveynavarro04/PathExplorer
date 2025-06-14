"use client";

import { useState } from "react";
import { cn } from "lib/utils";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";

interface ClientCardProps {
  client: string;
  setClient: (value: string) => void;
  editable?: boolean;
  patchData: (updatedFields: Record<string, any>) => void;
}

export default function ClientCard({
  client,
  setClient,
  patchData,
  editable = true,
}: ClientCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempClient, setTempClient] = useState<string>(client);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await patchData({
      client: tempClient,
    });

    setClient(tempClient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempClient(client);
    setIsEditing(false);
  };

  return (
    <div className={cn("relative rounded-xl bg-white dark:bg-[#311a42]2")}>
      {editable && (
        <div className="absolute top-2 right-2 flex gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#65417f] px-2 py-1 font-medium text-white hover:bg-opacity-90"
              >
                <FaCheck size={12} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes size={13} />
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
            >
              <FaRegEdit size={15} />
            </button>
          )}
        </div>
      )}

      <h3 className="pl-5 pt-1 pb-1 text-md text-gray-800 dark:text-white">
        Cliente
      </h3>

      <div className="h-12 flex pb-3 items-center justify-center font-bold text-gray-700 dark:text-gray-300">
        {editable && isEditing ? (
          <input
            value={tempClient}
            onChange={(e) => setTempClient(e.target.value)}
            className="text-center text-2xl font-bold rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f]"
          />
        ) : (
          <span className="text-2xl">{client}</span>
        )}
      </div>
    </div>
  );
}
