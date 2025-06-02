"use client";

import { useState } from "react";
import ModalFeedback from "./modal-feedback";
import CertificatesCard from "./certificates-card";
import GoalsCard from "./gaols-card";

export default function MemberCard({ member }: { member: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  return (
    <>
      <div className="p-2 rounded-xl grid grid-cols-3 gap-6">
        {/* Profile */}
        <div className="col-span-1 text-center bg-[#f8f6fa] dark:bg-[#311a42] max-h-[524px] rounded-2xl py-6 pb-8">
          <h2 className="text-3xl font-bold text-[#65417f] dark:text-white mb-8">
            {member.name}
          </h2>
          <img
            src="/profile.png"
            alt={member.name}
            className="w-40 h-40 mx-auto rounded-xl mb-8"
          />
          <p className="text-xl font-semibold mb-8">Nivel {member.level}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{member.position}</p>
        </div>

        {/* Cards */}
        <div className="col-span-2 space-y-6">
          <CertificatesCard items={member.certificates} />
          <GoalsCard goals={member.goals} />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-2 bg-[#5a3bb3] text-white rounded-lg hover:bg-[#482c93] transition"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedMember(member.name);
          }}
        >
          Añadir retroalimentación
        </button>
      </div>

      <ModalFeedback
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memberName={selectedMember || ""}
      />
    </>
  );
}
