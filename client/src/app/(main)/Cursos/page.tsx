'use client';
import { useState } from 'react';
import CourseCard from './CourseCard';
import CourseModal from './CourseModal';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import CourseForm from './CourseForm';

const Page = () => {
  const [selectedCourse, setselectedCourse] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCourse = (newCourse: any) => {
    setCourses((prev) => [...prev, newCourse]);
    setCurrentPage(Math.ceil((courses.length + 1) / coursesPerPage));
  };
  

  const coursesPerPage = 6;

  // Dummy course data
  const [courses, setCourses] = useState<any[]>([
    {
      courseId: 1,
      title: "Introducción a la Inteligencia Artificial",
      validated: true,
      reviser: "María González",
      duration: 40,
      institution: "Universidad Nacional Autónoma de México",
      created_at: new Date("2023-05-10"),
      information:
        "Curso enfocado en los fundamentos de la IA, incluyendo redes neuronales y aprendizaje supervisado.",
      course_url: "https://cursos.unam.mx/ia-introduccions/",
    },
    {
      courseId: 2,
      title: "Desarrollo Web Full Stack",
      validated: false,
      reviser: "Carlos Herrera",
      duration: 60,
      institution: "Platzi",
      created_at: new Date("2022-11-20"),
      information:
        "Cubre el desarrollo de aplicaciones usando React, Node.js, y bases de datos relacionales.",
      course_url: "https://platzi.com/cursos/fullstack-webdev/",
    },
    {
      courseId: 3,
      title: "Fundamentos de Ciberseguridad",
      validated: true,
      reviser: "Ana Martínez",
      duration: 30,
      institution: "Coursera - Cisco",
      created_at: new Date("2021-09-15"),
      information:
        "Introduce principios básicos de seguridad informática y prácticas de defensa.",
      course_url: "https://www.coursera.org/learn/fundamentos-ciberseguridad",
    },
    {
      courseId: 4,
      title: "Gestión de Proyectos con Scrum",
      validated: false,
      reviser: "Luis Ramírez",
      duration: 25,
      institution: "Scrum.org",
      created_at: new Date("2024-02-01"),
      information:
        "Curso práctico sobre marcos ágiles con foco en roles, artefactos y ceremonias de Scrum.",
      course_url: "https://www.scrum.org/courses/scrum-master-training",
    },
    {
      courseId: 5,
      title: "Gestión de tiempos y recursos",
      validated: false,
      reviser: "Luis Ramírez",
      duration: 25,
      institution: "Scrum.org",
      created_at: new Date("2024-02-01"),
      information:
        "Curso práctico sobre marcos ágiles con foco en roles, artefactos y ceremonias de Scrum.",
      course_url: "https://www.scrum.org/courses/gestion-tiempo-recursos",
    },
    {
      courseId: 6,
      title: "Machine Learning Avanzado",
      validated: true,
      reviser: "Sofía Torres",
      duration: 50,
      institution: "edX - Harvard",
      created_at: new Date("2023-08-10"),
      information: "Explora técnicas avanzadas como boosting, clustering y redes profundas.",
      course_url: "https://edx.org/ml-avanzado",
    },
    {
      courseId: 7,
      title: "Big Data Essentials",
      validated: true,
      reviser: "Juan Pérez",
      duration: 35,
      institution: "IBM",
      created_at: new Date("2023-09-10"),
      information: "Procesamiento de datos masivos con Hadoop, Spark y herramientas modernas.",
      course_url: "https://ibm.com/big-data-essentials",
    },
  ]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCourseClick = (course: any) => {
    setselectedCourse(course);
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <div className="flex pt-5 items-center justify-between w-full">
        <Breadcrumb pageName="Mis Cursos" />
        
      </div>

      <div className="flex flex-col min-h-[34rem]">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
          {currentCourses.map((course) => (
            <CourseCard
              key={course.courseId}
              courseId={course.courseId}
              title={course.title}
              validated={course.validated}
              reviser={course.reviser}
              duration={course.duration}
              institution={course.institution}
              created_at={course.created_at}
              information={course.information}
              course_url={course.course_url}
              onClick={handleCourseClick}
            />
          ))}
        </div>

        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setselectedCourse(null)}
          />
        )}
      </div>

      <div className="w-full bg-transparent mt-8">
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
            {showAddModal && (
        <CourseForm
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCourse}
        />
      )}
    </div>
  
  );
};

export default Page;
