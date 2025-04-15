
import Image from 'next/image';
import HeaderActions from './HeaderActions'; 
import MobileSidebarToggle from './MobileSidebarToggle';

export default function Header({ onToggleSidebar }) {
  return (
    <header className="fixed top-0 z-50 w-full text-white p-3 flex bg-[#0f070f] justify-between items-center shadow-md">
      <div className="flex items-center gap-3 pl-3">
      <MobileSidebarToggle onToggle={onToggleSidebar} />


        <Image
          src="/logo.svg"
          alt="Logo"
          width={70}
          height={80}
          className="object-contain h-7 w-auto"
        />

        <span className="hidden md:inline-block pl-24 text-2xl pr-5">
          Bienvenido Sergio Tomás Vargas
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
