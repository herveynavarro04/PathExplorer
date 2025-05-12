import React, { useEffect, useRef, useState } from "react";
import { authFetch } from "@utils/authFetch";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";

interface ProyectoModalProps {
  projectId: string;
  projectTech: string[];
  onClose: () => void;
  onApply: (projectId: string) => void;
  addProjects: string[];
}

export interface ProjectInfoResponseDto {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectType: string;
  client: string;
  active: boolean;
  information: string;
  manager: string;
}

const ProyectoModal = ({
  projectId,
  projectTech,
  onClose,
  onApply,
  addProjects,
}: ProyectoModalProps) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [project, setProject] = useState<ProjectInfoResponseDto | null>(null);
  const url = `http://localhost:8080/api`;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  if (!projectId) return null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const projectData = await authFetch<ProjectInfoResponseDto>(
          `${url}/projects/${projectId}`
        );

        if (!projectData) {
          router.push("/login");
          return;
        }

        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
        router.push("/login");
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const formatearFecha = (fecha: string) => {
    try {
      const date = new Date(fecha);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return "Fecha no disponible";
    }
  };

  const closeAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
      closeAnimation();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!project) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 pb-3 max-w-3xl w-full relative shadow-xl transition-all duration-300 ease-in-out ${
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
          {project.projectName}
        </h2>

        <p className="mb-6 text-[#4b3b61] leading-relaxed">
          {project.information}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Stack de tecnologías</h3>
            <div className="flex flex-wrap gap-2">
              {projectTech.map((tech, index) => (
                <span
                  key={index}
                  className="bg-white text-[#4b3b61] px-3 py-1 rounded-full border border-[#e5d6f1] text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Inicio:</strong> {formatearFecha(project.startDate)}
            </p>
            <p>
              <strong>Fin:</strong> {formatearFecha(project.endDate)}
            </p>
            <p>
              <strong>Administrador:</strong> {project.manager || "N/A"}
            </p>
            <p>
              <strong>Cliente:</strong> {project.client}
            </p>
            <p>
              <strong>Tipo:</strong> {project.projectType}
            </p>
            <div
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                project.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {project.active ? "Vigente" : "Finalizado"}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {addProjects.includes(project.projectId) ? (
            <button
              onClick={() => onApply(project.projectId)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Cancelar aplicación
            </button>
          ) : (
            <button
              onClick={() => onApply(project.projectId)}
              className="bg-[#65417f] hover:bg-[#5a366e] text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Aplicar al proyecto
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProyectoModal;
