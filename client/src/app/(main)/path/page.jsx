"use client";
import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import GoalsForm from "./GoalsForm";
import GoalCard from "./GoalCard";
import GoalCardClient from "./GoalCardClient";
import TechInterestsCard from "./TechInterestsCard";

const PathDeCarrera = () => {
  const [openForm, setOpenForm] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/empleado.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = (data.goals || []).map((g) => {
          const d = new Date(g.term);
          const day = d.getDate();
          let month = d.toLocaleDateString("es-MX", { month: "long" });
          month = month.charAt(0).toUpperCase() + month.slice(1);
          const year = d.getFullYear();

          return {
            id: g.id_goal,
            information: g.information,
            term: `${day} ${month} ${year}`,
            completed: g.completed,
          };
        });
        setGoals(formatted);
      })
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  return (
    <>
      {openForm && (
        <GoalsForm
          setOpenForm={setOpenForm}
          addGoal={(newGoal) => setGoals((prev) => [...prev, newGoal])}
        />
      )}

      <main className="w-full text-white">
      <div className="relative flex justify-end pr-[5rem]  pb-18">
          <h1 className="text-4xl  ">Path de carrera</h1>
        </div>
    <GoalCardClient
         goals={goals}
         onOpenForm={() => setOpenForm(true)}
       />
        <div className="mt-10">
    <TechInterestsCard />
  </div>
      </main>
    </>
  );
};

export default PathDeCarrera;
