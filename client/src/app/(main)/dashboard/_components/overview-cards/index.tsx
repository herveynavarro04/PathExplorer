import { OverviewCard } from "./card";
import * as icons from "./icons";
import Link from "next/link";

export function OverviewCardsGroup() {

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Link href="/historial">
      <OverviewCard
        data="Historial Profesional"
        Icon={icons.History}
      />
      </Link>

      <Link href="/path">
      <OverviewCard
        data="Path de Carrera"
        
        Icon={icons.Compass}
      />
      </Link>

      <Link href="/Cursos">

      <OverviewCard
        data="Cursos"
        
        Icon={icons.Courses}
      />
      </Link>

      <Link href="/Certificados">

      <OverviewCard
        data="Certificados"
        
        Icon={icons.GraduationCap}
      />
      </Link>
    </div>
  );
}
