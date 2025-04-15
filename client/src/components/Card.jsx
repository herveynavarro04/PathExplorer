
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Card = ({ title = 'Historial profesional', height = 'h-40 md:h-60', href = '' }) => {
  const router = useRouter();

  return (
    <div
      className={`
        group relative w-full overflow-hidden rounded-2xl 
        transition duration-300 ease-in-out 
        hover:-translate-y-1 hover:scale-110 
        shadow-xl ${height} hover:cursor-pointer
        bg-gradient-to-br from-[#006b75] via-[#7B2FE0] to-[#3A005F]
      `}
      onClick={() => router.push(href)}
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Timeline 1.mp4" type="video/mp4" />
        Tu browser no soporta videos
      </video>

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="absolute bottom-0 w-full px-6 py-4 bg-gradient-to-b from-white/10 to-white/0 z-20">
        <h2 className="text-[#c0bdc2] text-md md:text-xl font-medium">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
