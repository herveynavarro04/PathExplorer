import { ButtonCard } from "./button-card";
import Link from "next/link";

export function ButtonCardGroup() {

  return (
    <div className="grid gap-8 2xl:gap-7.5">
      <Link href="/historial">
      <ButtonCard
        data="Registrar proyecto"
      />
      </Link>
    </div>
  );
}
