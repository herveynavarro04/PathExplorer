"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "components/LoadingPage";
import ProyectoModal from "../../../components/ProyectoModal";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { TbRefreshDot } from "react-icons/tb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import ProjectTableRow from "./_components/ProjectTableRow";

interface ProjectsInfo {
  projectId: string;
  projectName: string;
  managerName: string;
  client: string;
}
interface ProjectRecomendationsResponseDto {
  projectRecs: ProjectsInfo[];
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectsInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [addProjects, setAddProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState("");
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const hasMounted = useRef(false);

  const router = useRouter();
  const url = "http://localhost:8080/api";

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleApplyToProject = (projectId: string) => {
    setAddProjects((prev) => {
      const updatedProjects = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      const count = updatedProjects.length;
      setAppliedMessage(
        `${count} proyecto${count !== 1 ? "s" : ""} aplicado${count !== 1 ? "s" : ""}`
      );
      return updatedProjects;
    });
    setSelectedProject(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadRecommendedProjects = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      setProjectsLoading(true);
      try {
        const response = await authFetch<ProjectRecomendationsResponseDto>(
          `${url}/agent/project/recommendations`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        setProjects(response.projectRecs);
        console.log("✅ Projects fetched");
        console.log(response);
      } catch (error) {
        console.error(`Error fetching recommended projects ${error}`);
      } finally {
        setProjectsLoading(false);
      }
    };

    if (!hasMounted.current) {
      hasMounted.current = true;
      loadRecommendedProjects();
      return;
    }

    if (triggerRefresh) {
      loadRecommendedProjects();
      setTriggerRefresh(false);
    }
  }, [triggerRefresh]);

  // useEffect(() => {
  //   const timer = setTimeout(() => setProjectsLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, [projects]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setProjectsLoading(true);
  //     try {
  //       const res = await fetch("/recommendedProjects.json");
  //       const data = await res.json();
  //       setProjects(data.projectRecs);
  //       setTriggerRefresh(false);
  //     } catch (err) {
  //       console.error("Error loading recommended projects", err);
  //     }
  //   };

  //   fetchProjects();
  // }, [triggerRefresh]);

  const patchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setProjectsLoading(true);
    try {
      const response = await authFetch(`${url}/projects/employee`, {
        method: "PATCH",
        body: JSON.stringify({ addProjects }),
      });
      if (!response) {
        router.push("/login");
        return;
      }

      setAddProjects([]);
      setAppliedMessage("");
      setTriggerRefresh(true);
      setProjectsLoading(false);
    } catch (err) {
      console.error("Unexpected fetch error:", err);
    }
  };

  return (
    <>
      <LoadingPage loading={loading}>
        <OverviewCardsGroup />
      </LoadingPage>
      <LoadingPage loading={projectsLoading} showSpinner spinnerOffsetY={120}>
        <div className="mt-20 w-full">
          <div className="rounded-[10px] bg-[#f8f6fa] px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-[#311a42]">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                Proyectos relacionados a tu perfil
              </h2>
              <TbRefreshDot
                className="relative right-[1rem] w-9 h-6 cursor-pointer"
                onClick={() => setTriggerRefresh(true)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-none uppercase [&>th]:text-center dark:hover:bg-transparent">
                  <TableHead className="min-w-[130px] !text-left">
                    Nombre
                  </TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Administrador</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects.map((project) => (
                  <ProjectTableRow
                    key={project.projectId}
                    projectId={project.projectId}
                    projectName={project.projectName}
                    client={project.client}
                    managerName={project.managerName}
                    handleProjectClick={handleProjectClick}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          {selectedProject && (
            <ProyectoModal
              projectId={selectedProject}
              onClose={() => setSelectedProject(null)}
              onApply={handleApplyToProject}
              addProjects={addProjects}
            />
          )}
          {addProjects.length > 0 && (
            <div className="w-full flex justify-end mt-15">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-[#f3e8ff] text-[#2b2b2b] px-4 py-2 rounded-lg text-center">
                  {appliedMessage}
                </div>
                <button
                  className="bg-[#65417f] hover:bg-[#5a366e] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  onClick={patchProjects}
                >
                  Finalizar aplicación
                </button>
              </div>
            </div>
          )}
        </div>
      </LoadingPage>
    </>
  );
}
