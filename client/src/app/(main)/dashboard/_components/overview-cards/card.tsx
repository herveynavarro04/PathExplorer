
import type { JSX, SVGProps } from "react";

type PropsType = {
  data: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export function OverviewCard({ data, Icon }: PropsType) {

  return (
    <div className="rounded-[10px] bg-[#f8f6fa] p-6 shadow-1 dark:bg-[#311a42] transition hover:bg-[#a997ba] dark:hover:bg-[#76598a] hover:scale-105 hover:cursor-pointer">
      <Icon />

      <div className="mt-6 flex items-end justify-between">
        <dl>
          <dd className="text-2xl font-bold text-dark dark:text-white">{data}</dd>
        </dl>

       
      </div>
    </div>
  );
}
