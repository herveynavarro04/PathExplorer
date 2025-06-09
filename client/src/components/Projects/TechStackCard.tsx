"use client";

import { useState, useEffect } from "react";
import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";

interface TechStackCardProps {
  stack: TechDto[];
  techs: TechDto[];
  projectId: string;
  editable: boolean;
  setTriggerProjectsRefresh: (triggerProjectsRefresh: boolean) => void;
}

interface TechDto {
  technologyId: string;
  technologyName: string;
}

export default function TechStackCard({
  stack,
  techs,
  projectId,
  editable = true,
  setTriggerProjectsRefresh,
}: TechStackCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [allStack, setAllStack] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [addTechs, setAddTechs] = useState<string[]>([]);
  const [deleteTechs, setDeleteTechs] = useState<string[]>([]);
  const [techProjectMap, setTechProjectMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const MAX_TECH = 20;
  const router = useRouter();
  const url = "http://localhost:8080/api";

  useEffect(() => {
    const techProjecthNames = new Set(stack.map((tech) => tech.technologyName));
    const techProjectMap = new Map<string, [string, boolean]>(
      techs.map((tech) => [
        tech.technologyName,
        [tech.technologyId, techProjecthNames.has(tech.technologyName)],
      ])
    );

    setTechProjectMap(techProjectMap);
  }, []);

  useEffect(() => {
    if (!techProjectMap) return;
    const selected: string[] = [];
    const all: string[] = [];

    techProjectMap.forEach(([_, isSelected], skillName) => {
      all.push(skillName);
      if (isSelected) selected.push(skillName);
    });

    setSelectedStack(selected);
    setAllStack(all);
  }, [techProjectMap]);

  const patchTech = async () => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    try {
      const response = await authFetch(`${url}/projects/${projectId}/techs`, {
        method: "PATCH",
        body: JSON.stringify({ addTechs, deleteTechs }),
      });
      if (!response) {
        router.push("/login");
        return;
      }

      setIsEditing(false);
      setAddTechs([]);
      setDeleteTechs([]);
      setTriggerProjectsRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  };

  useEffect(() => {
    console.log(addTechs);
  }, [addTechs]);

  useEffect(() => {
    console.log(deleteTechs);
  }, [deleteTechs]);

  const addTech = (tech: string) => {
    if (selectedStack.length < MAX_TECH) {
      setSelectedStack([...selectedStack, tech]);
      setAddTechs([...addTechs, techProjectMap!.get(tech)![0]]);
      setSearchTerm("");
    }
  };

  const removeTech = (tech: string) => {
    setSelectedStack(selectedStack.filter((t) => t !== tech));
    setDeleteTechs([...deleteTechs, techProjectMap.get(tech)[0]]);
  };

  const cancelEdit = () => {
    if (!techProjectMap) return;
    const selected: string[] = [];

    techProjectMap.forEach(([_, isSelected], tech) => {
      if (isSelected) selected.push(tech);
    });

    setSelectedStack(selected);
    setAddTechs([]);
    setDeleteTechs([]);
    setSearchTerm("");
    setIsEditing(false);
  };

  const filteredStack = allStack.filter(
    (tech) =>
      !selectedStack.includes(tech) &&
      tech.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <ShowcaseSectionSkill
      title="Stack Tecnológico"
      className="!p-3 h-[8rem]"
      action={
        editable &&
        (isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={patchTech}
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
                {filteredStack.map((tech) => (
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
