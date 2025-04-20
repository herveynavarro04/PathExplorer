
import Card from '@/components/Card';
import CompatibleRolesCard from '@/components/CompatibleRolesCard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full h-full gap-10 px-4 md:px-9 py-6">
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card title="Historial Profesional" href="/historial" />
        <Card  title="Path de Carrera" href="/path" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:pt-11">
        <div className="flex flex-row sm:grid sm:grid-cols-2 gap-10">
          <Card height="h-40 md:min-h-[22rem]" title="Cursos" href="/Cursos" />
          <Card height="h-40 md:min-h-[22rem]" title="Certificados" href="/Certificados" />
        </div>

        <div className="w-full">
          <CompatibleRolesCard />
        </div>
      </section>
    </div>
  );
}

