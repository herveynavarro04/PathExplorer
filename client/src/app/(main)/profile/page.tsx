"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "./_components/personal-info";
import TechSkillsCard from "./TechSkillsCard";
import SoftSkillsCard from "./SoftSkillsCard";
import { authFetch } from "@utils/authFetch";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import LoadingPage from "components/LoadingPage";
import ChargeabilityCard from "./ChargeabilityCard";

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
  const [skills, setSkills] = useState<SkillsResponse>(null);
  const [userSkills, setUserSKills] = useState<UserSkillsResponse>(null);

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
          authFetch<ProfileData>(`${url}/employee`),
          authFetch<SkillsResponse>(`${url}/skills`),
          authFetch<UserSkillsResponse>(`${url}/skills/employee`),
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

        setSkills(skills);
        setUserSKills(userSkills);

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
            <ChargeabilityCard />
            <TechSkillsCard skills={skills} userSkills={userSkills} url={url} />
            <SoftSkillsCard skills={skills} userSkills={userSkills} url={url} />
          </div>
        </div>
      </div>
    </LoadingPage>
  );
};

export default Page;
