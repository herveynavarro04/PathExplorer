"use client";
import React from "react";
import LoginError from "./LoginError";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  showError,
  handleSubmit,
}) => {
  return (
    <form
      className="w-full h-auto flex flex-col items-center justify-center gap-[1.5rem]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        className="w-full bg-[#9573a8] rounded-2xl max-w-[20rem] py-[0.8rem] pl-[2.2rem] transition duration-300 ease-in-out   hover:scale-105 focus:outline-none "
        type="text"
        placeholder="Introduce tu correo"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="w-full bg-[#9573a8] rounded-2xl max-w-[20rem] py-[0.8rem] pl-[2.2rem] transition duration-300 ease-in-out   hover:scale-105 focus:outline-none  "
        type="text"
        placeholder="Introduce tu contraseña"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />{" "}
      <input
        className="w-full text-[#c8b7d1] bg-[#9573a8] rounded-2xl max-w-[10rem] py-[0.8rem]  cursor-pointer transition duration-300 ease-in-out   hover:scale-110 focus:outline-none  "
        type="submit"
        value="Iniciar Sesión"
        required
      />
      {showError && <LoginError />}
    </form>
  );
};

export default Login;
