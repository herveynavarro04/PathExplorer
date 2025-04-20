'use client';
import { useState } from 'react';

const PasswordEditor = () => {
  const [password, setPassword] = useState('********');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    console.log('New password:', password);
    setEditing(false);
  };

  return (
    <div>
      <p className="text-md font-light mb-1">Contraseña</p>
      <div className="flex items-center gap-3">
        <input
          type="password"
          className="bg-white/10 text-white px-4 py-2 rounded-lg w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
