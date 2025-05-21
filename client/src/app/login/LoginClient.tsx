

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingPage from "components/LoadingPage";
import LoginError from "./LoginError";
import Login from "./Login";
import { authFetch } from "@utils/authFetch";

const LoginClient = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const router = useRouter();
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
      <div className="relative h-screen w-full overflow-hidden px-4 flex items-center justify-center">

        {/* Background animation */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.3 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: "url('/monochrome.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Main Content */}
        <div className="w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-2 place-items-center relative z-10">
          
          {/* Login Form Card */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <motion.div
              className="bg-white bg-opacity-80 border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-md"
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((offsetX - centerX) / centerX) * 10;
                const rotateX = -((offsetY - centerY) / centerY) * 10;

                setTilt({ x: rotateX, y: rotateY });
              }}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <h1 className="text-3xl font-light text-purple-600 mb-8 text-center">Path Explorer</h1>

              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setTrigger={setTrigger}
              />

              
            </motion.div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full h-full flex justify-center items-center relative overflow-visible"
          >
            <div className="relative md:w-[500px] md:h-[500px] scale-[1.6]">
              <Image
                src="/logo.svg"
                alt="Accenture Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </motion.div>
          {showError && <LoginError />}
        </div>
      </div>
    </LoadingPage>
  );
};

export default LoginClient;
