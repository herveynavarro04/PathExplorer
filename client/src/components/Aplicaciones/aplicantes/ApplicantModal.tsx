"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import ProjectUserCard from "components/AnalisisEmpleados/analisis-empleados/ProjectUserCard";
import TechSkillsUser from "components/AnalisisEmpleados/analisis-empleados/TechSkillsUser";
import SoftSkillsUser from "components/AnalisisEmpleados/analisis-empleados/SoftSkillsUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchFeedback } from "../fetchApplicants";

interface ApplicantModalProps {
  onClose: () => void;
  employee: any;
}

export default function ApplicantModal({
  onClose,
  employee,
}: ApplicantModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

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
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const loadFeedback = async () => {
      const all = await fetchFeedback();
      const feedbackForEmployee = all.filter(
        (f: any) => f.employeeId === employee.employeeId
      );
      setFeedbackList(feedbackForEmployee);
    };
    loadFeedback();
  }, [employee]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
      <div
        ref={modalRef}
        className="w-full max-w-5xl bg-[#d0bfdb] dark:bg-[#311a42] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl text-gray-800 dark:text-white"
      >
        <div className="rounded-xl bg-white dark:bg-[#412859] p-6">
          {!showFeedback ? (
            <>
              <h2 className="font-semibold text-lg mb-4">
                Información Personal
              </h2>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={employee?.photoUrl || "/profile.png"}
                  alt="Foto de perfil"
                  width={180}
                  height={180}
                  className="rounded-full object-cover"
                />
                <div className="w-full">
                  <label className="text-sm font-medium block mb-1">
                    Nombre
                  </label>
                  <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                    {employee.name}
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium block mb-1">
                    Correo electrónico
                  </label>
                  <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                    {employee.email || "-"}
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium block mb-1">Rol</label>
                  <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                    {employee.role || "-"}
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium block mb-1">
                    Nivel
                  </label>
                  <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                    {employee.level || "-"}
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm font-medium block mb-1">
                    Cargabilidad
                  </label>
                  <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                    {employee.cargability || "-"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowFeedback(true)}
                className="mt-4 w-full px-4 py-2 text-sm font-semibold bg-[#65417f] text-white rounded-lg hover:bg-opacity-90"
              >
                Ver opiniones pasadas
              </button>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg mb-4">Opiniones Pasadas</h2>
              <div className="flex flex-col gap-4 h-[36rem] overflow-y-auto">
                {feedbackList.length === 0 ? (
                  <p className="text-sm">
                    Este empleado no tiene retroalimentaciones registradas.
                  </p>
                ) : (
                  feedbackList.map((f, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-[#503866] rounded-md p-3"
                    >
                      <p className="text-sm font-medium mb-1">
                        {f.projectManager}
                      </p>
                      <span className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {f.date}
                      </span>
                      <p className="text-sm">{f.comment}</p>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setShowFeedback(false)}
                className="mt-4 w-full px-4 py-2 text-sm font-semibold bg-[#65417f] text-white rounded-lg hover:bg-opacity-90"
              >
                Volver a Información Personal
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <TechSkillsUser userSkills={userSkills} />
          <SoftSkillsUser userSkills={userSkills} />

          <div className="flex items-center justify-between">
            <h3 className="font-bold">Proyectos Pasados</h3>
            <div className="flex gap-2">
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
          <button
            onClick={() => {
              console.log("Aplicante aceptado:", employee.name);
              onClose();
            }}
            className="self-end mt-4 w-full px-5 py-2 bg-[#65417f] hover:bg-opacity-90 text-white rounded-lg shadow-md text-sm font-semibold"
          >
            Aceptar Aplicante
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
