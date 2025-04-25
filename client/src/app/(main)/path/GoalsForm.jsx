"use client";
import React, { useState } from "react";

const GoalsForm = ({ setOpenForm, addGoal }) => {
  const [text, setText] = useState("");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("notStarted");

  const today = new Date().toISOString().split("T")[0]; 

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal({
      id: Date.now(),
      information: text,
      term,
      completed: status === "complete",
    });
    setOpenForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#3A005F] to-[#7B2FE0] text-white rounded-2xl p-6 w-full max-w-md space-y-6 shadow-xl"
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Escribe tu meta"
            maxLength={100}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="bg-white/20 placeholder-white/60 text-white rounded-xl px-4 py-3 outline-none"
          />
          <span className="text-right text-sm text-white/60 mt-1">Max. 100 caracteres</span>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-white font-medium">Plazo</label>
          <input
            type="date"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            min={today}
            required
            className="bg-black text-white rounded-md px-4 py-2 hover:cursor-pointer"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-white font-medium">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-black text-white rounded-md px-4 py-2 hover:cursor-pointer"
          >
            <option value="notStarted">No iniciado</option>
            <option value="inProgress">En progreso</option>
            <option value="complete">Completada</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button
            type="submit"
            className="bg-[#4B0082] hover:bg-[#370061] transition px-4 py-3 rounded-xl text-white font-medium hover:cursor-pointer"
          >
            Guardar meta
          </button>
          <button
            type="button"
            onClick={() => setOpenForm(false)}
            className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-300 hover:cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalsForm;
