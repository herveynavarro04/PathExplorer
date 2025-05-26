"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@utils/authFetch";
import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";

type SoftSkillsCardProps = {
  skills: SkillsResponse;
  userSkills: UserSkillsResponse;
  url: string;
};

type Skill = {
  skillName: string;
  skillId: string;
};

type SkillsResponse = {
  technicalSkills: Skill[];
  softSkills: Skill[];
};

type UserSkillsResponse = {
  technicalSkills: Skill[];
  softSkills: Skill[];
};

const SoftSkillsCard = ({ skills, userSkills, url }: SoftSkillsCardProps) => {
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [allSoftSkills, setAllSoftSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addSkills, setAddSkills] = useState<string[]>([]);
  const [deleteSkills, setDeleteSkills] = useState<string[]>([]);
  const [triggerSave, setTriggerSave] = useState<boolean>(false);
  const [softSkillMap, setSoftSkillMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const MAX_SKILLS = 20;

  useEffect(() => {
    const userSoftSkillNames = new Set(
      userSkills.softSkills.map((s) => s.skillName)
    );
    const softSkillMap = new Map<string, [string, boolean]>(
      skills.softSkills.map((skill) => [
        skill.skillName,
        [skill.skillId, userSoftSkillNames.has(skill.skillName)],
      ])
    );

    setSoftSkillMap(softSkillMap);
  }, []);

  useEffect(() => {
    if (!softSkillMap) return;
    const selected: string[] = [];
    const all: string[] = [];

    softSkillMap.forEach(([_, isSelected], skillName) => {
      all.push(skillName);
      if (isSelected) selected.push(skillName);
    });

    setSelectedSoftSkills(selected);
    setAllSoftSkills(all);
  }, [softSkillMap]);

  useEffect(() => {
    const patchData = async () => {
      if (!triggerSave) return;

      try {
        await authFetch(`${url}/skills/employee`, {
          method: "PATCH",
          body: JSON.stringify({ addSkills, deleteSkills }),
        });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update skills:", error);
      }

      setAddSkills([]);
      setDeleteSkills([]);
      setTriggerSave(false);
    };

    patchData();
  }, [triggerSave]);

  const filteredSkills = allSoftSkills.filter(
    (skill) =>
      !selectedSoftSkills.includes(skill) &&
      skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSkill = (skill: string) => {
    if (selectedSoftSkills.length >= MAX_SKILLS) return;
    setSelectedSoftSkills([...selectedSoftSkills, skill]);
    setAddSkills([...addSkills, softSkillMap?.get(skill)![0]]);
    setSearchTerm("");
  };

  const removeSkill = (skill: string) => {
    setSelectedSoftSkills(selectedSoftSkills.filter((s) => s !== skill));
    setDeleteSkills([...deleteSkills, softSkillMap?.get(skill)![0]]);
  };

  const cancelEdit = () => {
    if (!softSkillMap) return;
    const selected: string[] = [];

    softSkillMap.forEach(([_, isSelected], skillName) => {
      if (isSelected) selected.push(skillName);
    });

    setSelectedSoftSkills(selected);
    setAddSkills([]);
    setDeleteSkills([]);
    setSearchTerm("");
    setIsEditing(false);
  };

  return (
    <ShowcaseSectionSkill
      title="Habilidades Blandas"
      className="!p-7 h-[11rem]"
      action={
        isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setTriggerSave((prev) => !prev);
              }}
              className="rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-white hover:bg-opacity-90"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-gray-400 bg-transparent px-6 py-[7px] font-medium text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3 transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75 transition-colors"
          >
            Editar
          </button>
        )
      }
    >
      <div className="flex flex-col justify-between h-full">
        {isEditing && (
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 100)}
              placeholder="Buscar habilidad"
              className="w-full rounded-lg border border-gray-3 bg-white dark:border-dark-3 dark:bg-dark-2 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-primary"
            />
            {isFocused && (
              <div className="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border dark:border-dark-3 dark:bg-dark-2 border-gray-3 bg-white text-sm shadow-lg">
                {(searchTerm === "" ? allSoftSkills : filteredSkills)
                  .filter((skill) => !selectedSoftSkills.includes(skill))
                  .slice(0, 10)
                  .map((skill) => (
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

        <div className="flex flex-col flex-grow">
          <div
            className={`flex flex-wrap items-start gap-2.5 overflow-y-auto pr-1 pt-1  ${
              isEditing ? "h-[5rem]" : "h-[8rem]"
            }`}
          >
            {selectedSoftSkills.length === 0 ? (
              <div className="w-full flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
                  Aún no has agregado habilidades blandas.
                </p>
              </div>
            ) : (
              selectedSoftSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-[#e8deef] dark:border-[#877691] dark:bg-[#a896b3] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
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
              ))
            )}
          </div>
        </div>
      </div>
    </ShowcaseSectionSkill>
  );
};

export default SoftSkillsCard;
