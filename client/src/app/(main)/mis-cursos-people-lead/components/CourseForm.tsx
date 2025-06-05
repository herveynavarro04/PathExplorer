"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface CourseFormProps {
  onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onClose }) => {
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    duration: "",
    date_obtained: "",
    course_url: "",
    information: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        closeAnimation();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`bg-[#f3e8ff] text-[#2b2b2b] rounded-3xl p-8 max-w-xl w-full relative shadow-xl transition-all duration-300 ease-in-out ${
          isVisible ? "animate-fadeInModal" : "animate-fadeOutModal"
        }`}
      >
        <button
          onClick={closeAnimation}
          className="absolute top-4 right-4 text-lg font-bold bg-[#e0cfe6] hover:bg-[#d1c0db] text-[#4B0082] rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 border-b border-[#d7bff1] pb-2">
          Agregar curso
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Institución</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Duración (horas)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-1">
                Fecha de obtención
              </label>
              <input
                type="date"
                name="date_obtained"
                value={formData.date_obtained}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">URL del curso</label>
            <input
              type="url"
              name="course_url"
              value={formData.course_url}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="information"
              rows={3}
              value={formData.information}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 resize-none"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CourseForm;
