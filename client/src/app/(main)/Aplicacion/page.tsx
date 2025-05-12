'use client';
import { useState, useEffect } from 'react';
import ProyectoModal from './ProyectoModal';
import { FaInfoCircle, FaClock, FaCheck } from 'react-icons/fa';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import ProjectCard from './ProjectCard';
import Select from 'react-select';
import { useTheme } from 'next-themes'; 




export default function MyProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [technologyFilter, setTechnologyFilter] = useState<string[]>([]);

  //no borrar es para que funcione el Select de react
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme(); 

  //proyectos a los que aplica el empleado
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [appliedMessage, setAppliedMessage] = useState('');

  //funcion para aplicar al proyecto
  const handleApplyToProject = (projectId: string) => {
    let updatedProjects: string[];
  
    if (appliedProjects.includes(projectId)) {
      // si ya está aplicado, se quita
      updatedProjects = appliedProjects.filter(id => id !== projectId);
    } else {
      // si no está aplicado, lo agregamos
      updatedProjects = [...appliedProjects, projectId];
    }
  
    setAppliedProjects(updatedProjects);
    const count = updatedProjects.length;
    setAppliedMessage(`${count} proyecto${count !== 1 ? 's' : ''} aplicado${count !== 1 ? 's' : ''}`);
  
    setSelectedProject(null); // cierra el  modal
  };


  //no borrar es para estilos del filtro de tecnologías
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderColor: state.isFocused ? "#65417f" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 1px #65417f" : "none",
      borderWidth: "1px",
      "&:hover": {
        borderColor: "#65417f",
      },
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderRadius: "0.5rem",
      marginTop: "4px",
      zIndex: 10,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#877691"
          : "#d6c8df"
        : "transparent",
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      cursor: "pointer",
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#877691" : "#d8c7e6",
      borderRadius: "9999px",
      padding: "0 6px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      ":hover": {
        backgroundColor: "#65417f",
        color: "white",
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#ddd" : "#666",
      fontSize: "0.875rem",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#1f1b2e" : "#111827",
    }),
  };
  

  //proyectos ejemplos que usé para simular
  const projects = [
    {
      projectId: "1",
      projectName: "Plataforma de E-learning",
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-08-15"),
      projectType: "Full Stack Development",
      client: "UNAM",
      active: true,
      user_status: "pending",
      information: "Desarrollo de una plataforma educativa con videollamadas, exámenes y seguimiento de progreso.",
      manager: "Laura Martínez",
      technologies: ["Angular", "NestJS", "PostgreSQL"],
    },
    {
      projectId: "2",
      projectName: "Panel de Control IoT",
      startDate: new Date("2023-04-01"),
      endDate: new Date("2023-10-01"),
      projectType: "Embedded Systems",
      client: "Grupo Bafar",
      active: false,
      user_status: "",
      information: "Diseño de un panel web para monitoreo y control de dispositivos IoT industriales.",
      manager: "Carlos Pérez",
      technologies: ["Vue.js", "Go", "InfluxDB"],
    },
    {
      projectId: "3",
      projectName: "Sistema de Reservas Hoteleras",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-12-01"),
      projectType: "Web Development",
      client: "Grupo Posadas",
      active: true,
      user_status: "pending",
      information: "Desarrollo de una solución para reservas online y gestión de habitaciones.",
      manager: "Sandra Gómez",
      technologies: ["Django", "React", "MySQL"],
    },
    {
      projectId: "4",
      projectName: "Asistente Virtual para Ventas",
      startDate: new Date("2022-09-01"),
      endDate: new Date("2023-03-01"),
      projectType: "AI & Chatbot",
      client: "Liverpool",
      active: false,
      user_status: "",
      information: "Implementación de un chatbot con NLP para atención a clientes y ventas.",
      manager: "Tomás López",
      technologies: ["Python", "TensorFlow", "Dialogflow"],
    },
    {
      projectId: "5",
      projectName: "Dashboard de KPIs Financieros",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-07-01"),
      projectType: "Data Visualization",
      client: "Banorte",
      active: false,
      user_status: "accepted",
      information: "Desarrollo de dashboards interactivos para el seguimiento de indicadores financieros clave.",
      manager: "Patricia Ruiz",
      technologies: ["Power BI", "SQL Server", "DAX"],
    },
    {
      projectId: "6",
      projectName: "API de Localización y Rutas",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-05-30"),
      projectType: "Backend Development",
      client: "Uber Eats",
      active: true,
      user_status: "pending",
      information: "Construcción de APIs RESTful para geolocalización, rutas y estimaciones de entrega.",
      manager: "Luis Herrera",
      technologies: ["Node.js", "Fastify", "Redis"],
    },
    {
      projectId: "7",
      projectName: "Sistema de Control de Inventario",
      startDate: new Date("2022-05-01"),
      endDate: new Date("2022-11-15"),
      projectType: "ERP Module",
      client: "Grupo LALA",
      active: false,
      user_status: "",
      information: "Módulo para controlar el stock, entradas/salidas y notificaciones por bajo inventario.",
      manager: "Ana Torres",
      technologies: ["Laravel", "Vue.js", "MariaDB"],
    },
    {
      projectId: "8",
      projectName: "Portal de Reclutamiento",
      startDate: new Date("2023-09-01"),
      endDate: new Date("2024-03-01"),
      projectType: "Web App",
      client: "Manpower México",
      active: true,
      user_status: "pending",
      information: "Aplicación web para publicación de vacantes, postulaciones y filtros automatizados.",
      manager: "Marco Jiménez",
      technologies: ["ASP.NET Core", "React", "Azure SQL"],
    },
  ];
  

  //lógica para la paginación, no borrar
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProjects = projects.filter((project) =>
    technologyFilter.length === 0
      ? true
      : project.technologies.some((tech) => technologyFilter.includes(tech))
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);



  const handleProjectClick = (project: any) => {
    setSelectedProject(project); 
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );
  const techOptions = allTechnologies.map((tech) => ({
    value: tech,
    label: tech,
  }));

  //no borrar
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <div className='flex justify-between'>
      <div className='flex'>
        <div className='pt-5'>
        <Breadcrumb pageName="Proyectos disponibles" />
        </div>
      
      </div>
      
      {isClient && (
      <Select
      options={techOptions}
      isMulti
      placeholder="Filtrar por tecnología..."
      styles={customStyles}
      className="w-[300px] self-center"
      onChange={(selected) => {
        const values = selected.map((s) => s.value);
        setTechnologyFilter(values);
        setCurrentPage(1);
      }}
    />
    
    )}

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
          applied={appliedProjects.includes(project.projectId)} 
        />
        ))}
      </div>

      

      {selectedProject && (
        <ProyectoModal
        proyecto={selectedProject}
        onClose={() => setSelectedProject(null)}
        onApply={handleApplyToProject}
        appliedProjects={appliedProjects}
      />
      )}

      
    </div>

    <div className="w-full bg-transparent mt-8">
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 px-4 sm:px-0">
    
    {/* pagianción */}
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

    {/*  proyectos aplicados */}
    {appliedProjects.length > 0 && (
      <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
        <div className="bg-[#f3e8ff] text-[#2b2b2b] px-4 py-2 rounded-lg text-center">
          {appliedMessage}
        </div>
        <button className="bg-[#65417f] hover:bg-[#5a366e] text-white px-4 py-2 rounded-lg w-full sm:w-auto">
          Finalizar aplicación
        </button>
      </div>
    )}
  </div>
</div>


    </div>
  );
}
