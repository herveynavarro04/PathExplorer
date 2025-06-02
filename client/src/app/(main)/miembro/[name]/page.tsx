"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEquipo } from "../../people-lead/components/fetch-equipo"; // ajusta esta ruta si es necesario
import MemberCard from "../components/MemberCard";


export default function MemberPage() {
  const params = useParams();
  const name = params?.name as string;
  const [member, setMember] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      const equipo = await getEquipo();
      const found = equipo.find((m) => m.name === decodeURIComponent(name));
      setMember(found || null);
    }
    if (name) loadData();
  }, [name]);

  if (!member) {
    return (
      <div className="p-10 text-gray-600 dark:text-white">
        Empleado no encontrado
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen">
      <MemberCard member={member} />
    </div>
  );
}
