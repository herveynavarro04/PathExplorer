"use client";

import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage";
import ProjectViewer from "./components/selector";
import DisplayViewer from "./components/display";
import { getProjects } from "./fetch";
import EndProjectModal from "./components/EndProjectModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectProgress, setProjectProgress] = useState(0);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
      setSelectedProject(data[0] || null);
      setProjectProgress(data[0]?.progress || 0); 
    }

    loadProjects();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
      setSelectedProject(data[0] || null);
    }

    loadProjects();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-9 px-4">
        <ProjectViewer
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={(project) => {
            setSelectedProject(project);
            setProjectProgress(project?.progress || 0); 
          }}
        />

        {projectProgress === 100 && (
  <button
    className="bg-[#65417f] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
    onClick={() => setIsFinalizeModalOpen(true)}
  >
    Marcar como finalizado
  </button>
)}

{isFinalizeModalOpen && (
  <EndProjectModal
    projectName={selectedProject?.projectName || "el proyecto"}
    onCancel={() => setIsFinalizeModalOpen(false)}
    onConfirm={() => {
      console.log("Proyecto finalizado");
      setIsFinalizeModalOpen(false);
      // endpoint de backend
    }}
  />
)}
      </div>

      <LoadingPage loading={loading}>
        <DisplayViewer
          selectedProject={selectedProject}
          onProgressChange={(value: number) => setProjectProgress(value)} 
          editable={true} 
        />
      </LoadingPage>
    </>
  );
}
