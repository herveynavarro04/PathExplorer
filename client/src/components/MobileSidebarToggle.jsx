'use client';

export default function MobileSidebarToggle({ onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden block text-2xl"
      aria-label="Toggle sidebar"
    >
      ☰
    </button>
  );
}
