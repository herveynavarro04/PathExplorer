"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  firstName: string;
  lastName: string;
  position: string;
}

export default function TeamMemberCard({
  firstName,
  lastName,
  position,
}: Props) {
      const router = useRouter();

  const handleClick = () => {
    const fullName = encodeURIComponent(`${firstName} ${lastName}`);
    router.push(`/miembro/${fullName}`);
  };
  return (

     <motion.div
      onClick={handleClick}
      whileHover={{
        scale: 1.07,
        rotateX: 4,
        rotateY: -4,
        boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
        transition: { type: "tween", duration: 0.15, ease: "easeOut" },
      }}
      style={{ perspective: 1000 }}
      className="cursor-pointer w-[180px] h-[260px] bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-xl
        ring-1 ring-gray-200 dark:ring-white/10 transition-all duration-300
        flex flex-col items-center justify-center text-center p-4 shadow-md hover:shadow-2xl transform-gpu"
    >
      <div className="relative">
        <img
          src="/profile.png"
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-600 mb-4"
        />
      </div>

      <h4 className="text-[#65417f] dark:text-white font-semibold text-base leading-tight mb-1">
        {firstName} {lastName}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{position}</p>
    </motion.div>
  );
}

