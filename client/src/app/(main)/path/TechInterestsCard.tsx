"use client";

import { useState, useEffect } from "react";
import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

interface TechInterestsCardProps {
  skills: SkillsResponse;
  userInterests: UserInterests;
  url: string;
}

interface Skill {
  skillName: string;
  skillId: string;
}

interface SkillsResponse {
  technicalSkills: Skill[];
  softSkills: Skill[];
}

interface UserInterests {
  technicalSkills: Skill[];
}

const TechInterestsCard = ({
  skills,
  userInterests,
  url,
}: TechInterestsCardProps) => {
  const [selectedTechInterests, setSelectedTechInterests] = useState<string[]>(
    []
  );
  const [allTechInterests, setAllTechInterests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addInterests, setAddInterests] = useState<string[]>([]);
  const [deleteInterests, setDeleteInterests] = useState<string[]>([]);
  const [triggerSave, setTriggerSave] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [interestMap, setInterestMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const router = useRouter();

  const MAX_INTERESTS = 20;

  useEffect(() => {
    const userTechInterestNames = new Set<string>(
      userInterests.technicalSkills.map((skill) => skill.skillName)
    );

    console.log(userTechInterestNames);

    const interestMap = new Map<string, [string, boolean]>(
      skills.technicalSkills.map((skill) => [
        skill.skillName,
        [skill.skillId, userTechInterestNames.has(skill.skillName)],
      ])
    );

    console.log(interestMap);

    setInterestMap(interestMap);
  }, []);

  useEffect(() => {
    if (!interestMap) return;
    const selected: string[] = [];
    const all: string[] = [];

    interestMap.forEach(([_, isSelected], skillName) => {
      all.push(skillName);
      if (isSelected) selected.push(skillName);
    });

    setSelectedTechInterests(selected);
    setAllTechInterests(all);
  }, [interestMap]);

  useEffect(() => {
    const patchData = async () => {
      if (!triggerSave) return;

      const addSkills = addInterests;
      const deleteSkills = deleteInterests;

      try {
        const response = await authFetch(`${url}/skills/employee/interests`, {
          method: "PATCH",
          body: JSON.stringify({ addSkills, deleteSkills }),
        });
        if (!response) {
          router.push("/login");
          return;
        }
        console.log(response);

        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update skills:", error);
      }

      setAddInterests([]);
      setDeleteInterests([]);
      setTriggerSave(false);
    };

    patchData();
  }, [triggerSave]);

  useEffect(() => {
    console.log(addInterests);
  }, [addInterests]);

  useEffect(() => {
    console.log(deleteInterests);
  }, [deleteInterests]);

  const filteredInterests = allTechInterests.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTechInterests.includes(skill)
  );

  const addInterest = (skill: string) => {
    if (selectedTechInterests.length >= MAX_INTERESTS) return;
    setSelectedTechInterests([...selectedTechInterests, skill]);
    setAddInterests([...addInterests, interestMap.get(skill)[0]]);
    setSearchTerm("");
  };

  const removeInterest = (skill: string) => {
    setSelectedTechInterests(selectedTechInterests.filter((s) => s !== skill));
    setDeleteInterests([...deleteInterests, interestMap.get(skill)[0]]);
  };

  const cancelEdit = () => {
  if (!interestMap) return;
  const selected: string[] = [];

  interestMap.forEach(([_, isSelected], skillName) => {
    if (isSelected) selected.push(skillName);
  });

  setSelectedTechInterests(selected);
  setAddInterests([]);
  setDeleteInterests([]);
  setSearchTerm("");
  setIsEditing(false);
};

  return (
    <ShowcaseSectionSkill
      title="Intereses Técnicos"
      className="!p-7 h-[11rem]"
      action={
        isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTriggerSave((prev) => !prev)}
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
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 25)}
              placeholder="Buscar habilidad"
              className="w-full rounded-lg border border-gray-3 bg-white dark:border-dark-3 dark:bg-dark-2 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-primary"
            />

            {(isInputFocused || searchTerm) && (
              <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border dark:border-dark-3 dark:bg-dark-2 border-gray-3 bg-white text-sm shadow-lg">
                {filteredInterests.map((skill) => (
                  <div
                    key={skill}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-2 dark:hover:bg-gray-7"
                    onMouseDown={() => addInterest(skill)}
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
            className={`flex flex-wrap items-start gap-2.5 overflow-y-auto pr-1 pt-1 ${
              isEditing ? "h-[5rem]" : "h-[8rem]"
            }`}
          >
            {selectedTechInterests.length === 0 ? (
        <div className="w-full flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
            Aún no has agregado intereses técnicos.
          </p>
        </div>
      ) : (
        selectedTechInterests.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-[#e8deef] dark:border-[#877691] dark:bg-[#a896b3] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
          >
            {skill}
            {isEditing && (
              <button
                type="button"
                onClick={() => removeInterest(skill)}
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

export default TechInterestsCard;
