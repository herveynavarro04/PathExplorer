"use client";
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import CourseModal from "./components/CourseModal";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import CourseForm from "./components/CourseForm";
import { validation } from "@utils/validation";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";

interface GetCoursePreviewDto {
  courseId: string;
  title: string;
  information: string;
  mandatory: boolean;
}

interface GetEmployeeCoursesDto {
  courses: GetCoursePreviewDto[];
}

const Page = () => {
  const [courses, setCourses] = useState<GetCoursePreviewDto[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<boolean>(true);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;
  const [loading, setLoading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState(false);

  const coursesPerPage = 6;

  const filteredCourses = courses.filter((course) => {
    if (filter === true) return course.mandatory === true;
    else return course.mandatory === false;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleCourseUpdated = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseId === courseId ? { ...course, status: true } : course
      )
    );
  };

  useEffect(() => {
    const laodCourses = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }
      try {
        const response = await authFetch<GetEmployeeCoursesDto>(
          `${url}/courses/people-lead`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        console.log(response);
        setCourses(response.courses);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 25);
      } catch (error) {
        console.error("Failed fetching courses", error);
      }
    };
    laodCourses();
  }, []);

  if (loading || !courses) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {" "}
        <div className="flex justify-between">
          <div className="flex">
            <div className="pt-5">
              <Breadcrumb pageName="Mis Cursos" />
            </div>
          </div>

          <select
            className="px-3 rounded dark:text-gray-2 text-sm h-[2rem] bg-[#e8deef] dark:bg-[#513d63] self-center"
            value={String(filter)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value === "true")
            }
          >
            <option value={"true"}>Cursos Mandatorios</option>
            <option value={"false"}>Cursos Opcionales</option>
          </select>
        </div>
        <div className="flex flex-col min-h-[34rem]">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.courseId}
                courseId={course.courseId}
                title={course.title}
                mandatory={course.mandatory}
                information={course.information}
                handleCourseClick={handleCourseClick}
              />
            ))}
          </div>

          {selectedCourse && (
            <CourseModal
              courseId={selectedCourse}
              handleOnClose={() => setSelectedCourse(null)}
              onCourseUpdated={handleCourseUpdated}
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
        {showAddModal && <CourseForm onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  );
};

export default Page;
