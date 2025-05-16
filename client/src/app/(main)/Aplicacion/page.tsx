"use client";
import { useState, useEffect } from "react";
import ProyectoModal from "./ProyectoModal";
import { FaInfoCircle, FaClock, FaCheck } from "react-icons/fa";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import ProjectCard from "./ProjectCard";
import Select from "react-select";
import { useTheme } from "next-themes";
import { authFetch } from "@utils/authFetch";
import Loading from "components/Loading";
import { useRouter } from "next/navigation";
import LoadingPage from "components/LoadingPage";

interface TechDto {
  technologyId: string;
  technologyName: string;
}

interface GetProjectsTechResponseDto {
  ProjectsTechs: TechDto[];
}

interface ProjectInfoPreviewResponseDto {
  projectId: string;
  projectName: string;
  information: string;
  technologies: TechDto[];
}

interface GetUserProjectsResponseDto {
  availableProjects: ProjectInfoPreviewResponseDto[];
}

export default function MyProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string>(null);
  const [allTech, setAllTech] = useState<string[]>([]);
  const [technologyFilter, setTechnologyFilter] = useState<string[]>([]);
  const [projects, setProjects] = useState<ProjectInfoPreviewResponseDto[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();
  const [addProjects, setAddProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerPost, setTriggerPost] = useState<boolean>(false);
  const [triggerRefresh, setTriggerRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const url = `http://localhost:8080/api`;
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  let filteredProjects = projects;
  if (technologyFilter.length > 0) {
    filteredProjects = projects.filter((project) =>
      project.technologies.some((tech) =>
        technologyFilter.includes(tech.technologyName)
      )
    );
  }

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const techOptions = allTech.map((tech) => ({ value: tech, label: tech }));

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (allTech.length === 0) return;

    const loadData = async () => {
      try {
        const projectsData = await authFetch<GetUserProjectsResponseDto>(
          `${url}/projects/employee/available`
        );

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
  }, [triggerRefresh, allTech]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const allTechData = await authFetch<GetProjectsTechResponseDto>(
          `${url}/projects/techs`
        );
        if (!allTechData) {
          router.push("/login");
          return;
        }

        setAllTech(() =>
          allTechData.ProjectsTechs.map((tech) => tech.technologyName)
        );

        setLoading(false);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  useEffect(() => {
    const loadData = async () => {
      if (!triggerPost) return;

      setLoading(true);
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderColor: state.isFocused ? "#65417f" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 1px #65417f" : "none",
      borderWidth: "1px",
      "&:hover": { borderColor: "#65417f" },
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderRadius: "0.5rem",
      marginTop: "4px",
      zIndex: 10,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#877691"
          : "#d6c8df"
        : "transparent",
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      cursor: "pointer",
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#877691" : "#d8c7e6",
      borderRadius: "9999px",
      padding: "0 6px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      ":hover": {
        backgroundColor: "#65417f",
        color: "white",
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#ddd" : "#666",
      fontSize: "0.875rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
  };

  return (
    <LoadingPage loading={loading}>
      <div className="mx-auto w-full max-w-[970px]">
        <div className="flex justify-between">
          <div className="flex pt-5">
            <Breadcrumb pageName="Proyectos disponibles" />
          </div>
          {isClient && (
            <Select
              options={techOptions}
              isMulti
              placeholder="Filtrar por tecnología..."
              styles={customStyles}
              className="w-[300px] self-center"
              onChange={(selected) => {
                const values = selected.map((s) => s.value);
                setTechnologyFilter(values);
                setCurrentPage(1);
              }}
            />
          )}
        </div>

        <div className="flex flex-col min-h-[34rem]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.projectId}
                projectId={project.projectId}
                projectName={project.projectName}
                information={project.information}
                handleProjectClick={handleProjectClick}
              />
            ))}
          </div>

          {selectedProject && (
            <ProyectoModal
              projectId={selectedProject}
              onClose={() => setSelectedProject(null)}
              onApply={handleApplyToProject}
              addProjects={addProjects}
            />
          )}
        </div>

        <div className="w-full bg-transparent mt-8">
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

            {addProjects.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <div className="bg-[#f3e8ff] text-[#2b2b2b] px-4 py-2 rounded-lg text-center">
                  {appliedMessage}
                </div>
                <button
                  className="bg-[#65417f] hover:bg-[#5a366e] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  onClick={() => setTriggerPost((prev) => !prev)}
                >
                  Finalizar aplicación
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadingPage>
  );
}
