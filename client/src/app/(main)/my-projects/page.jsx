import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import ProyectoCardServer from './ProyectoCardServer';

export default function MyProjectsPage() {
  return (
    <div className="relative h-full text-white p-5">
      <div className="relative z-30 bg-transparent p-4 flex justify-end">
        <div className="relative group flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Mis Proyectos</h1>
          <FaInfoCircle className="text-xl cursor-pointer" />

          <div className="absolute right-0 top-full mt-2 w-80 p-5 bg-[#2c0352] text-gray-300 rounded-2xl shadow-lg text-base z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-purple-600">
            <h3 className="text-md font-semibold mb-4 text-gray-200">Simbología</h3>

            <div className="flex items-center space-x-3 mb-4">
                <img src="/Disc.svg" alt="Proyecto actual" className="w-6 h-6" />
                <span className="text-sm">Proyecto actual</span>
            </div>

            <div className="flex items-center space-x-3">
                <div className="text-2xl">
                <FaCheckCircle className="transform scale-[1.2]" />
                </div>
                <span className="text-sm">Proyecto finalizado</span>
            </div>
            </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-h-[34rem] overflow-y-scroll no-scrollbar md:max-h-[41rem] md:scrollbar">
        <div className="p-4 space-y-4">
          <div >
            <ProyectoCardServer idEmpleado={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
