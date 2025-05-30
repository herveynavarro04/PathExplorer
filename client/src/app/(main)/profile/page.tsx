"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "./_components/personal-info";
import TechSkillsCard from "./TechSkillsCard";
import SoftSkillsCard from "./SoftSkillsCard";
import { authFetch } from "@utils/authFetch";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";
import ChargeabilityCard from "./ChargeabilityCard";
import PeopleLeadApplyModal from "./_components/PeopleLeadApplyModal";

type ProfileData = {
  firstName: string;
  lastName: string;
  password: string;
  level?:number;
  email: string;
  url_pic: string;
  position: string;
  mime_type: string;
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
  const [skills, setSkills] = useState<SkillsResponse | null>(null);
  const [userSkills, setUserSkills] = useState<UserSkillsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const url = "http://localhost:8080/api";

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const [userData, skillsRes, userSkillsRes] = await Promise.all([
          authFetch<any>(`${url}/employee`),
          authFetch<SkillsResponse>(`${url}/skills`),
          authFetch<UserSkillsResponse>(`${url}/skills/employee`),
        ]);

        if (!userData || !skillsRes || !userSkillsRes) {
          router.push("/login");
          return;
        }

        setProfile({
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password,
          level: userData.level,
          email: userData.email,
          url_pic: userData.profilePicture || "/profile.png",
          position: userData.position || "Front-end Developer",
          mime_type: userData.mimeType ?? "image/png",
        });

        setSkills(skillsRes);
        setUserSkills(userSkillsRes);
        setLoading(false);

        setTimeout(() => setFadeIn(true), 25);
      } catch (error) {
        console.error("Error loading profile data:", error);
        router.push("/login");
      }
    };

    loadData();
  }, [reloadTrigger]);

  const updateProfileState = (newData: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...newData }));
  };

  const handleApply = () => {
    alert("¡Solicitud enviada con éxito!");
  };

  if (loading || !profile || !skills || !userSkills) {
    return <div className="min-h-screen bg-[#d0bfdb]" />;
  }

  return (
    <div>
      {showApplyModal && (
        <PeopleLeadApplyModal
          setOpen={setShowApplyModal}
          onApply={handleApply}
        />
      )}

      <div
        className={`mx-auto w-full max-w-[970px] transition-opacity duration-300 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <Breadcrumb pageName="Perfil" />
          {profile.level && profile.level >= 5 && profile.level <= 9 && (
            <button
              className="flex items-center justify-center rounded-lg bg-[#65417f] px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-80 dark:hover:bg-opacity-75"
              type="button"
              onClick={() => setShowApplyModal(true)}
            >
              Quiero ser People Lead
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 2xl:gap-7.5">
          <PersonalInfoForm
            userData={profile}
            triggerReload={(fade = false) => {
              if (fade) {
                setFadeIn(false);
                setTimeout(() => {
                  setReloadTrigger((prev) => !prev);
                }, 300);
              } else {
                setReloadTrigger((prev) => !prev);
              }
            }}
            updateProfileState={updateProfileState}
            setGlobalLoading={setLoading}
          />
          <div className="max-h-auto flex flex-col gap-2">
            <ChargeabilityCard />
            <TechSkillsCard skills={skills} userSkills={userSkills} url={url} />
            <SoftSkillsCard skills={skills} userSkills={userSkills} url={url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
