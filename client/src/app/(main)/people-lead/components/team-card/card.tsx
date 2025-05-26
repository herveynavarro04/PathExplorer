"use client"

import type { JSX, SVGProps } from "react";
import { useEffect, useState } from "react";
import { getEquipo } from "../fetch-equipo"; // Ajusta la ruta según tu estructura
import Link from "next/link";


type PropsType = {
    data: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

type Member = {
    name: string;
    role: string;
    cargability: string;
};

export function OverviewCard({ data, Icon }: PropsType) {
    const [team, setTeam] = useState<Member[]>([]);

    useEffect(() => {
        async function fetchTeam() {
            const data = await getEquipo();
            setTeam(data);
        }
        fetchTeam();
    }, []);

    return (
        <div className="h-full rounded-[10px] bg-[#f8f6fa] pt-2 p-6 shadow-1 dark:bg-[#311a42] ">
            <div className="max-h-[700px] mt-2 flex items-end justify-between transition px-2 pb-2">
                <dl>
                    <dd className="text-2xl font-semibold text-dark dark:text-white">{data}</dd>
                </dl>
                <Icon />
            </div>
            <div className="w-full max-h-[700px] flex gap-6 px-4 py-4 overflow-x-auto">
                {team.map((member, i) => (
                    <Link key={i} href={`/miembro/${encodeURIComponent(member.name)}`}>
                    <div className="max-h-[700px] flex-shrink-0 basis-[20%] flex flex-col items-center text-center px-2 hover:bg-[#C8B5DCFF] dark:hover:bg-[#76598a] hover:scale-100 hover:cursor-pointer rounded-[10px]">
                        <h4 className="text-[#65417f] dark:text-white font-semibold">{member.name}</h4>
                        <img
                        src="/profile.png"
                        alt={member.name}
                        className="w-20 h-20 mx-auto rounded-xl mb-2"
                        />
                        <p className="text-sm">{member.role}</p>
                        <p className="text-sm">{member.cargability}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
