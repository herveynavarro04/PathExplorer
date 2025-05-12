"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StateLogin from "./StateLogin";
import LoadingPage from "components/LoadingPage";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }

    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingPage loading={loading}>
      <div className="flex flex-col h-screen w-full">
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
            <div className="flex justify-center w-full h-auto">
              <h1 className="text-[5rem] text-[#a78ab7] hover:scale-110 transition duration-300 ease-in-out">
                Path Explorer
              </h1>
            </div>
            <StateLogin parentWidth="w-full" />
          </div>

          <div className="w-full h-full flex justify-center items-center relative right-[5rem]">
            <Image
              className="w-[45rem] h-[40rem] object-cover transition duration-300 ease-in-out hover:scale-110 animate-float animate-pulse opacity-80"
              src="/logo.svg"
              alt="Accenture logo"
              width={256}
              height={256}
            />
          </div>
        </div>
      </div>
    </LoadingPage>
  );
};

export default Page;
