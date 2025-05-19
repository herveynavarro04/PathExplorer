import React from "react";

const LoginError = () => {
  return (
    <div className="absolute top-[42rem] left-[9rem] ">
      <p className="text-red-500 text-[1.2rem]">
        Credenciales inválidas, por favor intenta nuevamente.
      </p>
    </div>
  );
};

export default LoginError;
