import { cn } from "lib/utils";
import type { ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode; 
};

export function ShowcaseSection({ title, children, className, action }: PropsType) {
  return (
    <div className="rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#311a42] dark:shadow-card">
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 sm:px-6 xl:px-7.5 dark:border-dark-3">
        <h2 className="font-medium text-dark dark:text-white">{title}</h2>
        {action && <div>{action}</div>}
      </div>

      <div className={cn("p-4 sm:p-6 xl:p-10", className)}>{children}</div>
    </div>
  );
}

