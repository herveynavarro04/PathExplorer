"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "./_components/personal-info";
import TechSkillsCard from "./TechSkillsCard";
import SoftSkillsCard from "./SoftSkillsCard";
import { authFetch } from "@utils/authFetch";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import LoadingPage from "components/LoadingPage";

type ProfileData = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  url_pic: string;
  position: string;
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

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [techSkillMap, setTechSkillMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const [softSkillMap, setSoftSkillMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const url = "http://localhost:8080/api";

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const [userData, skills, userSkills] = await Promise.all([
          authFetch<ProfileData>(`${url}/user`),
          authFetch<SkillsResponse>(`${url}/skills`),
          authFetch<UserSkillsResponse>(`${url}/user/skills`),
        ]);

        if (!userData || !skills || !userSkills) {
          router.push("/login");
          return;
        }

        setProfile({
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password,
          email: userData.email,
          url_pic: "/profile.png",
          position: userData.position || "Front-end Developer",
        });

        const userTechSkillNames = new Set(
          userSkills.technicalSkills.map((s) => s.skillName)
        );
        const techSkillMap = new Map<string, [string, boolean]>(
          skills.technicalSkills.map((skill) => [
            skill.skillName,
            [skill.skillId, userTechSkillNames.has(skill.skillName)],
          ])
        );

        const userSoftSkillNames = new Set(
          userSkills.softSkills.map((s) => s.skillName)
        );
        const softSkillMap = new Map<string, [string, boolean]>(
          skills.softSkills.map((skill) => [
            skill.skillName,
            [skill.skillId, userSoftSkillNames.has(skill.skillName)],
          ])
        );

        setTechSkillMap(techSkillMap);
        setSoftSkillMap(softSkillMap);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        router.push("/login");
      }
    };

    loadData();
  }, []);

  return (
    <LoadingPage loading={loading}>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Perfil" />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
          <PersonalInfoForm userData={profile} />
          <div className="max-h-auto flex flex-col gap-5">
            <TechSkillsCard techSkillMap={techSkillMap} url={url} />
            <SoftSkillsCard softSkillMap={softSkillMap} url={url} />
          </div>
        </div>
      </div>
    </LoadingPage>
  );
};

export default Page;
