"use client";

import { ChevronUpIcon } from "../../../../assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../../../ui/dropdown";
import { cn } from "../../../../lib/utils";
import Image from "next/image";
import { useState } from "react";
import { LogOutIcon } from "./icons";
import { useRouter } from "next/navigation";

type UserInfoProps = {
  name: string;
  email: string;
  img: string;
  level: number;
};

export function UserInfo({ name, email, img, level }: UserInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    console.log("Token removed from local storage");
    router.push("/login");
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          <Image
            src={img}
            alt={`Avatar of ${name}`}
            width={48}
            height={48}
            className="rounded-full object-cover w-12 h-12"
            role="presentation"
          />
          <figcaption className="flex items-center gap-1 font-medium text-black dark:text-dark-6 max-[1024px]:sr-only">
            <span>{name}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0"
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-[#f8f6fa] shadow-md dark:border-[#1b0e23] dark:bg-[#2e2137] min-w-[25rem] max-w-[30rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <Image
            src={img}
            alt={`Avatar for ${name}`}
            width={48}
            height={48}
            className="rounded-full object-cover w-16 h-16"
            role="presentation"
          />

          <figcaption className="space-y-2 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              Nivel {level}
            </div>

            <div className="leading-none text-gray-6">{email}</div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-[#1b0e23]" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={handleLogout}
          >
            <LogOutIcon />
            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
