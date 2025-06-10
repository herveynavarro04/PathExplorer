"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MemberProfileCard from "./components/MemberProfileCard";
import CertificatesCard from "./components/certificates-card";
import GoalsCard from "./components/goals-card";
import { authFetch } from "@utils/authFetch";
import { useSelectedEmployee } from "context/SelectedEmployeeContext";

export default function MemberPage() {
  const router = useRouter();
  const { selectedEmployeeId } = useSelectedEmployee();
  const [member, setMember] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const loadData = async () => {
      if (!selectedEmployeeId) {
        router.push("/people-lead");
        return;
      }

      try {
        const res = await authFetch<any>(
          `${url}/employee/${selectedEmployeeId}`
        );

        console.log("📦 Response de empleado:", res);
        if (!res) {
          console.error("No employee data found or not authenticated.");
          router.push("/login");
          return;
        }
        setMember(res);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 35);
      } catch (err) {
        console.error("Error loading employee data:", err);
      }
    };

    loadData();
  }, [selectedEmployeeId, router]);

  if (loading || !member)
    return <div className="min-h-screen bg-[#d0bfdb] dark:bg-[#1b0e23]" />;

  return (
    <div>
      <div
        className={`mx-auto w-full max-w-[75rem] h-full transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MemberProfileCard member={member} />
          <div className="col-span-2 space-y-6">
            <CertificatesCard employeeId={member.employeeId} />
            <GoalsCard employeeId={member.employeeId} />
          </div>
        </div>
      </div>
    </div>
  );
}
