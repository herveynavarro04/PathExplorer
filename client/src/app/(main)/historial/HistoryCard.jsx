import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const HistoryCard = ({
  posicion,
  descripcion,
  empresa,
  fecha_inicio,
  fecha_fin,
  setOpendDeleteCard,
}) => {
  return (
    <div
      className="flex w-full max-w-[72rem] relative h-[18rem] rounded-4xl overflow-hidden shadow-xl transition duration-300
        hover:-translate-y-5 hover:scale-100 "
    >
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      <div className="flex items-center justify-center w-[35rem] h-full relative bg-gradient-to-tr from-[#3A005F] via-[#7B2FE0] to-[#00535b]  ">
        <h1 className="text-white z-20 text-[1.5rem] p-[6rem] text-shadow-lg/30 mask-radial-from-neutral-500 ">
          {posicion}
        </h1>
      </div>
      <div className=" flex flex-col gap-[2rem] w-full h-full relative bg-gradient-to-br from-[#006b75] via-[#7B2FE0] to-[#3A005F] text-white pl-6 pt-2 pr-2">
        <div className="absolute top-2 right-6 z-40 ">
          <FaRegTrashAlt
            size={24}
            className="transition duration-300 z-0 ease-out hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer text-white"
            onClick={() => setOpendDeleteCard(true)}
          />
        </div>

        <div className=" pl-[3rem] flex flex-col gap-[2rem] w-full h-full">
          <div className="w-full relative z-20  flex items-start">
            <h1 className="text-black font-bold text-[2rem] text-shadow-lg/30">
              {empresa}
            </h1>
          </div>
          <div className="relative z-20 flex flex-col gap-[0.5rem] ">
            <h1 className="text-black text-[1.5rem]">Descripción del Puesto</h1>
            <p className="text-[#7982a9] font-stretch-50%">{descripcion}</p>
          </div>
          <div className="relative z-20 flex gap-[2.5rem]">
            <p className="text-black text-[1.2rem]">{fecha_inicio}</p>
            <p className="text-black text-[1.2rem]">-</p>
            <p className="text-black text-[1.2rem]">{fecha_fin}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
