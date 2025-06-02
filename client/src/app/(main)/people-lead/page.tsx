"use client";

import { useEffect, useState } from "react";
import { OverviewCardsGroup } from "./components/overview-cards";
import LoadingPage from "components/LoadingPage";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import PeopleTeamCard from "./components/PeopleLeadTeamCard";

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  position: string;
  chargeability: number;
  email: string;
  skillCount: number;
  interestCount: number;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dummyData: Employee[] = [
      {
        employeeId: "1",
        email: "luis.perez@example.com",
        firstName: "Luis",
        lastName: "Pérez",
        chargeability: 95,
        position: "Diseñador UI",
        skillCount: 3,
        interestCount: 2,
      },
      {
        employeeId: "2",
        email: "paula.ortiz@example.com",
        firstName: "Paula",
        lastName: "Ortíz",
        chargeability: 92,
        position: "Diseñadora UX",
        skillCount: 4,
        interestCount: 3,
      },
      {
        employeeId: "3",
        email: "carlos.mendez@example.com",
        firstName: "Carlos",
        lastName: "Méndez",
        chargeability: 88,
        position: "Full Stack Developer",
        skillCount: 5,
        interestCount: 4,
      },
      {
        employeeId: "4",
        email: "sofia.lopez@example.com",
        firstName: "Sofía",
        lastName: "López",
        chargeability: 91,
        position: "Backend Developer",
        skillCount: 4,
        interestCount: 2,
      },
      {
        employeeId: "5",
        email: "marco.ramirez@example.com",
        firstName: "Marco",
        lastName: "Ramírez",
        chargeability: 87,
        position: "Product Manager",
        skillCount: 6,
        interestCount: 5,
      },
    ];
    setEmployees(dummyData);
  }, []);

  const handleToggleEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[75rem] h-full transition-opacity duration-500 ${
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
            <PeopleTeamCard
              employees={employees}
 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
