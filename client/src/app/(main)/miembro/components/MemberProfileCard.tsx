"use client";

interface MemberProfileCardProps {
  name: string;
  level: string;
  position: string;
}

export default function MemberProfileCard({ name, level, position }: MemberProfileCardProps) {
  return (
    <div className="col-span-1 text-center bg-[#f8f6fa] dark:bg-[#311a42] max-h-[524px] rounded-2xl py-6 pb-8">
      <h2 className="text-3xl font-bold text-[#65417f] dark:text-white mb-8">
        {name}
      </h2>
      <img
        src="/profile.png"
        alt={name}
        className="w-40 h-40 mx-auto rounded-xl mb-8"
      />
      <p className="text-xl font-semibold mb-8">Nivel {level}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{position}</p>
    </div>
  );
}
