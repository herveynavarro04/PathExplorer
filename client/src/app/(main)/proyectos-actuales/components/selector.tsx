"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "lib/utils";

export default function ProjectViewer({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: any[];
  selectedProject: any;
  setSelectedProject: (project: any) => void;
}) {
  return (
    <div className="relative p-2 w-fit">
      <select
        className="appearance-none mt-2 mb-6 px-6 py-3 pr-12 rounded-full text-black dark:text-white font-medium bg-[#593BB48E] dark:bg-[#593bb48e]"
        onChange={(e) =>
          setSelectedProject(
            projects.find((p) => p.id === e.target.value) || null
          )
        }
        value={selectedProject?.id || ""}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-5 top-[45%] -translate-y-1/2 text-black dark:text-white">
        <ChevronDown size={20} />
      </div>
    </div>
  );
}
