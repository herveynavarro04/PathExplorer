import { ButtonCard } from "./button-card";
import Link from "next/link";

export function ButtonCardGroup() {

  return (
    <div className="grid gap-4 2xl:gap-7.5">
      <Link href="/historial">
      <ButtonCard
        data="Registar Proyecto"
      />
      </Link>
    </div>
  );
}
