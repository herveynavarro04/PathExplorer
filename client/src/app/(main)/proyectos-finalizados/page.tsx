"use client";

import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage";
import ProjectViewer from "../proyectos-actuales/components/selector";
import DisplayViewer from "../proyectos-actuales/components/display";
import { getProjects } from "../proyectos-actuales/fetch";
import EndProjectModal from "../proyectos-actuales/components/EndProjectModal";

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
          terminated={true}
        />
      </div>

      <LoadingPage loading={loading}>
        <DisplayViewer
          selectedProject={selectedProject}
          onProgressChange={(value: number) => setProjectProgress(value)} 
          editable={false}

        />
      </LoadingPage>
    </>
  );
}
