import AplicacionPanelClient from './AplicacionPanelClient';

export default function Page() {
  return (
    <main className="relative h-full text-white p-5">
      <div className="relative z-30 bg-transparent p-4">
        <h1 className="text-3xl font-bold">Proyectos disponibles</h1>
      </div>

      <div className="relative z-10 w-full max-h-[34rem] overflow-y-scroll no-scrollbar md:max-h-[41rem] md:scrollbar">
        <AplicacionPanelClient />
      </div>
    </main>
  );
}
