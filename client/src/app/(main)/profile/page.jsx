"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCardClient from "./ProfileCardClient";
import ChargeabilityCard from "./ChargeabilityCard";
import TechSkillsCardClient from "./TechSkillsCardClient";
import SoftSkillsCardClient from "./SoftSkillsCardClient";
import { authFetch } from "@utils/authFetch";
import Loading from "@/components/Loading";

export default function Page() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  // const [techSkills, setTechSkills] = useState([]);
  // const [softSkills, setSoftSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const userData = await authFetch(
        "http://localhost:8080/api/user/profile",
        {
          method: "GET",
        }
      );
      // const techData = await authFetch("http://localhost:8080/api/skills/tech");
      // const softData = await authFetch("http://localhost:8080/api/skills/soft");

      if (!userData) {
        router.push("/login");
        return;
      }

      setProfile({
        nombre: `${userData.firstName} ${userData.lastName}`,
        password: userData.password,
        correo: userData.email,
        url_foto: "/profile.png",
        puesto: "Meta Engineer",
      });
      setLoading(false);

      // setTechSkills(techData);
      // setSoftSkills(softData);
      // setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
          <ProfileCardClient profile={profile} />
          <ChargeabilityCard />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <TechSkillsCardClient
            allSkills={[
              "Python",
              "Git",
              "MongoDB",
              "Django",
              "C++",
              "JavaScript",
              "AWS",
              "React",
              "Node.js",
            ]}
            initialSelected={["Python", "Git", "MongoDB", "Django"]}
          />
          <SoftSkillsCardClient
            allSkills={[
              "Empatía",
              "Comunicación",
              "Resolución de problemas",
              "Liderazgo",
            ]}
            initialSelected={["Empatía", "Comunicación"]}
          />
          {/* <TechSkillsCardClient allSkills={techSkills} />
          <SoftSkillsCardClient allSkills={softSkills} /> */}
        </section>
      </div>
    </>
  );
}
