"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import ApplicantTable from "./ApplicantTable";

export default function AdminTables() {
  const [selectedTab, setSelectedTab] = useState<
    "Empleados" | "Aplicantes a People Lead"
  >("Empleados");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 25);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full max-w-[75rem] mx-auto transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex space-x-2 overflow-hidden">
        <button
          className={`px-4 py-2 ml-3 font-semibold transition-all rounded-tr-xl rounded-tl-xl text-sm md:text-base w-34 ${
            selectedTab === "Empleados"
              ? "bg-white text-black dark:bg-[#ece5f1]"
              : "bg-[#d0bfdb] text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setSelectedTab("Empleados")}
        >
          Empleados
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-all rounded-tr-xl rounded-tl-xl  text-sm md:text-base w-38 ${
            selectedTab === "Aplicantes a People Lead"
              ? "bg-white text-black dark:bg-[#ece5f1]"
              : "bg-[#d0bfdb] text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setSelectedTab("Aplicantes a People Lead")}
        >
          Aplicantes a People Lead
        </button>
      </div>

      <div className="bg-white dark:bg-[#311a42] p-6 rounded-xl shadow-sm min-h-[30rem]">
        {selectedTab === "Empleados" ? <EmployeeTable /> : <ApplicantTable />}
      </div>
    </div>
  );
}
