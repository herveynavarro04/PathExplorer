"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import InfoTooltip from "./InfoTooltip";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HeaderActions() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token removed from local storage");
    router.push("/login");
  };

  return (
    <div className="relative flex items-center gap-6" ref={dropdownRef}>
      <div className="flex items-center gap-1 text-sm">
        <FaArrowUp className="text-purple-300" />
        Nivel 12
        <div className="transition duration-300 ease-in-out hover:scale-110">
          <InfoTooltip />
        </div>
      </div>

      <button
        aria-label="Settings"
        className="bg-gray-400 p-2 rounded-full hover:cursor-pointer transition duration-300 ease-in-out hover:scale-125"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FiSettings className="text-[#8c688e]" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-12 mt-2 w-32 bg-white text-black rounded-md shadow-lg py-2 z-50 transition duration-300 ease-out hover:scale-110">
          <button
            className="w-full text-left px-4 py-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
