"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "components/ui/table";
import ModalFeedback from "./modal-feedback";
import { useState } from "react";

export default function MemberCard({ member }: { member: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    return (
        <>
            <div className="p-2 rounded-xl grid grid-cols-3 gap-6">
                {/* Columna izquierda */}
                <div className="col-span-1 text-center bg-[#f8f6fa] dark:bg-[#311a42] max-h-[524px] rounded-2xl py-6 pb-8">
                    <h2 className="text-3xl font-bold text-[#5a3bb3] dark:text-white mb-8">{member.name}</h2>
                    <img src="/profile.png" alt={member.name} className="w-40 h-40 mx-auto rounded-xl mb-8" />
                    <p className="text-xl font-semibold mb-8">Nivel {member.level}</p>
                    <p className="text-lg">Cargabilidad: {member.cargability}</p>
                </div>

                {/* Columna derecha */}
                <div className="col-span-2 space-y-6">
                    <Section title="Cursos" items={member.courses} />
                    <Section title="Certificados" items={member.certificates} />
                    <Goals goals={member.goals} />
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

function Section({ title, items }: { title: string; items: any[] }) {
    const [status, setStatus] = useState<(null | "aprobado" | "rechazado")[]>(Array(items.length).fill(null));

    const handleDecision = (index: number, decision: "aprobado" | "rechazado") => {
        const updated = [...status];
        updated[index] = decision;
        setStatus(updated);
    };

    return (
        <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl">
            <h3 className="text-xl font-semibold text-[#5a3bb3] dark:text-white mb-2">{title}</h3>
            <Table>
                <TableBody>
                    {items.map((item, i) => (
                        <TableRow key={i} className="text-sm">
                            <TableCell>
                                {item.name}
                                <button 
                                    className="ml-4 text-[#5a3bb3] dark:text-white text-xs"
                                >
                                    Ver más
                                </button>
                            </TableCell>
                            <TableCell>
                                {status[i] === "aprobado" ? (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">✅ Aprobado</span>
                                ) : (
                                    <button
                                        className="text-sm px-4 py-1 bg-[#D0BFDB] text-[#5a3bb3] rounded-[50px]"
                                        onClick={() => handleDecision(i, "aprobado")}
                                    >
                                        Aprobar
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {status[i] === "rechazado" ? (
                                    <span className="text-red-600 font-semibold flex items-center gap-1">❌ Rechazado</span>
                                ) : (
                                    <button
                                        className="text-sm px-4 py-1 bg-[#5a3bb3] text-[#D0BFDB] rounded-[50px]"
                                        onClick={() => handleDecision(i, "rechazado")}
                                    >
                                        Rechazar
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function Goals({ goals }: { goals: any[] }) {
    const [status, setStatus] = useState<(null | "aprobado" | "rechazado")[]>(Array(goals.length).fill(null));

    const handleDecision = (index: number, decision: "aprobado" | "rechazado") => {
        const updated = [...status];
        updated[index] = decision;
        setStatus(updated);
    };

    return (
        <div className="bg-[#f8f6fa] dark:bg-[#311a42] p-4 rounded-xl">
            <h3 className="text-xl font-semibold text-[#5a3bb3] dark:text-white mb-2">Metas</h3>
            <Table>
                <TableBody>
                    {goals.map((goal, i) => (
                        <TableRow key={i}>
                            <TableCell>{goal.description}</TableCell>
                            <TableCell>
                                {status[i] === "aprobado" ? (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">✅ Aprobado</span>
                                ) : (
                                    <button
                                        className="text-sm px-4 py-1 bg-[#D0BFDB] text-[#5a3bb3] rounded-[50px]"
                                        onClick={() => handleDecision(i, "aprobado")}
                                    >
                                        Aprobar
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>
                                {status[i] === "rechazado" ? (
                                    <span className="text-red-600 font-semibold flex items-center gap-1">❌ Rechazado</span>
                                ) : (
                                    <button
                                        className="text-sm px-4 py-1 bg-[#5a3bb3] text-[#D0BFDB] rounded-[50px]"
                                        onClick={() => handleDecision(i, "rechazado")}
                                    >
                                        Rechazar
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
