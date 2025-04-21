'use client';
import { useState } from 'react';

export default function SoftSkillsCardClient({ allSkills, initialSelected }) {
  const [selectedSoftSkills, setSelectedSoftSkills] = useState(initialSelected || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSoftSkills.includes(skill)
  );

  const addSkill = (skill) => {
    setSelectedSoftSkills([...selectedSoftSkills, skill]);
    setSearchTerm('');
  };

  const removeSkill = (skill) => {
    setSelectedSoftSkills(selectedSoftSkills.filter(s => s !== skill));
  };

  const handleSave = () => {
    console.log('Soft skills guardadas:', selectedSoftSkills);
    setIsEditing(false);
  };

  return (
    <div className="group relative w-full max-w-4xl h-[22rem] rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 overflow-hidden shadow-xl bg-gradient-to-l from-[#006b75] via-[#7B2FE0] to-[#3A005F]">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-20 flex items-center justify-end px-6 relative">
        <h2 className="text-[#c0bdc2] text-md md:text-xl font-medium">
          Habilidades blandas
        </h2>
      </div>

      <div className="relative z-20 px-6 pt-4 pb-2 flex flex-col gap-2">
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
                <button onClick={() => setSearchTerm('')} className="px-3 text-white">✖</button>
              )}
            </div>

            {searchTerm && (
              <div className="absolute z-30 bg-white/20 backdrop-blur-md mt-1 rounded-md shadow-lg w-full max-h-40 overflow-y-auto text-white">
                {filteredSkills.slice(0, 10).map(skill => (
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
            maxHeight: isEditing ? '8.1rem' : '11rem'
          }}
        >
          {selectedSoftSkills.map(skill => (
            <div
              key={skill}
              className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm text-white flex items-center whitespace-nowrap"
              style={{ maxWidth: '100%' }}
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

        <div className="mt-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md font-sm text-white backdrop-blur-md"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md font-sm text-white backdrop-blur-md"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
