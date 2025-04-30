import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

export function History(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#5a3bb3" />
      <rect x="17" y="10" width="24" height="38" rx="4" fill="#f8f6fa" />
      <path
        d="M29 12c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"
        fill="#5a3bb3"
      />
      <path d="M21 18h16a1 1 0 110 2H21a1 1 0 110-2z" fill="#5a3bb3" />
      <path d="M21 24h16a1 1 0 110 2H21a1 1 0 110-2z" fill="#5a3bb3" />
      <path d="M21 30h16a1 1 0 110 2H21a1 1 0 110-2z" fill="#5a3bb3" />
    </svg>
  );
}


export function Compass(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#5a3bb3" />
      
      <circle cx={29} cy={29} r={2.5} fill="#fff" />
      
      <path
        d="M29 12L29 46"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      <path
        d="M17 29L41 29"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M17.5 17.5L41.5 41.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M41.5 17.5L17.5 41.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}


export function Courses(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#5a3bb3" />
      <path
        d="M29 16l2.5 2 3-1 1 3 3 1-1 3 2 2.5-2 2.5 1 3-3 1-1 3-3-1-2.5 2-2.5-2-3 1-1-3-3-1 1-3-2-2.5 2-2.5-1-3 3-1 1-3 3 1 2.5-2z"
        fill="#fff"
      />
      <path
        d="M26 39l-2 4 5-2 5 2-2-4h-6z"
        fill="#fff"
      />
    </svg>
  );
}

export function GraduationCap(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#5a3bb3" />
      <path
        d="M29 18L12 26l17 8 17-8-17-8zm0 10c-5 0-9 3-9 3v4c0 3 4 5 9 5s9-2 9-5v-4s-4-3-9-3zm-15-2v6l3 1v-6l-3-1z"
        fill="#fff"
      />
    </svg>
  );
}


export function Users(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#18BFFF" />
      <ellipse
        cx={25.7511}
        cy={22.4998}
        rx={4.33333}
        ry={4.33333}
        fill="#fff"
      />
      <ellipse
        cx={25.7511}
        cy={34.4178}
        rx={7.58333}
        ry={4.33333}
        fill="#fff"
      />
      <path
        d="M38.75 34.417c0 1.795-2.206 3.25-4.898 3.25.793-.867 1.339-1.955 1.339-3.248 0-1.295-.547-2.384-1.342-3.252 2.693 0 4.9 1.455 4.9 3.25zM35.5 22.501a3.25 3.25 0 01-4.364 3.054 6.163 6.163 0 00.805-3.055c0-1.11-.293-2.152-.804-3.053A3.25 3.25 0 0135.5 22.5z"
        fill="#fff"
      />
    </svg>
  );
}
