"use client";

import EmployeeCardItem from "./EmployeeCardItem";

interface GetPeopleLeadEmployeesResponseDto {
  employeeId: string;
  firstName: string;
  lastName: string;
  level: number;
  profilePicture: string;
  mimeType?: string;
}

interface EmployeesCardProps {
  employees: GetPeopleLeadEmployeesResponseDto[];
  handleToggleEmployee: (employeeId: string) => void;
  employeeSelected: (employeeId: string) => boolean;
}

export default function EmployeesCard({
  employees,
  handleToggleEmployee,
  employeeSelected,
}: EmployeesCardProps) {
  return (
    <div className="mt-10 bg-[#f8f6fa] dark:bg-[#311a42] p-6 rounded-xl shadow-md max-w-[970px] mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
        Mi Equipo
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Selecciona a los empleados a quienes deseas asignar el curso. Debes
        seleccionar al menos 1 empleado
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {employees.map((emp) => (
          <EmployeeCardItem
            key={emp.employeeId}
            employeeId={emp.employeeId}
            firstName={emp.firstName}
            lastName={emp.lastName}
            profilePicture={emp.profilePicture}
            mimeType={emp.mimeType}
            employeeSelected={employeeSelected}
            handleToggleEmployee={handleToggleEmployee}
          />
        ))}
      </div>
    </div>
  );
}
