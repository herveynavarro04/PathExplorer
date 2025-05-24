

import { cn } from "lib/utils";

export default function ClientCard({ client }: { client: string }) {
  return (
    <div className={cn("rounded-xl bg-white dark:bg-[#311a42]2")}>
      <h3 className="pl-5 pt-1 pb-1 text-md text-gray-800 dark:text-white">
        Cliente
      </h3>

      <div className="h-12 flex pb-3 items-center text-2xl justify-center font-bold text-gray-700 dark:text-gray-300">
        <span>{client}</span>
      </div>
    </div>
  );
}
