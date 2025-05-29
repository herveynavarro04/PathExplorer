"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@utils/authFetch";
import { validation } from "@utils/validation";
import Select from "react-select";
import { useTheme } from "next-themes";
import { EmployeesTable } from "./_components/TableEmployeeRegister";
import { Toaster, toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";

registerLocale("es", es);

interface PostProjectResponseDto {
  projectId: string;
}

interface TechDto {
  technologyId: string;
  technologyName: string;
}

interface GetProjectsTechResponseDto {
  ProjectsTechs: TechDto[];
}

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

export default function RegisterProjectPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const url = "http://localhost:8080/api";

  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [projectType, setProjectType] = useState("");
  const [client, setClient] = useState("");
  const [information, setInformation] = useState("");
  const [limitEmployees, setLimitEmployees] = useState(0);
  const [projectTechs, setProjectTechs] = useState<string[]>([]);
  const [allTechs, setAllTechs] = useState<TechDto[]>([]);
  const [projectEmployees, setProjectEmployees] = useState<(string | null)[]>(
    []
  );
  const [selectingIndex, setSelectingIndex] = useState<number | null>(null);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [employees, setEmployees] = useState<GetEmployeesResponseDto[]>([]);
  const [fadeIn, setFadeIn] = useState(false);

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
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    const res = validation();
    if (!res) return router.push("/login");

    const fetchTechs = async () => {
      try {
        const response = await authFetch<GetProjectsTechResponseDto>(
          `${url}/projects/techs`
        );
        if (response) {
          setAllTechs(response.ProjectsTechs);
        }
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchTechs();
  }, []);

  const techOptions = allTechs.map((tech) => ({
    value: tech.technologyId,
    label: tech.technologyName,
  }));

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderColor: state.isFocused ? "#65417f" : "transparent",
      boxShadow: state.isFocused ? "0 0 0 1px #65417f" : "none",
      borderWidth: "1px",
      fontSize: "0.875rem",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#a896b3" : "#e8deef",
      borderRadius: "0.5rem",
      zIndex: 10,
    }),
    menuList: (base: any) => ({
      ...base,
      maxHeight: "300px",
      overflowY: "auto",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#877691"
          : "#d6c8df"
        : "transparent",
      color: theme === "dark" ? "#1f1b2e" : "#111827",
      fontSize: "0.875rem",
      padding: "0.5rem 0.75rem",
    }),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🧪 Form submitted");

    const isValid = validation();
    if (!isValid) return router.push("/login");

    console.log("✅ Validation passed");

    const payload = {
      projectName,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      projectType,
      client,
      information,
      limitEmployees: Number(limitEmployees),
      projectTechs,
      projectEmployees: projectEmployees.filter(Boolean),
    };

    console.log("📦 Payload being sent:", payload);

    try {
      const response = await authFetch<PostProjectResponseDto>(
        `${url}/projects`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!response) {
        console.error("❌ No valid response");
        alert("No se pudo registrar el proyecto.");
        return;
      }

      console.log("✅ Proyecto creado con éxito:", response);
      toast.success("Proyecto registrado correctamente", {
        className: "toast-success",
      });

      setTimeout(() => {
        router.push("/Project-Manager");
      }, 1500);
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      alert("Ocurrió un error al registrar el proyecto.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 50);
  }, []);

  return (
    <>
      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[75rem] mx-auto p-6 bg-white dark:bg-[#2b1e3b] rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Registrar Proyecto
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del Proyecto"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Tipo de Proyecto"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />

            <input
              type="text"
              placeholder="Cliente"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />

            <textarea
              placeholder="Información del proyecto (max.100 caracteres)"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
              maxLength={100}
            />

            <div className="flex gap-5">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha de inicio"
                className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
                locale="es"
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Fecha de finalización"
                className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
                locale="es"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Empleados del Proyecto
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Selecciona el número de empleados que participarán en este
                proyecto.
              </p>
            </div>

            <input
              type="number"
              min={0}
              placeholder="Límite de Empleados"
              value={limitEmployees}
              onChange={(e) => {
                const value = Number(e.target.value);

                const safeValue = isNaN(value) || value < 0 ? 0 : value;

                setLimitEmployees(safeValue);

                const updated = [...projectEmployees];
                updated.length = safeValue;
                for (let i = 0; i < safeValue; i++) {
                  if (updated[i] === undefined) updated[i] = null;
                }
                setProjectEmployees(updated);
              }}
              className="w-full p-3 border rounded-md bg-[#f3edf7] dark:bg-[#4b2e67] text-gray-900 dark:text-white"
              required
            />
            {limitEmployees > 0 && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Asignar empleados es opcional. Puedes dejar el proyecto abierto
                para que los aplicantes se postulen.
              </p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              {projectEmployees.map((empId, index) => {
                const employee = employees.find((e) => e.employeeId === empId);

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-[#ece5f1] dark:bg-[#4b2e67] px-3 py-2 rounded-md border border-gray-400"
                  >
                    {empId && employee ? (
                      <>
                        <span className="text-sm text-gray-800 dark:text-white">
                          {employee.firstName} {employee.lastName}
                        </span>
                        <button
                          onClick={() => {
                            const updated = [...projectEmployees];
                            updated[index] = null;
                            setProjectEmployees(updated);
                          }}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Eliminar"
                        >
                          ✖
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectingIndex(index);
                          setEmployeeModalOpen(true);
                        }}
                        className="w-32 h-10 flex items-center justify-center text-sm rounded-md active:border-violet-800"
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {employeeModalOpen && (
              <div className="mt-10">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setEmployeeModalOpen(false)}
                    className="text-sm text-[#65417f] underline hover:text-[#5a366e]"
                  >
                    Cerrar selección
                  </button>
                </div>
                <EmployeesTable
                  employees={employees}
                  selectedEmployeeIds={
                    projectEmployees.filter(Boolean) as string[]
                  }
                  onEmployeeSelect={(employeeId: string) => {
                    if (selectingIndex !== null) {
                      if (projectEmployees.includes(employeeId)) {
                        toast.error("Este empleado ya ha sido asignado.");
                        return;
                      }

                      const updated = [...projectEmployees];
                      updated[selectingIndex] = employeeId;
                      setProjectEmployees(updated);
                      setEmployeeModalOpen(false);
                      setSelectingIndex(null);
                    }
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                Tecnologías del Proyecto
              </label>
              <Select
                isMulti
                options={techOptions}
                styles={customStyles}
                onChange={(selected) =>
                  setProjectTechs(selected.map((s) => s.value))
                }
                placeholder="Selecciona tecnologías"
                menuPlacement="top"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#65417f] text-white rounded-md hover:bg-[#5a366e] text-sm font-semibold"
            >
              Registrar Proyecto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
