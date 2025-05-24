"use client";

import Image from "next/image";
import { useState } from "react";
import { ShowcaseSection } from "components/Layouts/showcase-section";

export default function TeamCard({
  team,
  onFeedbackClick,
}: {
  team: any[];
  onFeedbackClick: (memberName: string) => void;
}) {
  const membersPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(team.length / membersPerPage);
  const startIdx = (currentPage - 1) * membersPerPage;
  const currentMembers = team.slice(startIdx, startIdx + membersPerPage);

  return (
    <ShowcaseSection title="Equipo" className="!min-h-[24rem] flex flex-col justify-between ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentMembers.map((member, i) => (
          <div key={i} className="text-center">
            <h4 className="text-[#65417f] dark:text-white font-semibold pb-9">
              {member.name}
            </h4>
            <Image
              src="/profile.png"
              alt={member.name}
              width={80}
              height={80}
              className="mx-auto rounded-xl mb-2 object-cover w-20 h-20 pb-3"
            />
            <p className="text-sm">{member.role}</p>
            <p className="text-sm pb-3">{member.cargability}</p>
            <button
              className="text-sm text-[#5a3bb3] dark:text-white mt-1 hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A] rounded-[10px] p-2"
              onClick={() => onFeedbackClick(member.name)}
            >
              + Añadir retroalimentación
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm self-center">
           {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </ShowcaseSection>
  );
}
