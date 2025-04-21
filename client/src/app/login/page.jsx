import React from "react";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import StateLogin from "@components/StateLogin";

const Page = () => {
  return (
    <div className="flex flex-col h-screen w-full  ">
      <div className="w-full h-auto pl-[3rem] pt-[1.5rem]">
        <Image
          src="/logo-1.png"
          alt="Accenture logo"
          width={150}
          height={100}
        />
      </div>
      <div className="w-full h-full grid grid-cols-2 items-center">
        <div className="text-white w-full h-full flex flex-col justify-center items-center mb-[2.5rem] gap-[1rem]">
          <div className="flex justify-center w-full h-auto ">
            <h1 className="text-[5rem]  text-[#a78ab7] transition duration-300 ease-in-out  hover:scale-110">
              Path Explorer
            </h1>
          </div>
          <StateLogin parentWidth="w-full" />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Image
            className="w-[45rem] h-[40rem] object-cover relative right-35 transition duration-300 ease-in-out  hover:scale-110  animate-float  "
            src="/logo.svg"
            alt="Accenture logo"
            width={256}
            height={256}
          />
        </div>

        <div className="fixed flex flex-col gap-[3.7rem] top-[29.3rem] left-[14rem]">
          <FaUserAlt />
          <RiLockPasswordFill />
        </div>
      </div>
    </div>
  );
};

export default Page;
