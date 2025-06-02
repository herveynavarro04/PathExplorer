"use client";

import { useEffect, useState, useRef } from "react";
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
  const [projectId, setProjectId] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(null);
  const [endDate, setEndDate] = useState<Date>(null);
  const [active, setActive] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInfoPreviewResponseDto | null>(null);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] =
    useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [changeRefresh, setChangeRefresh] = useState<boolean>(false);
  const isFirstProjectRefresh = useRef(true);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const url = "http://localhost:8080/api";

  const patchDeleteProject = async () => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    try {
      const response = await authFetch(`${url}/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
          active: false,
        }),
      });
      if (!response) {
        router.push("/login");
        return;
      }
      setTriggerRefresh((prev) => !prev);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error patching the progress", error);
    }
  };

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    const currentProjectId = selectedProject?.projectId;

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
          .filter((project) => !project.active);

        const updatedProject =
          projects.find((p) => p.projectId === currentProjectId) || projects[0];

        setProjects(projects);
        setTechs(techsRes.ProjectsTechs);
        setSelectedProject(updatedProject);
        setLodingProjTech(false);
        setLoadingProjects(false);
      } catch (error) {
        console.error("Error loading initial data", error);
      }
    };

    loadInitialData();
  }, [triggerRefresh]);

  useEffect(() => {
    if (!selectedProject) return;
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    setLoadingEmployees(true);

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
    if (!employees) return;
    setProjectId(selectedProject.projectId);
    setClient(selectedProject.client);
    setInformation(selectedProject.information);
    setStartDate(selectedProject.startDate);
    setEndDate(selectedProject.endDate);
    setProgress(selectedProject.progress);
  }, [employees]);

  useEffect(() => {
    if (!loadingEmployees && !loadingProjTech && !loadingProjects) {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 25);
    }
  }, [loadingEmployees, loadingProjTech, loadingProjects]);
  useEffect(() => {
    if (isFirstProjectRefresh.current) {
      isFirstProjectRefresh.current = false;
      return;
    }

    setIsTransitioning(true);
    setFadeIn(false);

    const timeout = setTimeout(() => {
      if (pendingProjectId) {
        const newProject = projects.find(
          (p) => p.projectId === pendingProjectId
        );
        setSelectedProject(newProject);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [changeRefresh]);

  useEffect(() => {
    if (!isTransitioning) return;
    if (!selectedProject || loadingEmployees) return;

    const timeout = setTimeout(() => {
      setFadeIn(true);
      setIsTransitioning(false);
    }, 50);

    return () => clearTimeout(timeout);
  }, [selectedProject, loadingEmployees]);

  if (loading || !projects || !techs || !employees) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <>
      <div>
              <div>
      <button
        onClick={() => router.back()}
        className="text-lg text-[#65417f] hover:font-semibold mb-1"
      >
        ← Regresar
      </button>
    </div>
        <div
          key={selectedProject?.projectId}
          className={`mx-auto w-full transition-opacity duration-300 ${
            !fadeIn ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-center mb-9 px-4">
            <ProjectViewer
              projects={projects}
              selectedProject={selectedProject}
              setEmployees={setEmployees}
              setChangeRefresh={setChangeRefresh}
              setPendingProjectId={setPendingProjectId}
              active={active}
            />
          </div>

          <DisplayViewer
            key={projectId}
            projectId={projectId}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            client={client}
            setClient={setClient}
            information={information}
            setInformation={setInformation}
            progress={progress}
            setProgress={setProgress}
            technologies={selectedProject.technologies}
            techs={techs}
            employees={employees}
            setTriggerRefresh={setTriggerRefresh}
            editable={false}
          />
        </div>
      </div>
    </>
  );
}
