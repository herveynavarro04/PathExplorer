
// 'use client';

// import { useState } from 'react';
// import Header from '@/components/Header';
// import Navbar from '@/components/Navbar';

// export default function RootLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className={`relative flex min-h-screen h-full flex-col overflow-x-hidden ${isSidebarOpen ? 'overflow-hidden md:overflow-auto' : ''}`}>
//       <Header onToggleSidebar={handleToggleSidebar} />
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 z-30 md:hidden"
//         />
//       )}

//       <div className="flex flex-1 md:pt-20 pt-14">
//         <Navbar isOpen={isSidebarOpen} />

//         <main className="flex-1 overflow-auto lg:overflow-hidden z-10 relative">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import ClientLayout from './ClientLayout';

export default async function MainLayout({ children }) {

  const response = await fetch('http://localhost:3000/empleado.json');
  const data = await response.json();

  const empleado = data.empleados.find((emp) => emp.id_empleado === 1);
  const puesto = data.empleado_proyecto.find(
    (ep) => ep.id_empleado === 1
  )?.puesto;

  const profile = {
    nombre: empleado?.nombre || 'N/A',
    url_foto: empleado?.url_foto || '/profile.png',
    correo: empleado?.correo || 'N/A',
    puesto: puesto || 'N/A',
  };

  return (
    <ClientLayout profile={profile}>
      {children}
    </ClientLayout>
  );
}
