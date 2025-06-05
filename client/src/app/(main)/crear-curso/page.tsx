"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EmployeesCard from "./_components/EmployeesCard";
import CourseForm from "./_components/CourseForm";
import { useRouter } from "next/navigation";
import { validation } from "@utils/validation";
import { authFetch } from "@utils/authFetch";

interface GetPeopleLeadEmployeesResponseDto {
  employeeId: string;
  firstName: string;
  lastName: string;
  level: number;
  profilePicture: string;
  mimeType?: string;
}

interface PostCourseRequestDto {
  title: string;
  duration: string;
  information: string;
  url: string;
  mandatory: boolean;
}

export default function RegistrarCurso() {
  const [title, setTitle] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [urlCourse, setUrlCourse] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [mandatory, setMandatory] = useState<boolean>(false);
  const [employees, setEmployees] = useState<
    GetPeopleLeadEmployeesResponseDto[]
  >([]);
  const [showEmployees, setShowEmployees] = useState<boolean>(false);
  const [addEmployees, setAddEmployees] = useState<string[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();

  const url = `http://localhost:8080/api`;

  const onClose = () => {
    setAddEmployees([]);
    setShowEmployees(false);
    setTitle("");
    setInformation("");
    setDuration(0);
    setMandatory(false);
    setUrlCourse("");
  };

  const resetWithFade = () => {
    setFadeIn(false);
    setTimeout(() => {
      onClose();
      setFadeIn(true);
    }, 600); // tiempo igual a duración del fade
  };

  const handleToggleEmployee = (employeeId: string) => {
    setAddEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((empId) => empId !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async (postRequest: PostCourseRequestDto) => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    const postRequestUpdated = {
      ...postRequest,
      employeesAssigned: addEmployees,
    };
    try {
      const response = await authFetch(`${url}/courses`, {
        method: "POST",
        body: JSON.stringify(postRequestUpdated),
      });
      console.log(response);
      resetWithFade(); // Fade-out y reset después del POST
    } catch (error) {
      console.error("Error posting courses", error);
    }
  };

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }
    const loadEmployees = async () => {
      try {
        const response = await authFetch<GetPeopleLeadEmployeesResponseDto[]>(
          `${url}/people-lead/employees`
        );
        if (!response) {
          router.push("/login");
          return;
        }
        setEmployees(response);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 25);
    return () => clearTimeout(timeout);
  }, []);

  const employeeSelected = (employeeId: string) =>
    addEmployees.includes(employeeId);

  return (
    <div>
      <div
        className={`transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-full mx-auto w-full px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-lg text-[#65417f] hover:font-semibold mb-4"
          >
            ← Regresar
          </button>
        </div>

        <CourseForm
          handleSubmit={handleSubmit}
          showEmployees={showEmployees}
          setShowEmployees={setShowEmployees}
          addEmployees={addEmployees}
          title={title}
          setTitle={setTitle}
          information={information}
          setInformation={setInformation}
          urlCourse={urlCourse}
          setUrlCourse={setUrlCourse}
          mandatory={mandatory}
          setMandatory={setMandatory}
          duration={duration}
          setDuration={setDuration}
          resetWithFade={resetWithFade}
        />

        {showEmployees && (
          <motion.div
            key="employeesCard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EmployeesCard
              employees={employees}
              handleToggleEmployee={handleToggleEmployee}
              employeeSelected={employeeSelected}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
