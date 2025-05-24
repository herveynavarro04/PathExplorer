
"use client";

import { useState } from "react";
import ModalFeedback from "./modal-feedback";
import TeamCard from "./TeamCard";
import DescriptionCard from "./DescriptionCard";
import ProgressCard from "./ProgressCard";
import DatesCard from "./DatesCard";
import ClientCard from "./ClientCard";
import TechStackCard from "./TechStackCard";

export default function DisplayViewer({ selectedProject }: { selectedProject: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  if (!selectedProject) return null;

  return (
    <div>
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
  <div className="flex flex-col gap-6">
    <DatesCard
      startDate={selectedProject.start_date}
      endDate={selectedProject.end_date}
    />
    <ClientCard client={selectedProject.client} />

  </div>

  <DescriptionCard description={selectedProject.description} />

  <TechStackCard stack={selectedProject.stack} />


  <div className="col-span-2 rounded-xl shadow" >
    <TeamCard
      team={selectedProject.team}
      onFeedbackClick={(memberName: string) => {
        setSelectedMember(memberName);
        setIsModalOpen(true);
      }}
    />
    </div>
  <ProgressCard progress={selectedProject.progress} />
</div>


      <ModalFeedback
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberName={selectedMember || ""}
      />
    </div>
  );
}
