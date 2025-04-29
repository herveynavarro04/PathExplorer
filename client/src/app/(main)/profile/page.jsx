"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCardClient from "./ProfileCardClient";
import ChargeabilityCard from "./ChargeabilityCard";
import TechSkillsCard from "./TechSkillsCard";
import SoftSkillsCardClient from "./SoftSkillsCardClient";
import { authFetch } from "@utils/authFetch";
import Loading from "@/components/Loading";

const page = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [techSkillMap, setTechSkillMap] = useState(null);
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
      const skills = await authFetch(`${url}/user/skills`, { method: "GET" });
      const userSkills = await authFetch(`${url}/user/skills/get`, {
        method: "GET",
      });

      console.log(userData);
      console.log(skills);
      console.log(userSkills);

      if (!userData || !skills || !userSkills) {
        router.push("/login");
        return;
      }

      setProfile({
        nombre: `${userData.firstName} ${userData.lastName}`,
        password: userData.password,
        correo: userData.email,
        url_foto: "/profile.png",
        puesto: "Front-end Developer",
      });

      const userTechSkillNames = new Set(
        userSkills.technicalSkills.map((skill) => skill.skillName)
      );
      const skillTechMapping = new Map(
        skills.technicalSkills.map((skill) => [
          skill.skillName,
          [skill.skillId, userTechSkillNames.has(skill.skillName)],
        ])
      );

      console.log(skills);
      console.log(userSkills);
      console.log(skillTechMapping);

      setTechSkillMap(skillTechMapping);
      setLoading(false);
    };

    loadData();
  }, []);

  console.log(techSkillMap);

  if (loading || !techSkillMap) {
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
          <TechSkillsCard techSkillMap={techSkillMap} url={url} />
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
};

export default page;

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import ProfileCardClient from "./ProfileCardClient";
// import ChargeabilityCard from "./ChargeabilityCard";
// import TechSkillsCard from "./TechSkillsCard";
// import SoftSkillsCardClient from "./SoftSkillsCardClient";
// import { authFetch } from "@utils/authFetch";
// import Loading from "@/components/Loading";

// export default function Page() {
//   const router = useRouter();
//   const [profile, setProfile] = useState(null);
//   // const [techSkills, setTechSkills] = useState([]);
//   // const [softSkills, setSoftSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const url = `http://localhost:8080/api`;

//   useEffect(() => {
//     const loadData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         router.push("/login");
//         return;
//       }
//       const userData = await authFetch(`${url}/user/profile`, {
//         method: "GET",
//       });

//       const skills = await authFetch(`${url}/user/skills`, {
//         method: "GET",
//       });

//       const userSkills = await authFetch(`${url}/user/skills/get`, {
//         method: "GET",
//       });

//       console.log(userData);
//       console.log(skills.technicalSkills);
//       console.log(userSkills.technicalSkills);

//       if (!userData && !skills && !userSkills) {
//         router.push("/login");
//         return;
//       }

//       setProfile({
//         nombre: `${userData.firstName} ${userData.lastName}`,
//         password: userData.password,
//         correo: userData.email,
//         url_foto: "/profile.png",
//         puesto: "Front-end Developer",
//       });

//       setTechSkills(skills.technicalSkills);
//       setUserTechSkills(userSkills.technicalSkills);
//       setLoading(false);

//       // setTechSkills(techData);
//       // setSoftSkills(softData);
//       // setLoading(false);
//     };

//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-full">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9">
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
//           <ProfileCardClient profile={profile} />
//           <ChargeabilityCard />
//         </section>

//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <TechSkillsCard
//             allSkills={[
//               "Python",
//               "Git",
//               "MongoDB",
//               "Django",
//               "C++",
//               "JavaScript",
//               "AWS",
//               "React",
//               "Node.js",
//               "Docker",
//               "SQL",
//               "Excel",
//               "Power BI",
//               "Tableau",
//               "UML",
//               "BPMN",
//               "JIRA",
//               "Confluence",
//               "Power Query",
//               "ETL Processes",
//             ]}
//             initialSelected={["Python", "Git", "Power BI", "SQL", "JIRA"]}
//           />
//           <SoftSkillsCardClient
//             allSkills={[
//               "Empatía",
//               "Comunicación",
//               "Resolución de problemas",
//               "Liderazgo",
//             ]}
//             initialSelected={["Empatía", "Comunicación"]}
//           />
//         </section>
//       </div>
//     </>
//   );
// }
