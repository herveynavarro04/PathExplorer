"use client";

import React from "react";
import ReactDOM from "react-dom";

interface CertModalProps {
  certificate: {
    certificateId: string;
    information?: string;
    title: string;
    obtainedAt?: string;
  };
  onClose: () => void;
}

const CertModal: React.FC<CertModalProps> = ({ certificate, onClose }) => {
  const { certificateId, information, title, obtainedAt } = certificate;

  const token = localStorage.getItem("token");
const fileUrl = `/api/proxy-certificate/${certificateId}?token=${token}`;


  const filePreviewUrl = `${fileUrl}?token=${token}`;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#2e1b3f] p-6 rounded-xl max-w-xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-bold bg-gray-200 dark:bg-[#5f4676] text-[#4B0082] hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-[#4B0082] dark:text-white">
          {title}
        </h2>

        <p className="mb-4 text-sm dark:text-gray-200">
          <strong>Descripción:</strong> {information || "No disponible"}
        </p>
        <p className="mb-4 text-sm dark:text-gray-200">
            <strong>Fecha de obtención:</strong>{" "}
            {certificate.obtainedAt
                ? new Date(certificate.obtainedAt).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
                : "No disponible"}
            </p>

        <div className="border rounded-lg overflow-hidden shadow-md mb-4">
          <iframe
            src={fileUrl}
            title="Vista previa del certificado"
            className="w-full h-[400px]"
          />
        </div>

        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Ver certificado completo
        </a>
      </div>
    </div>,
    document.body
  );
};

export default CertModal;
