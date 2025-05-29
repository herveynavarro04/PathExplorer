"use client";

import Select from "react-select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

type ProjectViewerProps = {
  projects: ProjectInfoPreviewResponseDto[];
  selectedProject: ProjectInfoPreviewResponseDto;
  setSelectedProject: (project: ProjectInfoPreviewResponseDto) => void;

  terminated?: boolean;
};

export default function ProjectViewer({
  projects,
  selectedProject,
  setSelectedProject,
  terminated = false,
}: ProjectViewerProps) {
  const { theme } = useTheme();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      projects.map((p) => ({ label: p.projectName, value: p.projectId }))
    );
  }, [projects]);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "transparent",
      borderColor: state.isFocused ? "#65417f" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 1px #65417f" : "none",
      borderWidth: "1px",
      "&:hover": { borderColor: "#65417f" },
      fontSize: "1.9rem",
      borderRadius: "0.75rem",
      paddingLeft: "2px",
      paddingRight: "2px",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderRadius: "0.75rem",
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
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#ddd" : "#666",
      fontSize: "0.875rem",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#000000",
      ":hover": {
        color: theme === "dark" ? "#ffffff" : "#000000",
      },
    }),
  };

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  return (
    <div className="w-full flex items-center justify-between gap-6 pb-2">
      <p className="font-extrabold text-black text-2xl whitespace-nowrap shrink-0">
        {terminated ? "Proyectos Finalizados" : "Proyectos Actuales"}
      </p>

      <Select
        options={options}
        value={options.find((o) => o.value === selectedProject?.projectId)}
        onChange={(selectedOption) =>
          setSelectedProject(
            projects.find((p) => p.projectId === selectedOption?.value)
          )
        }
        styles={customStyles}
        placeholder="Selecciona un proyecto..."
        isSearchable={false}
      />
    </div>
  );
}
