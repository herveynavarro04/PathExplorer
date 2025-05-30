"use client";

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  position: string;
  chargeability: number;
}

interface Props {
  employees: Employee[];
  selected: string[];
  onToggle: (id: string) => void;
}

export default function EmployeesCard({ employees, selected, onToggle }: Props) {
  return (
    <div className="mt-10 bg-[#f8f6fa] dark:bg-[#311a42] p-6 rounded-xl shadow-md max-w-[970px] mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Mi Equipo</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Selecciona a los empleados a quienes deseas asignar el curso. Si no seleccionas a nadie, se asignará automáticamente a todos.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {employees.map((emp) => {
          const isSelected = selected.includes(emp.employeeId);
          return (
            <div
              key={emp.employeeId}
              onClick={() => onToggle(emp.employeeId)}
              className={`relative w-[150px] flex-shrink-0 flex flex-col items-center text-center p-4 rounded-xl cursor-pointer transition-all border shadow-sm
                ${
                  isSelected
                    ? "bg-[#d9c5e5] border-[#65417f] dark:bg-[#76598a]"
                    : "bg-white border-gray-200 dark:bg-[#3c2a4e] dark:border-transparent"
                } hover:shadow-lg hover:scale-[1.03]`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-10">
                  ✓
                </div>
              )}

              <img
                src="/profile.png"
                alt="profile"
                className="w-16 h-16 mb-3 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
              <h4 className="text-[#65417f] dark:text-white font-semibold mb-1">
                {emp.firstName} {emp.lastName}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">{emp.position}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
