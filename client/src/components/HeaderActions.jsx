'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import InfoTooltip from './InfoTooltip';

export default function HeaderActions() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logica para logout');
  };

  return (
    <div className="relative flex items-center gap-6" ref={dropdownRef}>
      <div className="flex items-center gap-1 text-sm">
        <FaArrowUp className="text-gray-200" />
        Nivel 12
        <InfoTooltip />
      </div>

      <button
        aria-label="Settings"
        className="bg-gray-100 p-2 rounded-full hover:cursor-pointer"
        onClick={() => setShowDropdown(prev => !prev)}
      >
        <FiSettings className="text-gray-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-12 mt-2 w-32 bg-white text-black rounded-md shadow-lg py-2 z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
