import { OverviewCard } from "./card";
import * as icons from "./icons";
import Link from "next/link";

export function OverviewCardsGroup() {

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <Link href="/proyectos-actuales">
      <OverviewCard
        data="Proyectos Actuales"
        Icon={icons.ArrowRight}
      />
      </Link>

      <Link href="/Aplicantes">
      <OverviewCard
        data="Aplicantes a Proyectos"
        Icon={icons.ArrowRight}
      />
      </Link>
    </div>
  );
}
