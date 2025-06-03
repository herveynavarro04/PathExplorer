"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authFetch } from "@utils/authFetch";
import { useSelectedEmployee } from "context/SelectedEmployeeContext";

interface Member {
  firstName: string;
  lastName: string;
  email: string;
  level: number;
  profilePicture?: string;
  mimeType?: string;
}

interface Feedback {
  reviserFirstName: string;
  reviserLastName: string;
  createdAt: string;
  information: string;
}

export default function MemberProfileCard({ member }: { member: Member }) {
  const { firstName, lastName, email, level, profilePicture, mimeType } =
    member;
  const { selectedEmployeeId } = useSelectedEmployee();

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    if (!showFeedback || !selectedEmployeeId) return;

    const fetchFeedback = async () => {
      setLoadingFeedback(true);
      try {
        const res = await authFetch<Feedback[]>(
          `http://localhost:8080/api/feedback/${selectedEmployeeId}`
        );
        if (res) {
          const sorted = res.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setFeedbackList(sorted);
        }
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoadingFeedback(false);
      }
    };

    fetchFeedback();
  }, [showFeedback, selectedEmployeeId]);

  return (
    <div className="rounded-xl bg-[#f8f6fa] dark:bg-[#412859] p-6 max-h-[47rem] flex flex-col">
      {!showFeedback ? (
        <>
          <h2 className="font-semibold text-lg text-[#65417f] mb-4">
            Información Personal
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="w-30 h-30 lg:w-60 lg:h-60 rounded-full overflow-hidden">
              <Image
                src={
                  profilePicture && mimeType
                    ? `data:${mimeType};base64,${profilePicture}`
                    : "/profile.png"
                }
                alt="Foto de perfil"
                width={180}
                height={180}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Nombre</label>
              <div className="bg-gray-200 dark:bg-[#503866] px-3 py-2 rounded-md">
                {firstName} {lastName}
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium block mb-1">
                Correo electrónico
              </label>
              <div className="bg-gray-200 dark:bg-[#503866] px-3 py-2 rounded-md">
                {email}
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium block mb-1">Nivel</label>
              <div className="bg-gray-200 dark:bg-[#503866] px-3 py-2 rounded-md">
                {level}
              </div>
            </div>

            <button
              onClick={() => setShowFeedback(true)}
              className="mt-8 w-full px-4 py-2 text-sm font-semibold bg-[#65417f] text-white rounded-lg hover:bg-opacity-90"
            >
              Ver Feedback
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-semibold text-lg text-[#65417f] mb-4 shrink-0">
            Opiniones Pasadas
          </h2>

          <div className="overflow-y-auto flex-1 pr-2 space-y-3 max-h-[36rem]">
            {loadingFeedback ? (
              <p className="text-sm text-center text-gray-500 dark:text-gray-300">
                Cargando feedback...
              </p>
            ) : feedbackList.length === 0 ? (
              <p className="text-sm text-center text-gray-500 dark:text-gray-300">
                No hay retroalimentaciones registradas.
              </p>
            ) : (
              feedbackList.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 dark:bg-[#503866] rounded-md p-3"
                >
                  <p className="text-sm font-medium mb-1 text-black dark:text-white">
                    {f.reviserFirstName} {f.reviserLastName}
                  </p>
                  <span className="text-xs text-gray-600 dark:text-gray-300 mb-2 block">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </span>
                  <p className="text-sm text-black dark:text-white">
                    {f.information}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 shrink-0">
            <button
              onClick={() => setShowFeedback(false)}
              className="w-full px-4 py-2 text-sm font-semibold bg-[#65417f] text-white rounded-lg hover:bg-opacity-90"
            >
              Volver a Información Personal
            </button>
          </div>
        </>
      )}
    </div>
  );
}
