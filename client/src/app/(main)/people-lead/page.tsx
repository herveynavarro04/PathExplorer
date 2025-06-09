"use client";

import { useEffect, useState } from "react";
import { OverviewCardsGroup } from "./components/overview-cards";
import LoadingPage from "components/LoadingPage";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import PeopleTeamCard from "./components/PeopleTeamCard";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

interface GetPeopleLeadEmployeesResponseDto {
  employeeId: string;
  firstName: string;
  lastName: string;
  level: string;
  profilePicture: Buffer | string;
  mimeType?: string;
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [employees, setEmployees] = useState<
    GetPeopleLeadEmployeesResponseDto[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string[]>([]);
  const url = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
        setLoading(false);
        setTimeout(() => setFadeIn(true), 25);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  const handleToggleEmployee = (id: string) => {
    setSelectedEmployee((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  if (loading || !employees) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[75rem] h-full transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid gap-8 md:gap-15 2xl:gap-7.5">
          <div className="flex justify-between">
            <div className="pt-5">
              <Breadcrumb pageName="Dashboard" />
            </div>
          </div>
          <OverviewCardsGroup />
        </div>
        <div className="mt-7 grid grid-cols-12 gap-4 md:mt-14 md:gap-6 2xl:mt-10 2xl:gap-7.5">
          <div className="col-span-12 grid">
            {employees.length > 0 ? (
              <PeopleTeamCard employees={employees} />
            ) : (
              <p className="text-center text-gray-500">
                No hay empleados disponibles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
