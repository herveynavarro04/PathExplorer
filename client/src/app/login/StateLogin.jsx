"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import Login from "./Login";

const StateLogin = ({ parentWidth }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push("/dashboard");
      console.log("User is auth");
    } else {
      setShowError(true);
      console.log("User is not Auth");
    }
  };

  return (
    <div className={`${parentWidth}`}>
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showError={showError}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default StateLogin;
