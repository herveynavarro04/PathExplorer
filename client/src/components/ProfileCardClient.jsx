'use client';

import Image from 'next/image';
import ProfileImageEditor from './ProfileImageEditor';
import PasswordEditor from './PasswordEditor';

const ProfileCardClient = ({ profile }) => {
  return (
    <div
      className="relative w-full max-w-3xl rounded-3xl p-8
      bg-gradient-to-br  from-[#006b75] via-[#7B2FE0] to-[#3A005F]
      text-[#151515] shadow-2xl flex flex-col md:flex-row items-start gap-8 overflow-hidden
      transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"

    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-[140px] h-[140px] mb-4">
            <Image
              src={profile.image}
              alt="Foto de perfil"
              fill
              className="rounded-full object-cover"
            />
            <ProfileImageEditor />
          </div>
          <button className="bg-[#2c0c53] hover:bg-[#4c1d91] transition px-6 py-2 rounded-xl text-white font-semibold mt-4">
            Guardar
          </button>
        </div>

        <div className="flex-1 space-y-6 text-left">
          <div>
            <p className="text-md font-light">Nombre</p>
            <p className="font-medium text-[#8ca7d7]">{profile.name}</p>
          </div>
          <div>
            <p className="text-md font-light">Puesto en proyecto actual</p>
            <p className="text-[#8ca7d7]">{profile.role}</p>
          </div>
          <div>
            <p className="text-md font-light">Correo</p>
            <p className="text-[#8ca7d7]">{profile.email}</p>
          </div>
          <PasswordEditor />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardClient;
