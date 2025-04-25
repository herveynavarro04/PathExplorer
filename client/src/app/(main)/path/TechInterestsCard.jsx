'use client';
import { useState, useEffect } from 'react';

export default function TechInterestsCard() {
  const [allTechSkills, setAllTechSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const MAX_INTERESTS = 20;

  useEffect(() => {
    fetch("http://localhost:3000/empleado.json")
      .then(res => res.json())
      .then(data => {
        const techSkills = data.habilidades
          .filter(h => h.tipo === "Técnica")
          .map(h => ({ id: h.id_habilidad, nombre: h.nombre }));

        const userTechInterests = data.user_interests
          .map(ui => ui.id_skill);

        const selected = techSkills
          .filter(skill => userTechInterests.includes(String(skill.id)))
          .map(skill => skill.nombre);

        setAllTechSkills(techSkills.map(skill => skill.nombre));
        setSelectedInterests(selected);
      });
  }, []);

  const filteredSkills = allTechSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedInterests.includes(skill)
  );

  const addInterest = (skill) => {
    if (selectedInterests.length >= MAX_INTERESTS) return;
    setSelectedInterests([...selectedInterests, skill]);
    setSearchTerm('');
  };

  const removeInterest = (skill) => {
    setSelectedInterests(selectedInterests.filter(s => s !== skill));
  };

  const handleSave = () => {
    console.log("Saved technical interests:", selectedInterests);
    setIsEditing(false);
  };

  return (
    <div className="group relative w-full max-w-4xl mx-auto h-auto rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 overflow-hidden shadow-xl bg-gradient-to-r from-[#3A005F] via-[#7B2FE0] to-[#00535b]">
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-20 flex items-center px-6 relative">
        <h2 className="text-[#c0bdc2] text-md md:text-xl font-medium">
          Intereses técnicos
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
                <button onClick={() => setSearchTerm('')} className="px-3 text-white">✖</button>
              )}
            </div>

            {searchTerm && (
              <div className="absolute bg-white/20 backdrop-blur-md mt-2 rounded-md shadow-lg z-30 w-full max-h-40 overflow-y-auto text-white">
                {filteredSkills.slice(0, 10).map(skill => (
                  <div
                    key={skill}
                    className="px-4 py-2 hover:bg-white/30 cursor-pointer"
                    onClick={() => addInterest(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-2 overflow-auto transition-all duration-300"
             style={{ maxHeight: isEditing ? '8.1rem' : '11rem' }}>
          {selectedInterests.map(skill => (
            <div
              key={skill}
              className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm text-white flex items-center"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeInterest(skill)}
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
}
