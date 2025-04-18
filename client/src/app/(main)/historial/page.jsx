"use client";
import HistoryCard from "@components/HistoryCard";
import { CiCirclePlus } from "react-icons/ci";

import React, { useEffect, useState } from "react";
import HistoryForm from "@components/HistoryForm";
import DeleteCard from "@components/DeleteCard";

const Historial = () => {
  const [openAddHistory, setOpenAddHistory] = useState(false);
  const [openDeleteCard, setOpendDeleteCard] = useState(false);
  const [posicion, setPosicion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicio, setfecha_inicio] = useState("");
  const [fecha_fin, setfecha_fin] = useState("");
  const [historyArray, setHistoryArray] = useState([
    {
      id: 1,
      posicion: "Desarrollador Frontend",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Next.js y Tailwind CSS.",
      empresa: "Tech Company",
      fecha_inicio: "Enero 2020",
      fecha_fin: "Diciembre 2021",
    },
  ]);

  useEffect(() => {
    console.log(openDeleteCard);
  }, [openDeleteCard]);

  return (
    <>
      {openDeleteCard && <DeleteCard />}
      {openAddHistory && (
        <HistoryForm
          posicion={posicion}
          setPosicion={setPosicion}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          empresa={empresa}
          setEmpresa={setEmpresa}
          fecha_inicio={fecha_inicio}
          setfecha_inicio={setfecha_inicio}
          fecha_fin={fecha_fin}
          setfecha_fin={setfecha_fin}
          setOpenAddHistory={setOpenAddHistory}
          setHistoryArray={setHistoryArray}
        />
      )}
      <main className="relative w-full  text-white px-5">
        <div className="relative flex justify-end pr-[5rem]  py-4">
          <h1 className="text-[2.5rem]  ">Historial Profesional</h1>
        </div>

        <div className="relative  w-full max-h-[calc(100vh-10rem)] overflow-y-scroll no-scrollbar pr-4 pl-[3rem] space-y-[5.5rem] pt-[3rem]">
          {historyArray.map((history) => (
            <HistoryCard
              key={history.id}
              posicion={history.posicion}
              descripcion={history.descripcion}
              empresa={history.empresa}
              fecha_inicio={history.fecha_inicio}
              fecha_fin={history.fecha_fin}
              setOpendDeleteCard={setOpendDeleteCard}
            />
          ))}
        </div>

        <div
          onClick={() => setOpenAddHistory(true)}
          className="fixed bottom-8 overflow-hidden left-14 flex items-center gap-2 text-white cursor-pointer z-0 border-solid border-2 border-[#7B2FE0] bg-[#3A005F] rounded-4xl w-[15rem] h-[5rem] justify-center shadow-xl transition duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 bg-black/30 z-10 overflow-hidden pointer-events-none" />

          <CiCirclePlus
            className="transition duration-300 ease-out hover: scale-110 hover:-translate-y-1  active:scale-95 "
            size={38}
          />
          <p className="text-[1rem] transition duration-300 ease-out hover: scale-100 active:scale-95 ">
            Agregar empleo pasado
          </p>
        </div>
      </main>
    </>
  );
};

export default Historial;
