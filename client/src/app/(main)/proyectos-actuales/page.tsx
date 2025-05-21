"use client";

import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage";
import ProjectViewer from "./components/selector";
import DisplayViewer from "./components/display";
import { getProjects } from "./fetch";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
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
      <LoadingPage loading={loading}>
        <ProjectViewer
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </LoadingPage>
      <LoadingPage loading={loading}>
        <DisplayViewer selectedProject={selectedProject} />
      </LoadingPage>
    </>
  );
}
