"use client";

import { useEffect, useState } from "react";
import GoalsForm from "./GoalsForm";
import GoalCardClient from "./GoalCardClient";
import TechInterestsCard from "./TechInterestsCard";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import LoadingPage from "components/LoadingPage";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

interface GetGoalResponseDto {
  information: string;
  term: string;
  completed: boolean;
  status: string;
}

interface GoalsResponseDto {
  goals: GetGoalResponseDto[];
}

interface Skill {
  skillName: string;
  skillId: string;
}

interface SkillsResponse {
  technicalSkills: Skill[];
  softSkills: Skill[];
}

interface UserInterests {
  technicalSkills: Skill[];
}

const Page = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [goals, setGoals] = useState<GetGoalResponseDto[]>([]);
  const [skills, setSkills] = useState<SkillsResponse>(null);
  const [userInterests, setUserInterests] = useState<UserInterests>(null);
  const [refreshGoals, setRefreshGoals] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const LoadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await authFetch<GoalsResponseDto>(`${url}/goals`);
        if (!response) {
          router.push("/login");
          return;
        }

        const formattedGoals: GetGoalResponseDto[] = (
          response?.goals || []
        ).map((g) => {
          const d = new Date(g.term);
          const day = d.getDate();
          let month = d.toLocaleDateString("es-MX", { month: "long" });
          month = month.charAt(0).toUpperCase() + month.slice(1);
          const year = d.getFullYear();

          return {
            information: g.information,
            term: `${day} ${month} ${year}`,
            completed: g.completed,
            status: g.status,
          };
        });

        setGoals(formattedGoals);
        setLoadingGoals(false);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    LoadData();
  }, [refreshGoals]);

  useEffect(() => {
    const fetchInterests = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const [skills, userInterests] = await Promise.all([
          authFetch<SkillsResponse>(`${url}/skills`),
          authFetch<UserInterests>(`${url}/skills/employee/interests`),
        ]);

        if (!skills || !userInterests) {
          console.error("Failed to load skills or user skills.");
          return;
        }

        setSkills(skills);
        setUserInterests(userInterests);
        setLoadingInterests(false);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    if (!loadingGoals && !loadingInterests) {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 25);
    }
  }, [loadingGoals, loadingInterests]);

  if (loading || !goals || !userInterests) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <>
      {openForm && (
        <GoalsForm
          setOpenForm={setOpenForm}
          setRefreshGoals={setRefreshGoals}
        />
      )}

      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-500 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <Breadcrumb pageName="Path de Carrera" />

        <GoalCardClient goals={goals} setOpenForm={setOpenForm} />

        <div className="mt-10">
          <TechInterestsCard
            skills={skills}
            userInterests={userInterests}
            url={url}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
