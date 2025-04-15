
import React from 'react';

const CompatibleRolesCard = () => {
  return (
    <div className="group relative w-full h-60 md:min-h-[22rem] rounded-2xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 overflow-hidden shadow-xl bg-gradient-to-tl from-[#006b75] via-[#7B2FE0] to-[#3A005F]">
      
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/gradientback.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 z-10" />


      <div className="w-full h-20 bg-gradient-to-t from-white/10 to-white/0 z-20 flex items-center px-6">
        <h2 className="text-[#c0bdc2] text-md md:text-2xl font-medium">
          Roles compatibles con tu perfil
        </h2>
      </div>

      {/* layout modbil */}
      <div className="flex flex-col items-center gap-2 mt-6 xl:hidden z-20 md:pt-10 relative">
        <span className="bg-black/40 text-white text-sm px-4 py-2 rounded-lg group-hover:animate-float">
          Desarrollador Flutter
        </span>
        <span className="bg-black/40 text-white text-sm px-4 py-2 rounded-lg group-hover:animate-float delay-100">
          Desarrollador Angular
        </span>
        <span className="bg-black/40 text-white text-sm px-4 py-2 rounded-lg group-hover:animate-float delay-200">
          Ingeniero de APIs RESTful
        </span>
      </div>

      {/* layout desktop */}
      <div className="relative w-full h-full xl:mt-14 hidden xl:block z-20">
        <span className="absolute top-0 left-10 bg-black/40 text-[#c0bdc2] text-sm px-4 py-2 rounded-lg group-hover:animate-pulse">
          Desarrollador Flutter
        </span>
        <span className="absolute top-0 right-10 bg-black/40 text-[#c0bdc2] text-sm px-4 py-2 rounded-lg group-hover:animate-pulse ">
          Desarrollador Angular
        </span>
        <span className="absolute left-1/2 transform -translate-x-1/2 top-24 bg-black/40 text-[#c0bdc2] text-sm px-4 py-2 rounded-lg group-hover:animate-pulse">
          Ingeniero de APIs RESTful
        </span>
      </div>
    </div>
  );
};

export default CompatibleRolesCard;
