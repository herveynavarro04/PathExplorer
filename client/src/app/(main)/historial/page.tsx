"use client";
import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import { CiCirclePlus } from "react-icons/ci";
import HistoryForm from "./HistoryForm";
import DeleteCard from "./DeleteCard";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

interface HistoryItem {
  id: number;
  posicion: string;
  descripcion: string;
  empresa: string;
  fecha_inicio: string;
  fecha_fin: string;
}

const Historial: React.FC = () => {
  const [openAddHistory, setOpenAddHistory] = useState<boolean>(false);
  const [openDeleteCard, setOpendDeleteCard] = useState<boolean>(false);
  const [posicion, setPosicion] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fecha_inicio, setfecha_inicio] = useState<string>("");
  const [fecha_fin, setfecha_fin] = useState<string>("");

  const [historyArray, setHistoryArray] = useState<HistoryItem[]>([
    {
      id: 1,
      posicion: "Desarrollador Front",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Next.js y Tailwind CSS.",
      empresa: "Tech Company",
      fecha_inicio: "Enero 2020",
      fecha_fin: "Diciembre 2021",
    },
    {
      id: 2,
      posicion: "Desarrollador Back",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Next.js y Tailwind CSS.",
      empresa: "Tech Company",
      fecha_inicio: "Enero 2020",
      fecha_fin: "Diciembre 2021",
    },
    {
      id: 3,
      posicion: "Desarrollador Full Stack",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Node.js y MongoDB.",
      empresa: "Another Tech Company",
      fecha_inicio: "Enero 2022",
      fecha_fin: "Presente",
    },
    {
      id: 4,
      posicion: "Desarrollador Back",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Next.js y Tailwind CSS.",
      empresa: "Tech Company",
      fecha_inicio: "Enero 2020",
      fecha_fin: "Diciembre 2021",
    },
    {
      id: 5,
      posicion: "Desarrollador Full Stack",
      descripcion:
        "Desarrollo de aplicaciones web utilizando React, Node.js y MongoDB.",
      empresa: "Another Tech Company",
      fecha_inicio: "Enero 2022",
      fecha_fin: "Presente",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(historyArray.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

      <main className="relative w-full text-white px-5">
        <div className="relative flex justify-between items-center px-10 py-4">
          <Breadcrumb pageName="Historial" />
        </div>

        <div className="relative w-full min-h-[30rem] grid gap-6 sm:grid-cols-2 2xl:grid-cols-3 px-[3rem] pb-10">
          {currentItems.map((history) => (
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

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center text-lg">
            {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        <div
          onClick={() => setOpenAddHistory(true)}
          className="fixed bottom-8 left-14 flex items-center gap-2 text-white cursor-pointer z-0 border-solid border-2 border-[#7B2FE0] bg-[#3A005F] rounded-4xl w-[15rem] h-[5rem] justify-center shadow-xl transition duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95"
        >
          <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
          <CiCirclePlus
            className="transition duration-300 ease-out hover:scale-110 hover:-translate-y-1 active:scale-95"
            size={38}
          />
          <p className="text-[1rem] transition duration-300 ease-out hover:scale-100 active:scale-95">
            Agregar empleo pasado
          </p>
        </div>
      </main>
    </>
  );
};

export default Historial;
