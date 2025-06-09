"use client";

import { useState, useRef, useEffect } from "react";
import ModalFeedback from "./modal-feedback";
import TeamCard from "./TeamCard";
import InformationCard from "./InformationCard";
import ProgressCard from "./ProgressCard";
import DatesCard from "./DatesCard";
import ClientCard from "./ClientCard";
import TechStackCard from "./TechStackCard";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";
import { validation } from "@utils/validation";

interface TechDto {
  technologyId: string;
  technologyName: string;
}

interface GetEmployeesByProjectResponseDto {
  profilePic: string;
  position: string;
  employeeName: string;
  employeeId: string;
  chargeability: number;
}

interface DisplayViewerProps {
  projectId: string;
  startDate: Date | null;
  setStartDate: (date: Date) => void;
  endDate: Date | null;
  setEndDate: (date: Date) => void;
  client: string;
  setClient: (value: string) => void;
  information: string;
  setInformation: (value: string) => void;
  progress: number;
  setProgress: (value: number) => void;
  technologies: TechDto[];
  techs: TechDto[];
  employees: GetEmployeesByProjectResponseDto[];
  setTriggerProjectsRefresh: (triggerProjectsRefresh: boolean) => void;
  setTriggerEmployeesRefresh: (triggerEmployeesRefresh: boolean) => void;

  editable: boolean;
}
export default function DisplayViewer({
  projectId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  client,
  setClient,
  information,
  setInformation,
  progress,
  setProgress,
  technologies,
  techs,
  employees,
  setTriggerProjectsRefresh,
  setTriggerEmployeesRefresh,
  editable,
}: DisplayViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [selectedEmployeeName, setSelectedEmployeeName] =
    useState<string>(null);
  const originalValuesRef = useRef<Map<string, any>>(new Map());
  const router = useRouter();
  const url = "http://localhost:8080/api";

  const onFeedbackClick = (employeeId: string, employeeName: string) => {
    setSelectedEmployeeId(employeeId);
    setSelectedEmployeeName(employeeName);
    setIsModalOpen(true);
  };

  const onClose = () => setIsModalOpen(false);

  const patchData = async (updatedFields: Record<string, any>) => {
    const res = validation();
    if (!res) {
      router.push("/login");
      return;
    }

    const payload: Record<string, any> = {};

    for (const [key, value] of Object.entries(updatedFields)) {
      const originalValue = originalValuesRef.current.get(key);

      const normalizedOriginal =
        (key === "startDate" || key === "endDate") && originalValue
          ? originalValue.toISOString().split("T")[0]
          : originalValue;

      const normalizedCurrent =
        (key === "startDate" || key === "endDate") && value
          ? value.toISOString().split("T")[0]
          : value;

      if (normalizedCurrent !== normalizedOriginal) {
        payload[key] = value;
      }
    }

    if (Object.keys(payload).length === 0) {
      console.log("No se detectaron cambios.");
      return;
    }

    try {
      const response = await authFetch(`${url}/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      if (!response) {
        router.push("/router");
        return;
      }

      console.log("PATCH exitoso", payload);

      for (const key of Object.keys(payload)) {
        originalValuesRef.current.set(key, updatedFields[key]);
      }
      setTriggerProjectsRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error al hacer PATCH:", error);
    }
  };

  useEffect(() => {
    if (!startDate || !endDate || !client || !information || !progress) return;
    const map = new Map<string, any>();
    map.set("startDate", startDate);
    map.set("endDate", endDate);
    map.set("client", client);
    map.set("progress", progress);
    map.set("information", information);
    originalValuesRef.current = map;
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex flex-col gap-8">
          <DatesCard
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            editable={editable}
            patchData={patchData}
          />

          <ClientCard
            client={client}
            setClient={setClient}
            patchData={patchData}
            editable={editable}
          />
        </div>

        <InformationCard
          information={information}
          setInformation={setInformation}
          patchData={patchData}
          editable={editable}
        />

        <TechStackCard
          stack={technologies}
          techs={techs}
          projectId={projectId}
          editable={editable}
          setTriggerProjectsRefresh={setTriggerProjectsRefresh}
        />

        <div className="col-span-2 rounded-xl shadow">
          <TeamCard
            projectId={projectId}
            employees={employees}
            onFeedbackClick={onFeedbackClick}
            editable={editable}
            setTriggerEmployeesRefresh={setTriggerEmployeesRefresh}
          />
        </div>

        <ProgressCard
          progress={progress}
          setProgress={setProgress}
          patchData={patchData}
          editable={editable}
        />
      </div>
      {isModalOpen && (
        <ModalFeedback
          onClose={onClose}
          selectedEmployeeId={selectedEmployeeId}
          selectedEmployeeName={selectedEmployeeName}
        />
      )}
    </div>
  );
}
