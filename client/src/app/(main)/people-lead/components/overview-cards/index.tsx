import { OverviewCard } from "./card";
import * as icons from "./icons";
import Link from "next/link";

export function OverviewCardsGroup() {

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <Link href="/crear-curso">
      <OverviewCard
        data="Crear Curso"
        Icon={icons.ArrowRight}
      />
      </Link>

      <Link href="/Notificaciones">
      <OverviewCard
        data="Notificaciones"
        Icon={icons.ArrowRight}
      />
      </Link>
    </div>
  );
}
