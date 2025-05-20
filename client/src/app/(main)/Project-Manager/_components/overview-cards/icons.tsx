import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

export function ArrowRight(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <path
        d="M23 29h25m0 0l-7-7m7 7l-7 7"
        stroke="#5a3bb3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
