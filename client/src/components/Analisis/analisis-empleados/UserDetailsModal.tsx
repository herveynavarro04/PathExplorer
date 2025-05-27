"use client";

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import ProjectUserCard from "./ProjectUserCard";
import TechSkillsUser from "./TechSkillsUser";
import SoftSkillsUser from "./SoftSkillsUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  onClose: () => void;
}

export default function UserDetailsModal({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handlePrevProject = () => {
  setCurrentProjectIndex((prev) =>
    prev === 0 ? mockProjectUser.length - 1 : prev - 1
  );
};

const handleNextProject = () => {
  setCurrentProjectIndex((prev) =>
    prev === mockProjectUser.length - 1 ? 0 : prev + 1
  );
};

   const mockProjectUser = [
  {
    projectName: "Landing Page Rediseño",
    startDate: "10 de enero de 2024",
    endDate: "10 de abril de 2024",
    client: "Banco del Norte",
    position: "React Developer",
    manager: "Luis Martínez",
    technologies: ["React", "Tailwind", "TypeScript"],
    active: false,
  },
  {
    projectName: "Sistema Interno de Reportes",
    startDate: "1 de mayo de 2023",
    endDate: "30 de agosto de 2023",
    client: "Grupo Empresarial MX",
    position: "Full-stack Developer",
    manager: "Ana Gómez",
    technologies: ["Node.js", "Express", "MongoDB", "React"],
    active: false,
  },
];


const userSkills = {
  technicalSkills: [
    { skillId: "1", skillName: "JavaScript" },
    { skillId: "2", skillName: "TypeScript" },
    { skillId: "3", skillName: "React" },
    { skillId: "4", skillName: "Node.js" },
    { skillId: "5", skillName: "HTML" },
    { skillId: "6", skillName: "CSS" },
    { skillId: "7", skillName: "Tailwind CSS" },
    { skillId: "8", skillName: "Next.js" },
  ],
  softSkills: [
    { skillId: "1", skillName: "Comunicación" },
    { skillId: "2", skillName: "Trabajo en equipo" },
    { skillId: "3", skillName: "Resolución de problemas" },
    { skillId: "4", skillName: "Pensamiento crítico" },
    { skillId: "5", skillName: "Gestión del tiempo" },
    { skillId: "6", skillName: "Empatía" },
    { skillId: "7", skillName: "Creatividad" },
    { skillId: "8", skillName: "Adaptabilidad" },
  ],
};



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (typeof window === "undefined") return null;

  const user = {
    employee_name: "Sofía Schneider",
    email: "sofia@accenture.com",
    role: "Front-end Developer",
    level: "10",
    photoUrl: "/profile.png",
    cargability: 30,
    technicalSkills: ["JavaScript", "TypeScript", "React","JavaScript", "TypeScript", "React"],
    softSkills: ["Teamwork", "Communication"],
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
      <div
        ref={modalRef}
        className="w-full max-w-5xl bg-[#d0bfdb] dark:bg-[#311a42] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl text-gray-800 dark:text-white"
      >
        <div className="rounded-xl bg-white dark:bg-[#412859] p-6">
          <h2 className="font-semibold text-lg mb-4">Información Personal</h2>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={user.photoUrl}
              alt="Foto de perfil"
              width={180}
              height={180}
              className="rounded-full object-cover"
            />
            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Nombre</label>
              <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">{user.employee_name}</div>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Correo electrónico</label>
              <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">{user.email}</div>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Puesto</label>
              <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">{user.role}</div>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Nivel</label>
              <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">{user.level}</div>
            </div>
            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Cargabilidad</label>
              <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">{user.cargability}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">


        <TechSkillsUser userSkills={userSkills} />
        <SoftSkillsUser userSkills={userSkills} />

          <div className="flex items-center justify-between">
  <h3 className="font-bold">Proyectos Pasados</h3>
  <div className="flex items-center gap-2">
<div className="flex items-center gap-2">
  <button
    onClick={handlePrevProject}
    className="p-2 rounded-full bg-[#b89fc9] hover:bg-[#a98ebd] text-white shadow-md"
  >
    <FaChevronLeft />
  </button>
  <button
    onClick={handleNextProject}
    className="p-2 rounded-full bg-[#b89fc9] hover:bg-[#a98ebd] text-white shadow-md"
  >
    <FaChevronRight />
  </button>
</div>
  </div>
</div>

<ProjectUserCard
  key={currentProjectIndex}
  projectName={mockProjectUser[currentProjectIndex].projectName}
  startDate={mockProjectUser[currentProjectIndex].startDate}
  endDate={mockProjectUser[currentProjectIndex].endDate}
  client={mockProjectUser[currentProjectIndex].client}
  position={mockProjectUser[currentProjectIndex].position}
  manager={mockProjectUser[currentProjectIndex].manager}
  technologies={mockProjectUser[currentProjectIndex].technologies}
  active={mockProjectUser[currentProjectIndex].active}
/>

        </div>
      </div>
    </div>,
    document.body
  );
}
