

"use client";

import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { authFetch } from "@utils/authFetch";

interface CertFormProps {
  onClose: () => void;
  onSave?: () => void;
}

const CertForm: React.FC<CertFormProps> = ({ onClose, onSave }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [obtainedAt, setObtainedAt] = useState("");

  const closeAnimation = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeAnimation();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title || !information || !obtainedAt) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("information", information);
    formData.append("obtainedAt", new Date(obtainedAt).toISOString());
    formData.append("certificateFile", file);

    const url = "http://localhost:8080/api";

    try {
      const response = await authFetch(`${url}/certificates`, {
        method: "POST",
        body: formData,
      });

      if (response) {
        onSave?.();        
        closeAnimation();   
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const isFormValid = file && title && information && obtainedAt;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 max-w-lg w-full relative shadow-xl transition-all duration-300 ease-in-out ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <button
          onClick={closeAnimation}
          className="absolute top-4 right-4 text-lg font-bold bg-[#e0cfe6] hover:bg-[#d1c0db] text-[#4B0082] rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b border-[#d7bff1] pb-2">
          Subir Certificado
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm">
            Título del certificado:
            <input
              type="text"
              className="border mt-1 p-2 rounded w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className="text-sm">
            Información adicional:
            <textarea
              className="border mt-1 p-2 rounded w-full"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              required
            />
          </label>

          <label className="text-sm">
            Fecha de obtención:
            <input
              type="date"
              className="border mt-1 p-2 rounded w-full"
              value={obtainedAt}
              onChange={(e) => setObtainedAt(e.target.value)}
              required
            />
          </label>

          <label className="text-sm w-full">
  Subir archivo (.pdf):
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) {
        setFile(e.dataTransfer.files[0]);
      }
    }}
    className="mt-2 p-6 border-2 border-dashed border-purple-400 rounded-lg text-center cursor-pointer bg-purple-50 hover:bg-purple-100 transition"
    onClick={() => document.getElementById('fileUploadInput')?.click()}
  >
    {file ? (
      <span className="text-purple-700 font-medium">{file.name}</span>
    ) : (
      <span className="text-purple-500">Arrastra el archivo aquí o haz clic para seleccionar</span>
    )}
  </div>
  <input
    id="fileUploadInput"
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
    className="hidden"
  />
</label>


          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-4 py-2 rounded text-white transition ${
              isFormValid
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-300 cursor-not-allowed"
            }`}
          >
            Subir
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CertForm;
