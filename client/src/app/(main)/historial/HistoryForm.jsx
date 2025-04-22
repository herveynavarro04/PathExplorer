import React from "react";

const HistoryForm = ({
  posicion,
  setPosicion,
  empresa,
  setEmpresa,
  descripcion,
  setDescripcion,
  fecha_inicio,
  setfecha_inicio,
  fecha_fin,
  setfecha_fin,
  setOpenAddHistory,
  setHistoryArray,
}) => {
  //
  return (
    <div className="top-57 left-100  z-[999] w-[60rem] h-[40rem] bg-[#5e1684] fixed rounded-4xl overflow-hidden ">
      <form
        className="w-full h-full relative"
        onSubmit={(e) => {
          e.preventDefault();
          setHistoryArray((prev) => [
            ...prev,
            {
              id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
              posicion,
              descripcion,
              empresa,
              fecha_inicio,
              fecha_fin,
            },
          ]);
          setOpenAddHistory(false);
          setPosicion("");
          setEmpresa("");
          setDescripcion("");
          setfecha_inicio("");
          setfecha_fin("");
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="w-full h-[7rem] flex justify-center items-center  relative z-10 bg-gradient-to-t from-white/10 to-white/0">
          <input
            className="block rounded-2xl bg-[#8d5da7] w-full max-w-[25rem] py-[0.8rem] pl-[0.5rem] transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 focus:outline-none"
            type="text"
            placeholder="Escribe el nombre del puesto..."
            required
            value={posicion}
            onChange={(e) => {
              setPosicion(e.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col w-full h-full gap-[1.5rem] relative z-10">
          <div className="w-full flex justify-center pt-[3rem] ">
            <textarea
              rows="1"
              cols="50"
              maxLength="250"
              className="bg-[#8d5da7] w-full max-w-[50rem] rounded-2xl pb-[5rem] pt-[1rem] pl-[1rem] transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 focus:outline-none"
              type="text"
              placeholder="Escribe una descripción del puesto en el que estuviste..."
              required
              value={descripcion}
              onChange={(e) => {
                console.log(descripcion);

                setDescripcion(e.target.value);
              }}
            />
          </div>
          <div className="w-full flex justify-center">
            <input
              className="bg-[#8d5da7] w-full max-w-[28rem] rounded-2xl py-[0.8rem] pl-[0.5rem] transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 focus:outline-none"
              type="text"
              placeholder="Empresa"
              required
              value={empresa}
              onChange={(e) => {
                console.log(empresa);

                setEmpresa(e.target.value);
              }}
            />
          </div>
          <div className="w-full  flex justify-center gap-[2rem]">
            <div>
              <label>
                <span className="block pl-[2.8rem] pb-[0.5rem] text-[#89679c] ">
                  Fecha Inicio
                </span>
                <input
                  className="bg-[#8d5da7] block p-[1rem] rounded-2xl transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 focus:outline-none"
                  type="month"
                  required
                  value={fecha_inicio}
                  onChange={(e) => {
                    console.log(fecha_inicio);
                    setfecha_inicio(e.target.value);
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="block pl-[3.5rem] pb-[0.5rem] text-[#89679c]">
                  Fecha Fin
                </span>
                <input
                  className="bg-[#8d5da7] block p-[1rem] rounded-2xl transition duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 focus:outline-none"
                  type="month"
                  required
                  value={fecha_fin}
                  onChange={(e) => {
                    console.log(fecha_fin);
                    setfecha_fin(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input
              className="bg-[#590089] py-[1.5rem] px-[4.5rem] rounded-2xl cursor-pointer 
             transition duration-300 ease-in-out 
             hover:bg-[#a296a9] hover:-translate-y-1 hover:scale-110  
             focus:outline-none active:scale-95 "
              type="submit"
              required
              value="Guardar Empleo"
            />
          </div>
          <div className="w-full flex justify-center ">
            <button
              className="bg-[#a296a9] p-[0.6rem] rounded-2xl cursor-pointer transition duration-300 ease-in-out hover:bg-[#5e1684] hover:text-white   hover:-translate-y-1 hover:scale-110 focus:outline-none active:scale-95  "
              onClick={() => {
                setOpenAddHistory(false);
                setPosicion("");
                setEmpresa("");
                setDescripcion("");
                setfecha_inicio("");
                setfecha_fin("");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HistoryForm;
