"use client";

import { useState } from "react";
import ModalFeedback from "./modal-feedback";
import TeamCard from "./TeamCard";
import DescriptionCard from "./DescriptionCard";
import ProgressCard from "./ProgressCard";
import DatesCard from "./DatesCard";
import ClientCard from "./ClientCard";
import TechStackCard from "./TechStackCard";

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

interface GetEmployeesByProjectResponseDto {
  profilePic: string;
  position: string;
  employeeName: string;
  employeeId: string;
  chargeability: number;
}

interface DisplayViewerProps {
  selectedProject: ProjectInfoPreviewResponseDto;
  techs: TechDto[];
  employees: GetEmployeesByProjectResponseDto[];
  onProgressChange: (value: number) => void;
  editable: boolean;
}
export default function DisplayViewer({
  selectedProject,
  techs,
  employees,
  onProgressChange,
  editable,
}: DisplayViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  if (!selectedProject) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex flex-col gap-8">
          <DatesCard
            startDate={selectedProject.startDate}
            endDate={selectedProject.endDate}
            editable={editable}
          />
          <ClientCard client={selectedProject.client} editable={editable} />
        </div>

        <DescriptionCard
          description={selectedProject.information}
          editable={editable}
        />
        <TechStackCard
          stack={selectedProject.technologies}
          techs={techs}
          editable={editable}
        />

        <div className="col-span-2 rounded-xl shadow">
          <TeamCard
            employees={employees}
            onFeedbackClick={(memberName: string) => {
              setSelectedMember(memberName);
              setIsModalOpen(true);
            }}
            editable={editable}
          />
        </div>

        <ProgressCard
          progress={selectedProject.progress}
          onProgressChange={onProgressChange}
          editable={editable}
        />
      </div>

      <ModalFeedback
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberName={selectedMember || ""}
      />
    </div>
  );
}
