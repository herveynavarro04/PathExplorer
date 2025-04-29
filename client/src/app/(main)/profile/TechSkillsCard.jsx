"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@utils/authFetch";

const TechSkillsCard = ({ techSkillMap, url }) => {
  const [selectedTechSkills, setSelectedTechSkills] = useState([]);
  const [allTechSkills, setAllTechSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [skillsToDelete, setSkillsToDelete] = useState([]);
  const [triggerSave, setTriggerSave] = useState(false);

  const MAX_SKILLS = 20;

  useEffect(() => {
    const selected = [];
    const all = [];

    techSkillMap.forEach(([id, isSelected], skillName) => {
      all.push(skillName);
      if (isSelected) {
        selected.push(skillName);
      }
    });

    console.log("Selected skills:", selected);
    console.log("All skills:", all);

    setSelectedTechSkills(selected);
    setAllTechSkills(all);
  }, [techSkillMap]);

  useEffect(() => {
    const loadData = async () => {
      if (!triggerSave) return;

      if (skillsToDelete.length > 0) {
        const deleteSkill = await authFetch(`${url}/user/skills/delete`, {
          method: "POST",
          body: JSON.stringify({ skills: skillsToDelete }),
        });
        console.log("Deleted:", deleteSkill);
      }

      if (skillsToAdd.length > 0) {
        const postSkill = await authFetch(`${url}/user/skills/add`, {
          method: "POST",
          body: JSON.stringify({ skills: skillsToAdd }),
        });
        console.log("Added:", postSkill);
      }
    };

    loadData();
    setTriggerSave(false);
  }, [triggerSave]);

  useEffect(() => {
    console.log(skillsToAdd);
  }, [skillsToAdd]);

  useEffect(() => {
    console.log(skillsToDelete);
  }, [skillsToDelete]);

  const filteredSkills = allTechSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTechSkills.includes(skill)
  );

  const addSkill = (skill) => {
    if (selectedTechSkills.length >= MAX_SKILLS) return;
    setSelectedTechSkills([...selectedTechSkills, skill]);
    setSkillsToAdd([...skillsToAdd, techSkillMap.get(skill).at(0)]);
    setSearchTerm("");
  };

  const removeSkill = (skill) => {
    setSelectedTechSkills(selectedTechSkills.filter((s) => s !== skill));
    setSkillsToDelete([...skillsToDelete, techSkillMap.get(skill).at(0)]);
  };

  const handleSave = () => {
    setTriggerSave(true);
    console.log("Saved technical skills:", selectedTechSkills);
    setIsEditing(false);
  };

  return (
    <div className="group relative w-full max-w-4xl h-auto rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 overflow-hidden shadow-xl bg-gradient-to-r from-[#006b75] via-[#7B2FE0] to-[#3A005F]">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-20 flex items-center px-6 relative">
        <h2 className="text-[#c0bdc2] text-md md:text-xl font-medium">
          Habilidades técnicas
        </h2>
      </div>

      <div className="relative z-20 px-6 pt-4 pb-6 flex flex-col gap-4">
        {isEditing && (
          <div className="relative">
            <div className="flex items-center bg-white/20 rounded-lg overflow-hidden backdrop-blur-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar habilidad"
                className="w-full p-2 bg-transparent placeholder-white text-white focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-3 text-white"
                >
                  ✖
                </button>
              )}
            </div>

            {searchTerm && (
              <div className="absolute bg-white/20 backdrop-blur-md mt-2 rounded-md shadow-lg z-30 w-full max-h-40 overflow-y-auto text-white">
                {filteredSkills.slice(0, 10).map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 hover:bg-white/30 cursor-pointer"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="flex flex-wrap gap-3 mt-2 overflow-auto transition-all duration-300"
          style={{
            maxHeight: isEditing ? "8.1rem" : "11rem",
          }}
        >
          {selectedTechSkills.map((skill) => (
            <div
              key={skill}
              className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm text-white flex items-center"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-white hover:text-red-400"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium text-white backdrop-blur-md"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md font-medium text-white backdrop-blur-md"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechSkillsCard;
