"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Login from "./Login";
import { handleSubmit } from "@utils/auth";

const StateLogin = ({ parentWidth }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const onSubmit = async () => {
    const success = await handleSubmit(email, password, setShowError);
    if (success) {
      router.push("/dashboard");
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
        handleSubmit={onSubmit}
      />
    </div>
  );
};

export default StateLogin;
