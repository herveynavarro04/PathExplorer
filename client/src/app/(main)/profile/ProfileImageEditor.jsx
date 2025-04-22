'use client';
import { useState } from 'react';

const ProfileImageEditor = () => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    console.log('Selected image:', file.name);

    setTimeout(() => setLoading(false), 1500); 
  };

  return (
    <label className="absolute bottom-0 right-0 bg-[#8e44ad] p-2 text-xs rounded-full cursor-pointer hover:scale-110 transition-transform">
      <input type="file" accept="image/*" hidden onChange={handleChange} />
      ✏️
    </label>
  );
};

export default ProfileImageEditor;
