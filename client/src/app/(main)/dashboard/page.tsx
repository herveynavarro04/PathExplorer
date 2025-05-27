"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProyectoModal from "../../../components/ProyectoModal";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { TbRefreshDot } from "react-icons/tb";
import SpinnerLoading from "components/SpinnerLoading";

import {
  Table,
  TableBody,
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
  const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [addProjects, setAddProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState("");
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const hasMounted = useRef(false);
  const [fadeInProjects, setFadeInProjects] = useState<boolean>(false);
  const [fadeInCards, setFadeInCards] = useState<boolean>(false);
  const [forbidden, setForbidden] = useState<boolean>(false);

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
        `${count} proyecto${count !== 1 ? "s" : ""} aplicado${
          count !== 1 ? "s" : ""
        }`
      );
      return updatedProjects;
    });
    setSelectedProject(null);
  };

  useEffect(() => {
    const loadRecommendedProjects = async () => {
      setProjectsLoading(true);
      setFadeInProjects(false);
      setProjects([]);

      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      try {
        const response = await authFetch<ProjectRecomendationsResponseDto>(
          `${url}/agent/project/recommendations`
        );
        if (!response) {
          setForbidden(true);
          return;
        }
        console.log(response.projectRecs);
        setProjects(response.projectRecs);
      } catch (error) {
        console.error(`Error fetching recommended projects ${error}`);
        setForbidden(true);
      } finally {
        setTimeout(() => setFadeInProjects(true), 50);
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
    } catch (err) {
      console.error("Unexpected fetch error:", err);
    }
  };

  useEffect(() => {
    setTimeout(() => setFadeInCards(true), 25);
  }, []);

  return (
    <>
      <div
        className={`mx-auto w-full max-w-[75rem] h-[10rem] transition-opacity duration-500 ${
          fadeInCards ? "opacity-100" : "opacity-0"
        }`}
      >
        <OverviewCardsGroup />
      </div>

      {projectsLoading && (
        <div className="flex justify-center">
          <SpinnerLoading spinnerOffsetY={550} spinnerOffsetX={850} />
        </div>
      )}

      <div
        className={`mx-auto w-full mt-20 max-w-[75rem] transition-opacity duration-500 ease-in-out ${
          projectsLoading
            ? "opacity-0"
            : fadeInProjects
              ? "opacity-100"
              : "opacity-0"
        }`}
      >
        {!projectsLoading && (
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
                {forbidden || projects.length === 0 ? (
                  <TableRow>
                    <td
                      colSpan={3}
                      className="text-center py-6 text-gray-700 dark:text-gray-300"
                    >
                      No se encontraron proyectos relacionados.
                    </td>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <ProjectTableRow
                      key={project.projectId}
                      projectId={project.projectId}
                      projectName={project.projectName}
                      client={project.client}
                      managerName={project.managerName}
                      handleProjectClick={handleProjectClick}
                    />
                  ))
                )}
              </TableBody>
            </Table>

            {!forbidden && selectedProject && (
              <ProyectoModal
                projectId={selectedProject}
                onClose={() => setSelectedProject(null)}
                onApply={handleApplyToProject}
                addProjects={addProjects}
              />
            )}
          </div>
        )}

        <div
          className={`fixed bottom-[4rem] right-10 z-50 flex items-center gap-3 md:gap-4 transition-opacity duration-300 ease-in-out ${
            addProjects.length > 0
              ? "opacity-100 pointer-events-auto select-auto"
              : "opacity-0 pointer-events-none select-none"
          }`}
        >
          <div className="bg-[#f3e8ff] text-[#2b2b2b] px-4 py-2 rounded-lg text-center shadow-md">
            {appliedMessage}
          </div>
          <button
            className="bg-[#65417f] hover:bg-[#5a366e] text-white px-4 py-2 rounded-lg w-full sm:w-auto shadow-md"
            onClick={patchProjects}
          >
            Finalizar aplicación
          </button>
        </div>
      </div>
    </>
  );
}
