"use client";

import { useState } from "react";

type ModalFeedbackProps = {
    isOpen: boolean;
    onClose: () => void;
    memberName: string;
};

export default function ModalFeedback({
    isOpen,
    onClose,
    memberName,
}: ModalFeedbackProps) {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
        setSubmitted(false);
        setFeedback("");
        onClose(); // Cierra el modal
        }, 1500); // Tiempo para mostrar mensaje
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
        <div className="bg-[#f3e8ff] dark:bg-[#311a42] p-6 rounded-xl w-96 text-center shadow-xl">
            <h2 className="text-lg font-bold text-[#5a3bb3] dark:text-white mb-2">Retroalimentación para {memberName}</h2>
            {!submitted ? (
            <>
                <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="w-full h-24 border text-black dark:text-white rounded-md p-2 mb-4 text-black"
                />
                <div className="flex justify-center gap-4">
                <button
                    onClick={handleSubmit}
                    className="bg-[#5a3bb3] text-white px-4 py-2 rounded-md"
                >
                    Guardar
                </button>
                <button
                    onClick={onClose}
                    className="text-sm text-[#5a3bb3] dark:text-white px-4 py-2"
                >
                    Cancelar
                </button>
                </div>
            </>
            ) : (
            <p className="text-[#5a3bb3] dark:text-white font-medium">¡Retroalimentación enviada!</p>
            )}
        </div>
        </div>
    );
}
