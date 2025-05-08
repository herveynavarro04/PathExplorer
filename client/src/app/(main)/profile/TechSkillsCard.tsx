"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@utils/authFetch";
import { ShowcaseSection } from "components/Layouts/showcase-section";

type TechSkillsCardProps = {
  techSkillMap: Map<string, [string, boolean]>; 
  url: string;
};

const TechSkillsCard = ({ techSkillMap, url }: TechSkillsCardProps) => {
  const [selectedTechSkills, setSelectedTechSkills] = useState<string[]>([]);
  const [allTechSkills, setAllTechSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const MAX_SKILLS = 20;

  useEffect(() => {
    const selected: string[] = [];
    const all: string[] = [];

    techSkillMap.forEach(([_, isSelected], skillName) => {
      all.push(skillName);
      if (isSelected) selected.push(skillName);
    });

    setSelectedTechSkills(selected);
    setAllTechSkills(all);
  }, [techSkillMap]);

  const filteredSkills = allTechSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTechSkills.includes(skill)
  );

  const addSkill = (skill: string) => {
    if (selectedTechSkills.length >= MAX_SKILLS) return;
    setSelectedTechSkills([...selectedTechSkills, skill]);
    setSearchTerm("");
  };

  const removeSkill = (skill: string) => {
    setSelectedTechSkills(selectedTechSkills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    const addSkills: string[] = [];
    const deleteSkills: string[] = [];

    techSkillMap.forEach(([id, wasSelected], skillName) => {
      const isNowSelected = selectedTechSkills.includes(skillName);
      if (!wasSelected && isNowSelected) addSkills.push(id);
      if (wasSelected && !isNowSelected) deleteSkills.push(id);
    });

    try {
      await authFetch(`${url}/user/skills`, {
        method: "PATCH",
        body: JSON.stringify({ addSkills, deleteSkills }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update skills:", error);
    }
  };

  return (
    <ShowcaseSection title="Habilidades Técnicas" className="!p-7">
      <div className="flex flex-col gap-5">
        {isEditing && (
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar habilidad"
              className="w-full rounded-lg border border-gray-3 bg-white dark:border-dark-3 dark:bg-dark-2 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-primary"
            />
            {searchTerm && (
              <div className="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border dark:border-dark-3 dark:bg-dark-2 border-gray-3 bg-white text-sm shadow-lg">
                {filteredSkills.slice(0, 10).map((skill) => (
                  <div
                    key={skill}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-2 dark:hover:bg-gray-7"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2.5">
          {selectedTechSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 rounded-full bg-[#e8deef] dark:border-[#877691] dark:bg-[#a896b3] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
            >
              {skill}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-gray-500 hover:text-red"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          {isEditing ? (
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-white hover:bg-opacity-90"
            >
              Guardar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75 transition-colors"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </ShowcaseSection>
  );
};

export default TechSkillsCard;
