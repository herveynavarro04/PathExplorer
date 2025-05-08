"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "./_components/personal-info";
import TechSkillsCard from "./TechSkillsCard";
import SoftSkillsCard from "./SoftSkillsCard";
import { authFetch } from "@utils/authFetch";
import Loading from "components/Loading";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

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

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [techSkillMap, setTechSkillMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const [softSkillMap, setSoftSkillMap] = useState<Map<
    string,
    [string, boolean]
  > | null>(null);
  const url = `http://localhost:8080/api`;

  useEffect(() => {
    const loadData = async () => {
      const userData = await authFetch<ProfileData>(`${url}/user`, {
        method: "GET",
      });

      const skills = await authFetch<SkillsResponse>(`${url}/skills`, {
        method: "GET",
      });

      console.log("These are all the skills");
      console.log(skills);

      const userSkills = await authFetch<UserSkillsResponse>(
        `${url}/user/skills`,
        {
          method: "GET",
        }
      );

      console.log("These are the user skills");
      console.log(userSkills);

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
        userSkills.technicalSkills.map((skill) => skill.skillName)
      );

      const skillTechMapping = new Map<string, [string, boolean]>(
        skills.technicalSkills.map((skill) => [
          skill.skillName,
          [skill.skillId, userTechSkillNames.has(skill.skillName)],
        ])
      );

      const userSoftkillNames = new Set(
        userSkills.softSkills.map((skill) => skill.skillName)
      );

      const skillSoftMapping = new Map<string, [string, boolean]>(
        skills.softSkills.map((skill) => [
          skill.skillName,
          [skill.skillId, userSoftkillNames.has(skill.skillName)],
        ])
      );

      setTechSkillMap(skillTechMapping);
      setSoftSkillMap(skillSoftMapping);
      setLoading(false);
    };

    loadData();
  }, [router, url]);

  if (loading || !techSkillMap) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Perfil" />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
        <PersonalInfoForm userData={profile} />
        <div className="max-h-auto flex flex-col gap-5 ">
          <TechSkillsCard techSkillMap={techSkillMap} url={url} />
          <SoftSkillsCard softSkillMap={softSkillMap} url={url} />
        </div>
      </div>
    </div>
  );
};

export default Page;
