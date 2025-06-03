// page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import TopAnalysis from "./components/TableApplicants";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import ProjectViewer from "./components/ProjectViewer";

interface GetManagerNotFullProjectsResponseDto {
  projectId: string;
  projectName: string;
}

interface GetProjectApplicantsDto {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  appliedAt: Date;
  skillCount: number;
  interestCount: number;
}

export default function Applicants() {
  const [projects, setProjects] =
    useState<GetManagerNotFullProjectsResponseDto[]>(null);
  const [selectedProject, setSelectedProject] =
    useState<GetManagerNotFullProjectsResponseDto>(null);
  const [employees, setEmployees] = useState<GetProjectApplicantsDto[]>([]);
  const [selectEmployeeId, setSelectEmployeeId] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const [changeRefresh, setChangeRefresh] = useState<boolean>(false);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showNotProjects, setShowNotProjects] = useState<boolean>(false);

  const router = useRouter();
  const url = "http://localhost:8080/api";
  const isFirstProjectRefresh = useRef(true);

  const onClose = () => {
    setSelectEmployeeId(null);
  };

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    const loadProjects = async () => {
      try {
        const response = await authFetch<
          GetManagerNotFullProjectsResponseDto[]
        >(`${url}/projects/manager/notFull`);
        if (!response) {
          router.push("/login");
          return;
        }
        if (response.length === 0) {
          setShowNotProjects(true);
          setLoadingProjects(false);
        } else {
          setSelectedProject(response[0]);
          setProjects(response);
          setLoadingProjects(false);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    loadProjects();
  }, [triggerRefresh]);

  useEffect(() => {
    if (!selectedProject) return;
    const res = validation();
    if (!res) return router.push("/login");
    setLoadingEmployees(true);
    const loadEmployees = async () => {
      try {
        const employeesRes = await authFetch<GetProjectApplicantsDto[]>(
          `${url}/projects/${selectedProject.projectId}/applicants`
        );
        if (!employeesRes) return router.push("/login");
        setEmployees(employeesRes);
        setLoadingEmployees(false);
      } catch (error) {
        console.error("Error loading employees", error);
      }
    };
    loadEmployees();
  }, [selectedProject]);

  useEffect(() => {
    if (!loadingProjects && !loadingEmployees) {
      setLoading(false);
      setTimeout(() => {
        setFadeIn(true);
      }, 25);
    }
  }, [loadingProjects, loadingEmployees]);

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

  if (showNotProjects) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-[#d0bfdb]">
        <div className="mb-[7rem]">No tienes proyectos activos</div>
      </div>
    );
  }

  if (loading || !projects || !employees) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  const handleSubmitApplication = async (
    updatedFields: Record<string, any>
  ) => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    try {
      const response = await authFetch(
        `${url}/projects/${selectedProject.projectId}/applicant/${selectEmployeeId}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedFields),
        }
      );
      if (!response) {
        router.push("/login");
        return;
      }
      setTriggerRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error patching", error);
    }
  };

  return (
    <div
      key={selectedProject?.projectId}
      className={`mx-auto w-full transition-opacity duration-300 ${!fadeIn ? "opacity-0" : "opacity-100"}`}
    >
      <ProjectViewer
        projects={projects}
        selectedProject={selectedProject}
        setChangeRefresh={setChangeRefresh}
        setPendingProjectId={setPendingProjectId}
      />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-20 2xl:gap-7.5">
        <div className="col-span-12 grid">
          <TopAnalysis
            employees={employees}
            selectEmployeeId={selectEmployeeId}
            setSelectEmployeeId={setSelectEmployeeId}
            handleSubmitApplication={handleSubmitApplication}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
