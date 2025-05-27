"use client";

import { useState } from "react";
import ModalFeedback from "./modal-feedback";
import TeamCard from "./TeamCard";
import DescriptionCard from "./DescriptionCard";
import ProgressCard from "./ProgressCard";
import DatesCard from "./DatesCard";
import ClientCard from "./ClientCard";
import TechStackCard from "./TechStackCard";

export default function DisplayViewer({
  selectedProject,
  onProgressChange,
  editable = true,
}: {
  selectedProject: any;
  onProgressChange: (progress: number) => void;
  editable?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  if (!selectedProject) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex flex-col gap-8">
          <DatesCard
            startDate={selectedProject.start_date}
            endDate={selectedProject.end_date}
            className=""
            editable={editable}
          />
          <ClientCard client={selectedProject.client} editable={editable} />
        </div>

        <DescriptionCard description={selectedProject.description} editable={editable} />
        <TechStackCard stack={selectedProject.stack} editable={editable} />

        <div className="col-span-2 rounded-xl shadow">
          <TeamCard
            team={selectedProject.team}
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
