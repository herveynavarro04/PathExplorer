
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`relative flex min-h-screen h-full flex-col overflow-x-hidden ${isSidebarOpen ? 'overflow-hidden md:overflow-auto' : ''}`}>
      <Header onToggleSidebar={handleToggleSidebar} />
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 md:hidden"
        />
      )}

      <div className="flex flex-1 md:pt-20 pt-14">
        <Navbar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-auto lg:overflow-hidden z-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
