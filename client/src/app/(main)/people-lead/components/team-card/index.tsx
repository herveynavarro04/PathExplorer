import { OverviewCard } from "./card";
import * as icons from "./icons";
import Link from "next/link";

export function TeamCardGroup() {

  return (
    <div className="max-h-[700px] grid gap-4 sm:grid sm:gap-6 xl:grid 2xl:gap-7.5 ">

      
      <OverviewCard
        data="Mi Equipo"
        Icon={icons.ArrowRight}
      />
    </div>
  );
}