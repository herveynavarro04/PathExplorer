"use client";

import { useEffect, useState } from "react";
import ProjectViewer from "../../../components/Projects/selector";
import DisplayViewer from "../../../components/Projects/display";
import EndProjectModal from "../../../components/Projects/EndProjectModal";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";

interface ProjectInfoPreviewResponseDto {
  projectId: string;
  projectName: string;
  information: string;
  status?: string;
  active?: boolean;
  technologies?: TechDto[];
  client?: string;
  startDate?: Date;
  endDate?: Date;
  progress?: number;
}

interface TechDto {
  technologyId: string;
  technologyName: string;
}

interface GetEmployeeProjectsResponseDto {
  employeeProjects: ProjectInfoPreviewResponseDto[];
}

interface GetProjectsTechResponseDto {
  ProjectsTechs: TechDto[];
}

interface GetEmployeesByProjectResponseDto {
  profilePic: string;
  position: string;
  employeeName: string;
  employeeId: string;
  chargeability: number;
}

export default function Home() {
  const [projects, setProjects] =
    useState<ProjectInfoPreviewResponseDto[]>(null);
  const [techs, setTechs] = useState<TechDto[]>(null);
  const [employees, setEmployees] =
    useState<GetEmployeesByProjectResponseDto[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [loadingProjTech, setLodingProjTech] = useState<boolean>(true);
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInfoPreviewResponseDto | null>(null);
  const [projectProgress, setProjectProgress] = useState<number>(0);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] =
    useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const router = useRouter();
  const url = "http://localhost:8080/api";

  const onProgressChange = (value: number) => setProjectProgress(value);

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    const loadInitialData = async () => {
      try {
        const [projectsRes, techsRes] = await Promise.all([
          authFetch<GetEmployeeProjectsResponseDto>(
            `${url}/projects/employee/manager`
          ),
          authFetch<GetProjectsTechResponseDto>(`${url}/projects/techs`),
        ]);

        if (!projectsRes || !techsRes) {
          router.push("/login");
          return;
        }

        const projects = projectsRes.employeeProjects
          .map((p) => ({
            ...p,
            startDate: new Date(p.startDate),
            endDate: new Date(p.endDate),
          }))
          .filter((project) => project.active);

        setProjects(projects);
        setTechs(techsRes.ProjectsTechs);
        setSelectedProject(projects[0]);

        setLodingProjTech(false);
        setLoadingProjects(false);
      } catch (error) {
        console.error("Error loading initial data", error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const res = validation();
    if (!selectedProject) return;
    if (!res) {
      router.push("/login");
      return;
    }

    const loadEmployees = async () => {
      try {
        const employeesRes = await authFetch<
          GetEmployeesByProjectResponseDto[]
        >(`${url}/projects/${selectedProject.projectId}/employees`);
        if (!employeesRes) {
          router.push("/login");
          return;
        }
        setEmployees(employeesRes);
        setLoadingEmployees(false);
      } catch (error) {
        console.error("Error loading employees for selected project", error);
      }
    };

    loadEmployees();
  }, [selectedProject]);

  useEffect(() => {
    if (!loadingEmployees && !loadingProjTech && !loadingProjects) {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 25);
    }
  }, [loadingEmployees, loadingProjTech, loadingProjects]);

  if (loading || !projects || !techs || !employees) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full  transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-9 px-4">
          <ProjectViewer
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={(project) => {
              setSelectedProject(project);
              setProjectProgress(project?.progress || 0);
            }}
          />

          {projectProgress === 100 && (
            <button
              className="bg-[#65417f] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
              onClick={() => setIsFinalizeModalOpen(true)}
            >
              Marcar como finalizado
            </button>
          )}

          {isFinalizeModalOpen && (
            <EndProjectModal
              projectName={selectedProject?.projectName || "el proyecto"}
              onCancel={() => setIsFinalizeModalOpen(false)}
              onConfirm={() => {
                console.log("Proyecto finalizado");
                setIsFinalizeModalOpen(false);
              }}
            />
          )}
        </div>

        <DisplayViewer
          key={selectedProject?.projectId}
          selectedProject={selectedProject}
          techs={techs}
          employees={employees}
          onProgressChange={onProgressChange}
          editable={false}
        />
      </div>
    </div>
  );
}

//  useEffect(() => {
//     const res = validation();
//     if (!res) {
//       router.push("/login");
//       return;
//     }
//     const loadProjects = async () => {
//       try {
//         const response = await authFetch<GetEmployeeProjectsResponseDto>(
//           ${url}/projects/employee/manager
//         );
//         if (!response) {
//           router.push("/login");
//           return;
//         }
//         console.log(response);
//         setProjects(response.employeeProjects);
//         setSelectedProject(response.employeeProjects[0].projectId);
//         setLoadingProjects(false);
//       } catch (error) {
//         console.error("Error while fetching", error);
//       }
//     };
//     loadProjects();
//   }, []);

//   useEffect(() => {
//     const res = validation();
//     if (!res) {
//       router.push("/login");
//       return;
//     }
//     const loadTech = async () => {
//       try {
//         const response = await authFetch<GetProjectsTechResponseDto>(
//           ${url}/projects/techs
//         );
//         if (!response) {
//           router.push("/login");
//           return;
//         }
//         console.log(response);
//         setTechs(response.ProjectsTechs);
//         setLoadingTechs(false);
//       } catch (error) {
//         console.error("Error while fetching", error);
//       }
//     };
//     loadTech();
//   }, []);

//   useEffect(() => {
//     if (!selectedProject) return;
//     const res = validation();
//     if (!res) {
//       router.push("/login");
//       return;
//     }
//     const loadEmployees = async () => {
//       try {
//         const response = await authFetch<GetEmployeesByProjectResponseDto[]>(
//           ${url}/projects/${selectedProject}/employees
//         );
//         if (!response) {
//           router.push("/login");
//           return;
//         }
//         console.log(response);
//         setEmployees(response);
//         setLoadingTechs(false);
//       } catch (error) {
//         console.error("Error while fetching", error);
//       }
//     };
//     loadEmployees();
//   }, [selectedProject]);
