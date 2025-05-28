"use client";

import { ShowcaseSectionSkill } from "components/Layouts/showcase-skill";

type Skill = {
  skillName: string;
  skillId: string;
};

type SoftSkillsProps = {
  softSkills?: Skill[] | null;
};

const SoftSkillsUser = ({ softSkills }: SoftSkillsProps) => {
  const userSoftSkillsNames = softSkills?.map((s) => s.skillName) || [];

  return (
    <ShowcaseSectionSkill title="Habilidades Blandas" className="!p-7 h-[9rem]">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col flex-grow min-h-0">
          <div className="flex flex-wrap items-start gap-2.5 overflow-y-auto pr-1 pt-1 max-h-[6rem]">
            {userSoftSkillsNames.length === 0 ? (
              <div className="w-full flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-300 text-sm text-center">
                  No hay habilidades blandas registradas.
                </p>
              </div>
            ) : (
              userSoftSkillsNames.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-[#e8deef] dark:border-[#877691] dark:bg-[#a896b3] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-800"
                >
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </ShowcaseSectionSkill>
  );
};

export default SoftSkillsUser;
