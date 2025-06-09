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
  mimeType?: string;
}

export default function Home() {
  const [projects, setProjects] = useState<
    ProjectInfoPreviewResponseDto[] | null
  >(null);
  const [techs, setTechs] = useState<TechDto[] | null>(null);
  const [employees, setEmployees] = useState<
    GetEmployeesByProjectResponseDto[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingProjTech, setLodingProjTech] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [information, setInformation] = useState("");
  const [client, setClient] = useState("");
  const [progress, setProgress] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [active, setActive] = useState(true);
  const [triggerProjectsRefresh, setTriggerProjectsRefresh] = useState(false);
  const [triggerEmployeesRefresh, setTriggerEmployeesRefresh] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectInfoPreviewResponseDto | null>(null);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [changeRefresh, setChangeRefresh] = useState(false);
  const isFirstProjectRefresh = useRef(true);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const originalEmployeeOrder = useRef<string[]>([]);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;

  const patchDeleteProject = async () => {
    const res = validation();
    if (!res) return router.push("/login");

    try {
      const response = await authFetch(`${url}/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({ active: false }),
      });
      if (!response) return router.push("/login");

      setDeleteConfirmation(true);
      setIsTransitioning(true);
      setFadeIn(false);

      setTimeout(() => {
        setTriggerProjectsRefresh((prev) => !prev);
      }, 300);
    } catch (error) {
      console.error("Error patching the project", error);
    }
  };

  useEffect(() => {
    const res = validation();
    if (!res) return router.push("/login");

    const currentProjectId = selectedProject?.projectId;

    const loadInitialData = async () => {
      try {
        const [projectsRes, techsRes] = await Promise.all([
          authFetch<GetEmployeeProjectsResponseDto>(
            `${url}/projects/employee/manager`
          ),
          authFetch<GetProjectsTechResponseDto>(`${url}/projects/techs`),
        ]);

        if (!projectsRes || !techsRes) return router.push("/login");

        const projects = projectsRes.employeeProjects
          .map((p) => ({
            ...p,
            startDate: new Date(p.startDate),
            endDate: new Date(p.endDate),
          }))
          .filter((p) => p.active);

        let updatedProject;
        if (deleteConfirmation) {
          updatedProject = projects[0];
          setDeleteConfirmation(false);
        } else {
          updatedProject =
            projects.find((p) => p.projectId === currentProjectId) ||
            projects[0];
        }

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
  }, [triggerProjectsRefresh]);

  useEffect(() => {
    if (!selectedProject) return;
    const res = validation();
    if (!res) return router.push("/login");

    setLoadingEmployees(true);

    const loadEmployees = async () => {
      try {
        const employeesRes = await authFetch<
          GetEmployeesByProjectResponseDto[]
        >(`${url}/projects/${selectedProject.projectId}/employees`);
        if (!employeesRes) return router.push("/login");

        // Asigna orden original por proyecto
        originalEmployeeOrder.current = employeesRes.map((e) => e.employeeId);

        setEmployees(employeesRes);
        setLoadingEmployees(false);
      } catch (error) {
        console.error("Error loading employees", error);
      }
    };

    loadEmployees();
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const res = validation();
    if (!res) return router.push("/login");

    setLoadingEmployees(true);

    const refreshEmployees = async () => {
      try {
        const employeesRes = await authFetch<
          GetEmployeesByProjectResponseDto[]
        >(`${url}/projects/${selectedProject.projectId}/employees`);
        if (!employeesRes) return router.push("/login");

        // Reordenar usando el orden original guardado
        const orderedEmployees = originalEmployeeOrder.current
          .map((id) => employeesRes.find((e) => e.employeeId === id))
          .filter(Boolean) as GetEmployeesByProjectResponseDto[];

        setEmployees(orderedEmployees);
        setLoadingEmployees(false);
      } catch (error) {
        console.error("Error refreshing employees", error);
      }
    };

    refreshEmployees();
  }, [triggerEmployeesRefresh]);

  useEffect(() => {
    if (!employees || !selectedProject) return;
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
        const newProject = projects?.find(
          (p) => p.projectId === pendingProjectId
        );
        setSelectedProject(newProject || null);
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
    <div>
      <div>
        <button
          onClick={() => router.back()}
          className="text-md text-[#65417f] hover:font-semibold mb-1"
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
        <div className="flex justify-between items-center mb-2 px-4">
          <ProjectViewer
            projects={projects}
            selectedProject={selectedProject}
            setChangeRefresh={setChangeRefresh}
            setPendingProjectId={setPendingProjectId}
            active={active}
          />

          {progress === 100 && (
            <button
              className="bg-[#65417f] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition whitespace-nowrap"
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
                patchDeleteProject();
                setIsFinalizeModalOpen(false);
                console.log("Proyecto finalizado");
              }}
            />
          )}
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
          setTriggerProjectsRefresh={setTriggerProjectsRefresh}
          setTriggerEmployeesRefresh={setTriggerEmployeesRefresh}
          editable={true}
        />
      </div>
    </div>
  );
}
