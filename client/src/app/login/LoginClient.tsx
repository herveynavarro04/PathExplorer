"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingPage from "components/LoadingPage";
import { useRouter } from "next/navigation";
import Login from "./Login";
import LoginError from "./LoginError";
import { authFetch } from "@utils/authFetch";

const LoginClient = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const url = `http://localhost:8080/api`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");

    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!email || !password) return;

      try {
        const response = await authFetch(`${url}/auth/signIn`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        if (!response) {
          setShowError(true);
        } else {
          const { accessToken } = response;
          localStorage.setItem("token", accessToken);
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Unexpected error", err);
        setShowError(true);
      }
    };

    loadData();
  }, [trigger]);

  return (
    <LoadingPage loading={loading}>
      <div className="flex flex-col h-screen w-full">
        <div className="w-full h-auto pl-[3rem] pt-[1.5rem]">
          <Image
            src="/logo-1.png"
            alt="Accenture logo"
            width={150}
            height={100}
            priority
          />
        </div>

        <div className="w-full h-full grid grid-cols-2 items-center">
          <div className="text-white w-full h-full flex flex-col justify-center items-center mb-[2.5rem] gap-[1rem]">
            <div className="flex justify-center w-full h-auto">
              <h1 className="text-[5rem] text-[#a78ab7] hover:scale-110 transition duration-300 ease-in-out">
                Path Explorer
              </h1>
            </div>
            <div className="w-full">
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setTrigger={setTrigger}
              />
            </div>
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
        {showError && <LoginError />}
      </div>
    </LoadingPage>
  );
};

export default LoginClient;
