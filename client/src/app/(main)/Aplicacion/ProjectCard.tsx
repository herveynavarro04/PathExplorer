import React from "react";

interface ProjectCardProps {
  projectId: string;
  projectName: string;
  information: string;
  projectTech: string[];
  handleProjectClick: (projectId: string, projectTech: string[]) => void;
}

const ProjectCard = ({
  projectId,
  projectName,
  information,
  projectTech,
  handleProjectClick,
}: ProjectCardProps) => {
  return (
    <div
      onClick={() => {
        handleProjectClick(projectId, projectTech);
      }}
      className="cursor-pointer rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#482a5e] dark:shadow-card h-[10rem]"
    >
      <div className="border-b border-stroke px-2 py-2 bg-[#eee9f3] dark:bg-[#644782] rounded-t-[10px] font-medium text-dark dark:border-dark dark:text-white sm:px-2 xl:px-4">
        <h2 className="text-lg font-semibold">{projectName}</h2>
      </div>

      <div className="h-[calc(100%-3rem)] flex items-center justify-center px-4 text-sm text-gray-700 dark:text-gray-200">
        <p className="text-center">{information}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
