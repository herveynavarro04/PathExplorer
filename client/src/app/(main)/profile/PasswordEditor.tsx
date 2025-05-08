"use client";

import { ChangeEvent, useState } from "react";

const PasswordEditor = () => {
  const [password, setPassword] = useState<string>("********");
  const [editing, setEditing] = useState<boolean>(false);

  const handleSave = (): void => {
    console.log("New password:", password);
    setEditing(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <p className="text-md font-light mb-1">Contraseña</p>
      <div className="flex items-center gap-3">
        <input
          type="password"
          className="bg-white/10 text-white px-4 py-2 rounded-lg w-full"
          value={password}
          onChange={handleChange}
          readOnly={!editing}
        />
        {!editing ? (
          <button
            className="text-sm underline text-white"
            onClick={() => setEditing(true)}
          >
            Cambiar
          </button>
        ) : (
          <button
            className="text-sm underline text-green-300"
            onClick={handleSave}
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordEditor;
