"use client";

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import ProjectUserCard from "./ProjectUserCard";
import TechSkillsUser from "./TechSkillsUser";
import SoftSkillsUser from "./SoftSkillsUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";

interface DetailsModalProps {
  onClose: () => void;
  employeeId: string;
  onLoadComplete?: () => void;
}

interface GetEmployeeInfoResponseDto {
  email: string;
  level: number;
  firstName: string;
  lastName: string;
  profilePicture: Buffer | string;
  mimeType?: string;
  position?: string;
  chargeability: number;
}

interface skill {
  skillName: string;
  skillId: string;
}

interface SkillsResponseDto {
  technicalSkills?: skill[];
  softSkills?: skill[];
}

interface TechDto {
  technologyId: string;
  technologyName: string;
}
interface GetPastProjectsResponseDto {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  client: string;
  active: boolean;
  manager: string;
  technologies: TechDto[];
  position: string;
}

export default function UserDetailsModal({
  onClose,
  employeeId,
  onLoadComplete,
}: DetailsModalProps) {
  const [userData, setUserData] = useState<GetEmployeeInfoResponseDto | null>(
    null
  );
  const [techSkills, setTechSkills] = useState<skill[] | null>(null);
  const [softSkills, setSoftSkills] = useState<skill[] | null>(null);
  const [projects, setProjects] = useState<GetPastProjectsResponseDto[] | null>(
    null
  );

  const modalRef = useRef<HTMLDivElement | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const [loadingSkills, setLoadingSkills] = useState<boolean>(true);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();
  const url = "http://localhost:8080/api";

  console.log(employeeId);

  if (typeof window === "undefined") return null;

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
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
    const loadProfile = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }
      try {
        const response = await authFetch<GetEmployeeInfoResponseDto>(
          `${url}/employee/${employeeId}`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        setUserData(response);
        setLoadingUserData(false);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    const loadSkills = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }
      try {
        const response = await authFetch<SkillsResponseDto>(
          `${url}/skills/${employeeId}`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        setTechSkills(response.technicalSkills);
        setSoftSkills(response.softSkills);
        setLoadingSkills(false);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    loadSkills();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }
      try {
        const response = await authFetch<GetPastProjectsResponseDto[]>(
          `${url}/projects/past/${employeeId}`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        console.log(response);
        setProjects(response);
        setLoadingProjects(false);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (!loadingUserData && !loadingSkills && !loadingProjects) {
      setLoading(false);
      if (onLoadComplete) onLoadComplete();

      setTimeout(() => setFadeIn(true), 25);
    }
  }, [loadingUserData, loadingSkills, loadingProjects]);

  if (loading || !userData || !techSkills || !softSkills || !projects) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`mx-auto w-full max-w-[75rem] h-full transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
        <div
          ref={modalRef}
          className="w-full max-w-5xl bg-[#d0bfdb] dark:bg-[#311a42] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl text-gray-800 dark:text-white"
        >
          <div className="rounded-xl bg-white dark:bg-[#412859] p-6">
            <h2 className="font-semibold text-lg mb-4">Información Personal</h2>
            <div className="flex flex-col items-center gap-4">
              <Image
                src={
                  userData.profilePicture && userData.mimeType
                    ? `data:${userData.mimeType};base64,${userData.profilePicture}`
                    : "/profile.png"
                }
                alt="Foto de perfil"
                width={180}
                height={180}
                className="rounded-full object-cover"
              />

              <div className="w-full">
                <label className="text-sm font-medium block mb-1">Nombre</label>
                <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                  {userData.firstName + " " + userData.lastName}
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium block mb-1">
                  Correo electrónico
                </label>
                <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                  {userData.email}
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium block mb-1">Puesto</label>
                <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                  {userData.position}
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium block mb-1">Nivel</label>
                <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                  {userData.level}
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm font-medium block mb-1">
                  Cargabilidad
                </label>
                <div className="bg-gray-100 dark:bg-[#503866] px-3 py-2 rounded-md">
                  {userData.chargeability}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TechSkillsUser techSkills={techSkills} />
            <SoftSkillsUser softSkills={softSkills} />

            <div className="flex items-center justify-between">
              <h3 className="font-bold">Proyectos Pasados</h3>
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

            {projects.length > 0 ? (
              <ProjectUserCard
                key={projects[currentProjectIndex].projectId}
                projectId={projects[currentProjectIndex].projectId}
                projectName={projects[currentProjectIndex].projectName}
                startDate={projects[currentProjectIndex].startDate}
                endDate={projects[currentProjectIndex].endDate}
                client={projects[currentProjectIndex].client}
                position={projects[currentProjectIndex].position}
                manager={projects[currentProjectIndex].manager}
                technologies={projects[currentProjectIndex].technologies.map(
                  (t) => t.technologyName
                )}
                active={projects[currentProjectIndex].active}
              />
            ) : (
              <div className="bg-white p-5 rounded-2xl min-h-[5rem]shadow-md border border-[#e5d6f1]">
                <p className="text-center text-[#4b3b61] font-medium">
                  No hay proyectos pasados disponibles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

//   useEffect(() => {
//   const loadAllData = async () => {
//     const res = validation();
//     if (!res) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const [
//         userResponse,
//         skillsResponse,
//         projectsResponse,
//       ] = await Promise.all([
//         authFetch<GetEmployeeInfoResponseDto>(`${url}/employee/${employeeId}`),
//         authFetch<SkillsResponseDto>(`${url}/skills/${employeeId}`),
//         authFetch<GetPastProjectsResponseDto[]>(`${url}/projects/past/${employeeId}`),
//       ]);

//       if (!userResponse || !skillsResponse || !projectsResponse) {
//         router.push("/login");
//         return;
//       }

//       setUserData(userResponse);
//       setTechSkills(skillsResponse.technicalSkills);
//       setSoftSkills(skillsResponse.softSkills);
//       setProjects(projectsResponse);

//       setLoadingUserData(false);
//       setLoadingSkills(false);
//       setLoadingProjects(false);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   loadAllData();
// }, []);
