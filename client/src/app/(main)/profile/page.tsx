"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "./_components/personal-info";
// import ChargeabilityCard from "/ChargeabilityCard";
import TechSkillsCard from "./TechSkillsCard";
// import SoftSkillsCardClient from "./SoftSkillsCardClient";
import { authFetch } from "@utils/authFetch";
import Loading from "components/Loading";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

type ProfileData = {
  nombre: string;
  password: string;
  correo: string;
  url_foto: string;
  puesto: string;
};

type Skill = {
  skillName: string;
  skillId: number;
};

type SkillsResponse = {
  technicalSkills: Skill[];
};

type UserSkillsResponse = {
  technicalSkills: Skill[];
};

const Page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [techSkillMap, setTechSkillMap] = useState<Map<
    string,
    [number, boolean]
  > | null>(null);
  const url = `http://localhost:8080/api`;

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const userData = await authFetch(`${url}/user/profile`, {
        method: "GET",
      });

      const skills: SkillsResponse | null = await authFetch(
        `${url}/user/skills`,
        {
          method: "GET",
        }
      );

      const userSkills: UserSkillsResponse | null = await authFetch(
        `${url}/user/skills/get`,
        {
          method: "GET",
        }
      );

      if (!userData || !skills || !userSkills) {
        router.push("/login");
        return;
      }

      setProfile({
        nombre: `${userData.firstName} ${userData.lastName}`,
        password: userData.password,
        correo: userData.email,
        url_foto: "/profile.png",
        puesto: userData.position || "Front-end Developer",
      });

      const userTechSkillNames = new Set(
        userSkills.technicalSkills.map((skill) => skill.skillName)
      );

      const skillTechMapping = new Map<string, [number, boolean]>(
        skills.technicalSkills.map((skill) => [
          skill.skillName,
          [skill.skillId, userTechSkillNames.has(skill.skillName)],
        ])
      );

      setTechSkillMap(skillTechMapping);
      setLoading(false);
    };

    loadData();
  }, [router]);

  if (loading || !techSkillMap) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    // <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9">
    //   <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
    //     <ProfileCardClient profile={profile} />
    //     <ChargeabilityCard />
    //   </section>

    //   <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    //     <TechSkillsCard techSkillMap={techSkillMap} url={url} />
    //     <SoftSkillsCardClient
    //       allSkills={[
    //         "Empatía",
    //         "Comunicación",
    //         "Resolución de problemas",
    //         "Liderazgo",
    //       ]}
    //       initialSelected={["Empatía", "Comunicación"]}
    //     />
    //   </section>
    // </div>

    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Perfil" />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
        <PersonalInfoForm
          userData={{
            firstName: profile.nombre.split(" ")[0],
            lastName: profile.nombre.split(" ").slice(1).join(" "),
            email: profile.correo,
            position: profile.puesto,
            url_foto: profile.url_foto,
          }}
        />
        <div className="max-h-auto">
          {/* <TechSkillsCard techSkillMap={techSkillMap} url={url} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
