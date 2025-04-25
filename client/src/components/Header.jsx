
import Image from 'next/image';
import HeaderActions from './HeaderActions'; 
import MobileSidebarToggle from './MobileSidebarToggle';
import Link from 'next/link';

export default function Header({ onToggleSidebar, profile }) {
  return (
    <header className="fixed top-0 z-50 w-full text-[#c4adc6] p-3 flex bg-[#0f070f] justify-between items-center shadow-md">
      <div className="flex items-center gap-3 pl-3">
      <MobileSidebarToggle onToggle={onToggleSidebar} />


      <Link href="/dashboard">

      <Image 
          src="/logo.svg"
          alt="Logo"
          width={70}
          height={80}
          className="object-contain h-7 w-auto transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
        />
        </Link>
        
        

        <span className="hidden md:inline-block pl-24 text-2xl pr-5">
          Bienvenido {profile.nombre}
        </span>

        <Image
          src="/profile.png"
          alt="profilephoto"
          width={48}
          height={48}
          className="hidden md:block object-cover rounded-full h-12 w-12"
        />
      </div>

      <HeaderActions />
    </header>
  );
}
