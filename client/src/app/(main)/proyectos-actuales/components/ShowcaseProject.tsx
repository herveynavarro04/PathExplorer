import { cn } from "lib/utils";
import type { ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode; 
};

export function ShowcaseProject({ title, children, className, action }: PropsType) {
  return (
    <div className={cn("rounded-xl bg-white dark:bg-[#311a42]2", className)}>
        <h3 className="pl-5 pt-1 pb-1 text-md   text-gray-800 dark:text-white">{title}</h3>

      <div className="h-10 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
  <span>{children}</span>
</div>
    </div>
  );

}

