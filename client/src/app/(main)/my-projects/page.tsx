'use client';
import { useState } from 'react';
import ProyectoModal from './ProyectoModal';
import { FaInfoCircle, FaClock, FaCheck } from 'react-icons/fa';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import ProjectCard from './ProjectCard';

export default function MyProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<'pending' | 'all'>('all');

  
  //proyuectos que usé para simular
  const projects = [
    {
      projectId: "1",
      projectName: "Sistema de Automatización",
      startDate: new Date("2023-01-01"), 
      endDate: new Date("2023-06-01"),
      projectType: "Web Development",
      client: "BIMBO",
      active: true,
      user_status: "pending",
      information: "Designed and developed a full-stack web platform to streamline employee task management, performance tracking, and project timeline coordination",
      manager: "John Doe",
      technologies: ["React", "Node.js", "CSS"],
    },
    {
      projectId: "2",
      projectName: "Juego de recompensas",
      startDate: new Date("2022-03-01"), 
      endDate: new Date("2022-12-01"),
      projectType: "Mobile App",
      client: "Super Salads",
      user_status: "accepted",
      active: false,
      information: "Designed and developed a full-stack web platform to streamline employee task management, performance tracking, and project timeline coordination",
      manager: "Jane Smith",
      technologies: ["React Native", "Firebase"],
    },
    {
      projectId: "3",
      projectName: "Optimización de base de datos",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Backend Development",
      client: "COCA COLA",
      active: true,
      user_status: "pending",
      information: "Designed and developed a full-stack web platform to streamline employee task management, performance tracking, and project timeline coordination",
      manager: "Robert Brown",
      technologies: ["Node.js", "Express", "MongoDB"],
    },
    {
      projectId: "4",
      projectName: "Sistema de Automatización",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Web Development",
      client: "BIMBO",
      active: true,
      user_status: "accepted",
      information: "This is a project for developing a responsive website for Bimbo",
      manager: "John Doe",
      technologies: ["React", "Node.js", "CSS"],
    },
    {
      projectId: "5",
      projectName: "Juego de recompensas",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Mobile App",
      client: "Super Salads",
      active: false,
      user_status: "accepted",

      information: "Developed a mobile application for Company Y to improve customer engagement.",
      manager: "Jane Smith",
      technologies: ["React Native", "Firebase"],
    },
    {
      projectId: "6",
      projectName: "Optimización de base de datos",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Backend Development",
      client: "COCA COLA",
      active: true,
      user_status: "accepted",

      information: "Backend development of APIs and database management for Company Z.",
      manager: "Robert Brown",
      technologies: ["Node.js", "Express", "MongoDB"],
    },
    {
      projectId: "7",
      projectName: "Proyecto X",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Web Development",
      client: "Company Y",
      user_status: "pending",
      active: false,
      information: "A new web development project for Company Y",
      manager: "Alice",
      technologies: ["Next.js", "Tailwind"],
    },
    {
      projectId: "8",
      projectName: "Proyecto Y",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Mobile App",
      client: "Company Z",
      user_status: "accepted",
      active: false,
      information: "A mobile app project for Company Z",
      manager: "Bob",
      technologies: ["Flutter", "Firebase"],
    },
    {
      projectId: "9",
      projectName: "Proyecto X",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Web Development",
      client: "Company Y",
      user_status: "accepted",
      active: true,
      information: "A new web development project for Company Y",
      manager: "Alice",
      technologies: ["Next.js", "Tailwind"],
    },
    {
      projectId: "10",
      projectName: "Proyecto Y",
      startDate: new Date("2021-07-01"), 
      endDate: new Date("2022-01-01"),
      projectType: "Mobile App",
      client: "Company Z",
      user_status: "accepted",
      active: false,
      information: "A mobile app project for Company Z",
      manager: "Bob",
      technologies: ["Flutter", "Firebase"],
    },
  ];

  //paginación
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProjects = projects.filter((project) => {
    if (filter === 'pending') return project.user_status === 'pending';
    return project.user_status !== 'pending';
  });
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project); 
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <div className='flex justify-between'>
      <div className='flex'>
        <div className='pt-5'>
        <Breadcrumb pageName="Mis proyectos" />
        </div>
      <div className="relative bg-transparent p-4 flex">
        <div className="relative group flex items-center space-x-2">
          <FaInfoCircle className="text-xl cursor-pointer" />
          <div className="absolute left-0 top-full mt-2 w-80 p-5 bg-[#a38abb] dark:bg-[#a285be] text-gray-300 rounded-2xl shadow-lg text-base z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ">
            <h3 className="text-md font-semibold mb-4 text-black dark:text-white">Simbología</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl text-black dark:text-white">
                <FaClock className="transform scale-[0.8]" />
              </div>
              <span className="text-sm text-black dark:text-white">Proyecto en marcha</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl text-black dark:text-white">
                <FaCheck className="transform scale-[0.8]" />
              </div>
              <span className="text-sm text-black dark:text-white">Proyecto finalizado</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* filtrar por solicitued enviadas o todos */}
      <select
        className="px-3 rounded dark:text-gray-2 text-sm h-[2rem] bg-[#e8deef] dark:bg-[#513d63] self-center"
        value={filter}
        onChange={(e) => setFilter(e.target.value as 'pending' | 'all')}
      >
        <option value="pending">Solicitudes enviadas</option>
        <option value="all">Mis proyectos (aceptados/finalizados)</option>
      </select>

      </div>
      
      <div className="flex flex-col min-h-[34rem]">

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
        {currentProjects.map((project) => (
          <ProjectCard
            key={project.projectId}
            projectId={project.projectId}
            projectName={project.projectName}
            startDate={project.startDate}
            endDate={project.endDate}
            projectType={project.projectType}
            client={project.client}
            active={project.active}
            information={project.information}
            manager={project.manager}
            user_status={project.user_status}
            technologies={project.technologies}
            onClick={handleProjectClick}
          />
        ))}

        
      </div>
      {selectedProject && (
        <ProyectoModal
          proyecto={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      </div>

      <div className="w-full bg-transparent mt-8">
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 px-4 sm:px-0">
    
    {/*  paginacion */}
    <div className="flex justify-center gap-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="self-center text-lg">
        {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>

      
    </div>
    </div>
    </div>
  );
}
