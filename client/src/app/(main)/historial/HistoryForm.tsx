import React from "react";

interface HistoryFormProps {
  posicion: string;
  setPosicion: (value: string) => void;
  empresa: string;
  setEmpresa: (value: string) => void;
  descripcion: string;
  setDescripcion: (value: string) => void;
  fecha_inicio: string;
  setfecha_inicio: (value: string) => void;
  fecha_fin: string;
  setfecha_fin: (value: string) => void;
  setOpenAddHistory: (value: boolean) => void;
  setHistoryArray: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        posicion: string;
        descripcion: string;
        empresa: string;
        fecha_inicio: string;
        fecha_fin: string;
      }[]
    >
  >;
}

const HistoryForm: React.FC<HistoryFormProps> = ({
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
  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
        className="w-full max-w-3xl rounded-[10px] bg-[#f8f6fa] dark:bg-[#311a42] shadow-1 dark:shadow-card p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Puesto
            </label>
            <input
              className="w-full rounded-md p-3 bg-[#e7deed] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Escribe el nombre del puesto..."
              required
              value={posicion}
              onChange={(e) => setPosicion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Descripción
            </label>
            <textarea
              rows={4}
              maxLength={250}
              className="w-full rounded-md p-3 bg-[#ede5f2] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Describe el trabajo realizado..."
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Empresa
            </label>
            <input
              className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="text"
              placeholder="Nombre de la empresa"
              required
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Fecha Inicio
              </label>
              <input
                className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="month"
                required
                value={fecha_inicio}
                onChange={(e) => setfecha_inicio(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Fecha Fin
              </label>
              <input
                className="w-full rounded-md p-3 bg-[#e8deef] dark:bg-[#4b2e67] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="month"
                required
                value={fecha_fin}
                onChange={(e) => setfecha_fin(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
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

          <input
            type="submit"
            value="Guardar Empleo"
            className="bg-[#7B2FE0] hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-md transition duration-200 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default HistoryForm;

