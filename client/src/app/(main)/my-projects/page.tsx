"use client";
import { useState, useEffect } from "react";
import ProyectoModal from "./ProyectoModal";
import { FaInfoCircle, FaClock, FaCheck } from "react-icons/fa";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import ProjectCard from "./ProjectCard";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import LoadingPage from "components/LoadingPage";

interface ProjectInfoPreviewResponseDto {
  projectId: string;
  projectName: string;
  information: string;
  active: boolean;
  status: string;
}

interface GetUserProjectsResponseDto {
  employeeProjects: ProjectInfoPreviewResponseDto[];
}
type FilterType = "pending" | "approved" | "rejected";

export default function MyProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<FilterType>("approved");
  const [projects, setProjects] = useState<ProjectInfoPreviewResponseDto[]>([]);
  const [deleteProjects, setdeleteProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState("");
  const [triggerPost, setTriggerPost] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL!;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProjects = projects.filter((project) => {
    if (filter === "pending") return project.status === "pending";
    else if (filter === "approved") return project.status === "approved";
    else return project.status === "rejected";
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const handleUnapplyFromProject = (projectId: string) => {
    setdeleteProjects((prev) => {
      const updatedProjects = prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];
      const count = updatedProjects.length;
      setAppliedMessage(
        `${count} proyecto${count !== 1 ? "s" : ""} desaplicado${count !== 1 ? "s" : ""}`
      );
      return updatedProjects;
    });
    setSelectedProject(null);
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const projectsData = await authFetch<GetUserProjectsResponseDto>(
          `${url}/projects/employee`
        );
        console.log(projectsData);

        if (!projectsData) {
          router.push("/login");
          return;
        }

        setProjects(projectsData.employeeProjects);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 25);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      }
    };

    loadData();
  }, [triggerRefresh]);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      if (!triggerPost) return;

      setLoading(true);
      try {
        const response = await authFetch(`${url}/projects/employee`, {
          method: "PATCH",
          body: JSON.stringify({ deleteProjects }),
        });
        if (!response) {
          router.push("/login");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));

        setdeleteProjects([]);
        setTriggerPost(false);
        setAppliedMessage("");
        setTriggerRefresh((prev) => !prev);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [triggerPost]);

  if (loading || !currentProjects) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {" "}
        <div className="flex justify-between">
          <div className="flex">
            <div className="pt-5">
              <Breadcrumb pageName="Mis proyectos" />
            </div>
          </div>

          <select
            className="px-3 rounded dark:text-gray-2 text-sm h-[2rem] bg-[#e8deef] dark:bg-[#513d63] self-center"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value as FilterType)
            }
          >
            <option value="pending">Solicitudes enviadas</option>
            <option value="approved">
              Mis proyectos (aceptados/finalizados)
            </option>
            <option value="rejected">Solicitudes rechazadas</option>
          </select>
        </div>
        <div className="flex flex-col min-h-[34rem]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
            {currentProjects.length === 0 ? (
              <div className="col-span-full flex justify-center items-end min-h-[20rem]">
                <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
                  Aún no tienes proyectos registrados.
                </p>
              </div>
            ) : (
              currentProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  projectId={project.projectId}
                  projectName={project.projectName}
                  information={project.information}
                  active={project.active}
                  status={project.status}
                  onClick={handleProjectClick}
                />
              ))
            )}
          </div>

          {selectedProject && (
            <ProyectoModal
              projectId={selectedProject}
              onClose={() => setSelectedProject(null)}
              onUnapply={handleUnapplyFromProject}
              deleteProjects={deleteProjects}
              filter={filter}
            />
          )}
        </div>
        {currentProjects.length > 0 && (
          <div className="w-full bg-transparent mt-8 flex justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 px-4 sm:px-0">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="self-center text-lg">
                  {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>

            {deleteProjects.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <div className="bg-[#f3e8ff] text-[#2b2b2b] px-4 py-2 rounded-lg text-center">
                  {appliedMessage}
                </div>
                <button
                  className="bg-[#65417f] hover:bg-[#5a366e] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  onClick={() => setTriggerPost((prev) => !prev)}
                >
                  Finalizar desaplicación
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
