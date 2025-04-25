"use client";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import GoalCard from "./GoalCard";

const GoalCardClient = ({ goals, onOpenForm }) => {
  return (
    <section
      className="relative max-w-4xl mx-auto bg-gradient-to-tr from-[#3A005F] via-[#7B2FE0] to-[#00535b]
                 rounded-3xl p-6 overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
      style={{ height: "19rem" }} 
    >
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-white">
            Mis metas profesionales
          </h2>
          <button
            onClick={onOpenForm}
            className="inline-flex items-center gap-2
                       bg-[#3A005F] hover:bg-[#2e004a] hover:cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 px-4 py-2 rounded-full
                       text-white shadow-lg"
          >
            <CiCirclePlus size={20} /> Registrar nueva meta
          </button>
        </div>

        <div
          className="overflow-y-auto pr-2 space-y-3"
          style={{ flexGrow: 1 }}
        >
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              information={g.information}
              term={g.term}
              completed={g.completed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalCardClient;
