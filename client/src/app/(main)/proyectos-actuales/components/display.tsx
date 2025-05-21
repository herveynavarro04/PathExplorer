"use client";

import ModalFeedback from "./modal-feedback"; // Ajusta la ruta si es necesario
import { useState } from "react";

export default function DisplayViewer({ selectedProject }: { selectedProject: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);  

    if (!selectedProject) return null;

    return (
        <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-6 rounded-2xl">
        <div className=" w-full grid grid-cols-3 gap-10 h-[38rem]">
            
            {/* Columna 1: Equipo */}
            <div className="border-r pr-6 space-y-8">
            <h1 className="text-2xl text-black dark:text-white font-bold mb-2">{selectedProject.name}</h1>
            <div className="w-full grid grid-cols-2 gap-6 max-h-[700px] overflow-y-auto overflow-x-hidden"  style={{ maxHeight: "35rem" }}>
                {selectedProject.team.map((member: any, i: number) => (
                <div key={i} className="text-center">
                    <h4 className="text-[#65417f] dark:text-white font-semibold">{member.name}</h4>
                    <img
                    src="/profile.png"
                    alt={member.name}
                    className="w-20 h-20 mx-auto rounded-xl mb-2"
                    />
                    <p className="text-sm">{member.role}</p>
                    <p className="text-sm">{member.cargability}</p>
                    <button 
                        className="text-sm text-[#5a3bb3] dark:text-white mt-1 hover:bg-[#ece5f1] dark:hover:bg-[#FFFFFF1A] rounded-[10px] p-2"
                        onClick={() => {
                            setIsModalOpen(true);
                            setSelectedMember(member.name);
                        }}
                    >
                        + Añadir retroalimentación
                    </button>
                </div>
                ))}
            </div>
            </div>

            {/* Columna 2 y 3: Info del proyecto */}
            <div className="col-span-2 grid grid-cols-2 gap-6 w-full">
            
            {/* Sección izquierda de contenido */}
            <div className="space-y-4">
                <div>
                <p className="text-sm text-black dark:text-white font-medium mb-1 pt-16">Descripción</p>
                <div className="bg-[#c6b0dc] text-[#65417f] rounded-xl p-4 font-medium text-sm">
                    {selectedProject.description}
                </div>
                </div>


                <div>
                <p className="text-sm text-black dark:text-white font-medium mb-2">Progreso del proyecto</p>
                <div className="w-80 h-80 mx-auto mt-6 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#c6b0dc"
                        strokeWidth="10"
                        fill="none"
                        />
                        <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#65417f"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={
                            2 * Math.PI * 45 * (1 - selectedProject.progress / 100)
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-black dark:text-white">
                        {selectedProject.progress}%
                    </div>
                </div>

                </div>
            </div>

            {/* Sección derecha: fechas y stack */}
            <div className="space-y-10">
            <div className="flex gap-6 pt-16">
                <div>
                    <p className="text-sm text-black dark:text-white font-medium mb-1">Fecha Inicio</p>
                    <div className="bg-[#c6b0dc] text-[#65417f] rounded-xl p-2 px-4 w-fit font-medium">
                    {selectedProject.start_date}
                    </div>
                </div>
                <div>
                    <p className="text-sm text-black dark:text-white font-medium mb-1">Fecha Fin</p>
                    <div className="bg-[#c6b0dc] text-[#65417f] rounded-xl p-2 px-4 w-fit font-medium">
                    {selectedProject.end_date}
                    </div>
                </div>
                </div>
                <div>
                <p className="text-sm text-black dark:text-white font-medium mb-1">Cliente</p>
                <div className="bg-[#c6b0dc] text-[#65417f] rounded-xl p-2 px-4 font-medium w-fit">
                    {selectedProject.client}
                </div>
                </div>
                

                <div>
                <p className="text-sm text-black dark:text-white font-medium mb-2">
                    Stack Tecnológico
                </p>
                <div className="bg-[#c6b0dc] rounded-xl p-4 max-h-[8rem] overflow-y-auto flex flex-wrap gap-3 w-full items-start">
                    {selectedProject.stack.map((tech: string, i: number) => (
                        <span
                        key={i}
                        className="bg-[#e8deef] text-[#65417f] px-4 py-1 rounded-full text-sm"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>
                </div>
            </div>

            </div>
        </div>
        <ModalFeedback
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            memberName={selectedMember || ""}
        />
        </div>
    );
}
