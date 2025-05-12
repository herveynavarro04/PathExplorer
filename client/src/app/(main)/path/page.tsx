"use client";

import { useEffect, useState } from "react";
import GoalsForm from "./GoalsForm";
import GoalCardClient from "./GoalCardClient";
import TechInterestsCard from "./TechInterestsCard";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import Loading from "components/Loading";
import { authFetch } from "@utils/authFetch";

type Goal = {
  id: number;
  information: string;
  term: string;
  completed: boolean;
  validated: boolean;
};

type Skill = {
  skillName: string;
  skillId: string;
};

type SkillsResponse = {
  technicalSkills: Skill[];
  softSkills: Skill[];
};

type UserSkillsResponse = {
  technicalSkills: Skill[];
  softSkills: Skill[];
};

const Page = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [interestMap, setInterestMap] = useState<Map<string, [string, boolean]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = "http://localhost:8080/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skills, userSkills] = await Promise.all([
          authFetch<SkillsResponse>(`${url}/skills`, { method: "GET" }),
          authFetch<UserSkillsResponse>(`${url}/user/skills`, { method: "GET" }),
        ]);

        if (!skills || !userSkills) {
          console.error("Failed to load skills or user skills.");
          return;
        }

        const userTechInterestNames = new Set(
          userSkills.technicalSkills.map((skill) => skill.skillName)
        );

        const interestMapping = new Map<string, [string, boolean]>(
          skills.technicalSkills.map((skill) => [
            skill.skillName,
            [skill.skillId, userTechInterestNames.has(skill.skillName)],
          ])
        );

        setInterestMap(interestMapping);
      } catch (error) {
        console.error("Error fetching interests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:3000/empleado.json");
        const data = await response.json();

        const formattedGoals: Goal[] = (data.goals || []).map((g: any) => {
          const d = new Date(g.term);
          const day = d.getDate();
          let month = d.toLocaleDateString("es-MX", { month: "long" });
          month = month.charAt(0).toUpperCase() + month.slice(1);
          const year = d.getFullYear();

          return {
            id: g.id_goal,
            information: g.information,
            term: `${day} ${month} ${year}`,
            completed: g.completed,
            validated: g.validated,
          };
        });

        setGoals(formattedGoals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
    fetchData();
  }, []);

  if (loading || !interestMap) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {openForm && (
        <GoalsForm
          setOpenForm={setOpenForm}
          addGoal={(newGoal: Goal) => setGoals((prev) => [...prev, newGoal])}
        />
      )}

      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Path de Carrera" />

        <GoalCardClient goals={goals} onOpenForm={() => setOpenForm(true)} />

        <div className="mt-10">
          <TechInterestsCard interestMap={interestMap} url={url} />
        </div>
      </div>
    </>
  );
};

export default Page;
