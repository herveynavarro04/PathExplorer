import { cn } from "lib/utils";

type PropsType = {
  startDate: string;
  endDate: string;
  className?: string;
};

export default function DatesCard({ startDate, endDate, className }: PropsType) {
  return (
    <div className={cn("rounded-xl bg-white dark:bg-[#311a42] px-5 py-2 text-sm text-gray-700 dark:text-gray-300", className)}>
      <div className="flex justify-between">
        <div className="pl-6">
          <p className="text-sm font-medium text-black dark:text-white mb-1">Inicio</p>
          <div className="text-[#65417f] rounded-xl w-fit font-medium">{startDate}</div>
        </div>
        <div className="pr-6">
          <p className="text-sm font-medium text-black dark:text-white mb-1">Fin</p>
          <div className="text-[#65417f] rounded-xl w-fit font-medium">{endDate}</div>
        </div>
      </div>
    </div>
  );
}
