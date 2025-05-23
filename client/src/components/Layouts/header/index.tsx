

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { useEffect, useState } from "react";
import { authFetch } from "@utils/authFetch";
import { useRouter } from "next/navigation";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
};

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const userData = await authFetch("http://localhost:8080/api/employee", {
        method: "GET",
      });

      if (!userData) {
        router.push("/login");
        return;
      }

      setUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        profilePhoto:
          userData.profilePicture && userData.mimeType
            ? `data:${userData.mimeType};base64,${userData.profilePicture}`
            : "/profile.png",
      });
    };

    fetchUser();
  }, [router]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-[#f8f6fa] px-4 py-5 shadow-1 dark:border-[#1b0e23] dark:bg-[#311a42] md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/logo.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          PathExplorer
        </h1>
        <p className="font-medium">Administra tus objetivos</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <ThemeToggleSwitch />
        <div className="shrink-0">
          {user && (
            <UserInfo
              name={`${user.firstName}`}
              email={user.email}
              img={user.profilePhoto || "/profile.png"}
            />
          )}
        </div>
      </div>
    </header>
  );
}
