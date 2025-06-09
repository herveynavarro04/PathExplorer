import { s } from "framer-motion/dist/types.d-CtuPurYT";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import { validation } from "@utils/validation";
import { authFetch } from "@utils/authFetch";

interface CourseModalProps {
  courseId: string;
  handleOnClose: () => void;
  onCourseUpdated: (courseId: string) => void;
}

interface GetCourseInfoDto {
  title: string;
  duration: string;
  information: string;
  status: boolean;
  url: string;
  mandatory: boolean;
  createdAt: string;
}

const CourseModal = ({
  courseId,
  handleOnClose,
  onCourseUpdated,
}: CourseModalProps) => {
  const [course, setCourse] = useState<GetCourseInfoDto>(null);
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;
  const [loading, setloading] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState(false);

  if (!courseId) return null;

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        closeAnimation();
      }
    };

    const closeAnimation = () => {
      setIsVisible(false);
      setTimeout(() => {
        handleOnClose();
      }, 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [courseId]);

  useEffect(() => {
    const LoadData = async () => {
      const res = validation();
      if (!res) {
        router.push("/login");
        return;
      }

      console.log(`We are logging ${courseId}`);
      try {
        const response = await authFetch<GetCourseInfoDto>(
          `${url}/courses/PeopleLead/${courseId}`
        );
        if (!response) {
          router.push("/login");
          return;
        }

        setCourse(response);
        setloading(false);

        console.log(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    LoadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    console.log(courseId);
  }, [courseId]);
  if (!course) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 pb-4 max-w-3xl w-full relative shadow-xl transition-all duration-300 ease-in-out ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <button
          onClick={handleOnClose}
          className="absolute top-4 right-4 text-lg font-bold bg-[#e0cfe6] hover:bg-[#d1c0db] text-[#4B0082] rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b border-[#d7bff1] pb-2">
          {course.title}
        </h2>

        <p className="mb-6 text-[#4b3b61] leading-relaxed">
          {course.information}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
          <div className="space-y-2 text-sm w-full md:w-1/2">
            <p>
              <strong>Duración:</strong> {course.duration} horas
            </p>
            <p>
              <strong>URL:</strong>{" "}
              <a
                href={course.url}
                className="hover:underline text-purple-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {course.url}
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full md:w-auto">
            <div className=" rounded-full bg-[#e8d8fa] text-[#4b3b61] px-3 py-1 text-sm font-medium shadow-sm">
              <strong>Curso asignado el:</strong>{" "}
              {formatearFecha(course.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default CourseModal;
