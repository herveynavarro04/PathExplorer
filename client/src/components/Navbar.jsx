
'use client';

import { FaHome, FaUser, FaChartBar, FaBriefcase } from 'react-icons/fa';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ isOpen }) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        'fixed left-0 z-40 h-full md:h-[40rem] w-64 bg-[#0f070f] transition-transform duration-300 md:relative md:translate-x-0 md:bg-transparent overflow-y-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      <nav className="flex flex-col space-y-11 pt-6 pl-6 pb-5 text-[#b1a5b1]">
        <Link
          href="/dashboard"
          className={clsx(
            'group relative flex items-center gap-5 transition duration-400 ease-in-out hover:scale-105',
            pathname === '/dashboard' ? 'text-[#9a62a1] scale-105' : '',
            'hover:text-[#9a62a1]'
          )}
        >
          <FaHome />
          <span className="relative">
            Dashboard
            <span
              className={clsx(
                'absolute left-0 -bottom-1 h-[2px] bg-[#9a62a1] transition-all duration-400',
                pathname === '/dashboard' ? 'w-full' : 'w-0',
                'group-hover:w-full'
              )}
            ></span>
          </span>
        </Link>

        <Link
          href="/profile"
          className={clsx(
            'group relative flex items-center gap-5 transition duration-400 ease-in-out hover:scale-105',
            pathname.startsWith('/profile') ? 'text-[#9a62a1] scale-105' : '',
            'hover:text-[#9a62a1]'
          )}
        >
          <FaUser />
          <span className="relative">
            Perfil
            <span
              className={clsx(
                'absolute left-0 -bottom-1 h-[2px] bg-[#9a62a1] transition-all duration-400',
                pathname.startsWith('/profile') ? 'w-full' : 'w-0',
                'group-hover:w-full'
              )}
            ></span>
          </span>
        </Link>

        <Link
          href="/Aplicacion"
          className={clsx(
            'group relative flex items-center gap-5 transition duration-400 ease-in-out hover:scale-105',
            pathname.startsWith('/Aplicacion') ? 'text-[#9a62a1] scale-105' : '',
            'hover:text-[#9a62a1]'
          )}
        >
          <FaChartBar />
          <span className="relative">
            Aplicación a proyectos
            <span
              className={clsx(
                'absolute left-0 -bottom-1 h-[2px] bg-[#9a62a1] transition-all duration-400',
                pathname.startsWith('/Aplicacion') ? 'w-full' : 'w-0',
                'group-hover:w-full'
              )}
            ></span>
          </span>
        </Link>


        <Link
          href="/my-projects"
          className={clsx(
            'group relative flex items-center gap-5 transition duration-400 ease-in-out hover:scale-105',
            pathname.startsWith('/my-projects') ? 'text-[#9a62a1] scale-105' : '',
            'hover:text-[#9a62a1]'
          )}
        >
          <FaBriefcase />
          <span className="relative">
            Mis proyectos
            <span
              className={clsx(
                'absolute left-0 -bottom-1 h-[2px] bg-[#9a62a1] transition-all duration-400',
                pathname.startsWith('/my-projects') ? 'w-full' : 'w-0',
                'group-hover:w-full'
              )}
            ></span>
          </span>
        </Link>
        
      </nav>
    </aside>
  );
}
