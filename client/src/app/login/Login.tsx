"use client";
import React from "react";

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  setTrigger,
}: LoginProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) setTrigger((prev) => !prev);
      }}
    >
      <input
        type="email"
        placeholder="Correo electrónico"
        className="px-5 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            "Por favor, introduce tu correo"
          )
        }
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="px-5 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            "Por favor, introduce tu contraseña"
          )
        }
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition mt-2"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
