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
  availableProjects: ProjectInfoPreviewResponseDto[];
}
type FilterType = "pending" | "all";

export default function MyProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [projects, setProjects] = useState<ProjectInfoPreviewResponseDto[]>([]);
  const [deleteProjects, setdeleteProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState("");
  const [triggerPost, setTriggerPost] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);

  const url = `http://localhost:8080/api`;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProjects = projects.filter((project) => {
    if (filter === "pending") return project.status === "pending";
    return project.status !== "pending";
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

        setProjects(projectsData.availableProjects);
        setLoading(false);
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

  return (
    <LoadingPage loading={loading}>
      <div className="mx-auto w-full max-w-[970px]">
        <div className="flex justify-between">
          <div className="flex">
            <div className="pt-5">
              <Breadcrumb pageName="Mis proyectos" />
            </div>
            <div className="relative bg-transparent p-4 flex">
              <div className="relative group flex items-center space-x-2">
                <FaInfoCircle className="text-xl cursor-pointer" />
                <div className="absolute left-0 top-full mt-2 w-80 p-5 bg-[#a38abb] dark:bg-[#a285be] text-gray-300 rounded-2xl shadow-lg text-base z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ">
                  <h3 className="text-md font-semibold mb-4 text-black dark:text-white">
                    Simbología
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl text-black dark:text-white">
                      <FaClock className="transform scale-[0.8]" />
                    </div>
                    <span className="text-sm text-black dark:text-white">
                      Proyecto en marcha
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-black dark:text-white">
                      <FaCheck className="transform scale-[0.8]" />
                    </div>
                    <span className="text-sm text-black dark:text-white">
                      Proyecto finalizado
                    </span>
                  </div>
                </div>
              </div>
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
            <option value="all">Mis proyectos (aceptados/finalizados)</option>
          </select>
        </div>

        <div className="flex flex-col min-h-[34rem]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.projectId}
                projectId={project.projectId}
                projectName={project.projectName}
                information={project.information}
                active={project.active}
                status={project.status}
                onClick={handleProjectClick}
              />
            ))}
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
      </div>
    </LoadingPage>
  );
}
