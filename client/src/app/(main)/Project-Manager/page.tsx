"use client";

import { useEffect, useState } from "react";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { TopAnalysis } from "components/AnalisisEmpleados/TableEmployee";
import { ButtonCardGroup } from "./_components/register";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";

interface GetEmployeesResponseDto {
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  chargeability: number;
  position: string;
  skillCount: number;
  interestCount: number;
}

interface GetManagerEmployeesResponseDto {
  employees: GetEmployeesResponseDto[];
}

export default function Home() {
  const [employees, setEmployees] = useState<GetEmployeesResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();
  const url = "http://localhost:8080/api";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    const loadEmployees = async () => {
      try {
        const response = await authFetch<GetManagerEmployeesResponseDto>(
          `${url}/employee/manager/employees`
        );

        if (!response) {
          router.push("/login");
          return;
        }

        setEmployees(response.employees);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 25);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    loadEmployees();
  }, []);

  if (loading || !employees) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[75rem] h-full transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className=" grid gap-8 md:gap-15 2xl:gap-7.5 ">
          <div className="flex justify-between">
            <div className="pt-5">
              <Breadcrumb pageName="Project Manager Dashboard" />
            </div>
          </div>
          <OverviewCardsGroup />
        </div>
        <div className="mt-7 grid grid-cols-12 gap-4 md:mt-14 md:gap-6 2xl:mt-10 2xl:gap-7.5">
          <div className="col-span-12 grid">
            <TopAnalysis employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
