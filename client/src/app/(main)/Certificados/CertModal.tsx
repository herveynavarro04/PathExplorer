"use client";


import React, { useEffect, useRef, useState } from "react";
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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await fetch(`/api/proxy-certificate/${certificateId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) throw new Error("No se pudo cargar el certificado");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error(error);
        setPdfUrl(null);
      }
    };

    fetchPdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [certificateId]);

  const handleOpenCertificate = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

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

        <p className="mb-2 text-sm dark:text-gray-200">
          <strong>Descripción:</strong> {information || "No disponible"}
        </p>
        <p className="mb-4 text-sm dark:text-gray-200">
          <strong>Fecha de obtención:</strong>{" "}
          {obtainedAt
            ? new Date(obtainedAt).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "No disponible"}
        </p>

        <div className="border rounded-lg overflow-hidden shadow-md mb-4 h-[400px]">
          {pdfUrl ? (
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              title="Vista previa del certificado"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              Cargando vista previa...
            </div>
          )}
        </div>

        <button
          onClick={handleOpenCertificate}
          className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
        >
          Ver certificado completo
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CertModal;
