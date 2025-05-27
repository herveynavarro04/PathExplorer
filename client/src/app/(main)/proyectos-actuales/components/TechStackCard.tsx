"use client";

import { useState, useEffect } from "react";
import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function TechStackCard({
  stack,
  editable = true,
}: {
  stack: string[];
  editable?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [allStack, setAllStack] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const [addStack, setAddStack] = useState<string[]>([]);
  const [deleteStack, setDeleteStack] = useState<string[]>([]);
  const [triggerSave, setTriggerSave] = useState(false);

  const uniqueTech = Array.from(
    new Set(stack.concat(["PostgreSQL", "Next.js", "Node.js", "React", "MongoDB", "Tailwind", "NestJS", "TypeScript"]))
  );

  useEffect(() => {
    setSelectedStack(stack);
    setAllStack(uniqueTech);
    setAddStack([]);
    setDeleteStack([]);
  }, [stack]);

  useEffect(() => {
    if (!triggerSave) return;

    // Simular persistencia
    console.log("🟢 Guardado:");
    console.log("➕ Añadidos:", addStack);
    console.log("➖ Eliminados:", deleteStack);

    setTriggerSave(false);
    setIsEditing(false);
    setAddStack([]);
    setDeleteStack([]);
  }, [triggerSave]);

  const addTech = (tech: string) => {
    if (!selectedStack.includes(tech)) {
      setSelectedStack([...selectedStack, tech]);
      setAddStack([...addStack, tech]);
      setDeleteStack(deleteStack.filter((t) => t !== tech));
      setSearchTerm("");
    }
  };

  const removeTech = (tech: string) => {
    setSelectedStack(selectedStack.filter((item) => item !== tech));
    if (stack.includes(tech)) {
      setDeleteStack([...deleteStack, tech]);
    } else {
      setAddStack(addStack.filter((t) => t !== tech));
    }
  };

  const cancelEdit = () => {
    setSelectedStack(stack);
    setAddStack([]);
    setDeleteStack([]);
    setSearchTerm("");
    setIsEditing(false);
  };

  const saveChanges = () => {
    setTriggerSave(true);
  };

  const filteredStack = allStack.filter(
    (tech) =>
      tech.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedStack.includes(tech)
  );

  return (
    <ShowcaseSectionSkill
      title="Stack Tecnológico"
      className="!p-7 h-[8rem]"
      action={
        editable &&
        (isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-lg bg-[#65417f] px-2 py-[5px] font-medium text-white hover:bg-opacity-90"
            >
              <FaCheck size={14} />
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-red-600 hover:text-red-800"
            >
              <FaTimes size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
          >
            <FaRegEdit size={16} />
          </button>
        ))
      }
    >
      <div className="flex flex-col justify-between h-full">
        {editable && isEditing && (
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 25)}
              placeholder="Buscar tecnología"
              className="w-full rounded-lg border border-gray-3 bg-white dark:border-dark-3 dark:bg-dark-2 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-purple-800"
            />
            {isFocused && (
              <div className="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border dark:border-dark-3 dark:bg-dark-2 border-gray-3 bg-white text-sm shadow-lg">
                {filteredStack.slice(0, 10).map((tech) => (
                  <div
                    key={tech}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-2 dark:hover:bg-gray-7"
                    onMouseDown={() => addTech(tech)}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-start gap-2.5 overflow-y-auto pr-1 pt-1 h-full">
          {selectedStack.length === 0 ? (
            <div className="w-full flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
                Aún no se ha definido el stack tecnológico.
              </p>
            </div>
          ) : (
            selectedStack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-[#e8deef] dark:bg-[#a896b3] dark:border-[#877691] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
              >
                {tech}
                {editable && isEditing && (
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                  >
                    ×
                  </button>
                )}
              </span>
            ))
          )}
        </div>
      </div>
    </ShowcaseSectionSkill>
  );
}
