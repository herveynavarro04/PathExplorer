"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaCheck, FaRegEdit, FaTimes } from "react-icons/fa";

interface ProgressCardProps {
  progress: number;
  setProgress: (value: number) => void;
  editable?: boolean;
  patchData: (updatedFields: Record<string, any>) => void;
}

export default function ProgressCard({
  progress,
  setProgress,
  patchData,
  editable = true,
}: ProgressCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProgress, setTempProgress] = useState(progress);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const rawProgress = useMotionValue(progress);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 15,
  });

  const dashOffset = useTransform(
    smoothProgress,
    (p) => 2 * Math.PI * 45 * (1 - p / 100)
  );
  const cx = useTransform(
    smoothProgress,
    (p) => 50 + 45 * Math.cos((p * 3.6 - 90) * (Math.PI / 180))
  );
  const cy = useTransform(
    smoothProgress,
    (p) => 50 + 45 * Math.sin((p * 3.6 - 90) * (Math.PI / 180))
  );

  useEffect(() => {
    rawProgress.set(isEditing ? tempProgress : progress);
  }, [tempProgress, progress, isEditing]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await patchData({ progress: tempProgress });
      setProgress(tempProgress);
      setIsEditing(false);
    } catch (error) {
      console.error("Error patching", error);
    }
  };

  const handleCancel = () => {
    setTempProgress(progress);
    setIsEditing(false);
  };

  const calculateProgressFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalized = (angle + 360 + 90) % 360;
    const percentage = Math.round((normalized / 360) * 100);
    setTempProgress(Math.max(0, Math.min(100, percentage)));
  };

  const isInTailZone = (e: MouseEvent | React.MouseEvent): boolean => {
    if (!svgRef.current) return false;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalized = (angle + 360 + 90) % 360;
    const currentAngle = ((isEditing ? tempProgress : progress) / 100) * 360;
    const diff = Math.abs(normalized - currentAngle);
    const delta = Math.min(diff, 360 - diff);
    return delta < 15;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      calculateProgressFromMouse(e);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="rounded-[10px] bg-[#f8f6fa] shadow-1 dark:bg-[#311a42] dark:shadow-card">
      <div className="flex items-center justify-between border-b border-stroke px-4 py-4 sm:px-6 xl:px-7.5 dark:border-dark-3">
        <h2 className="font-medium text-dark dark:text-white">
          Progreso del proyecto
        </h2>
        {editable &&
          (isEditing ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#65417f] px-2 py-[5px] font-medium text-white hover:bg-opacity-90"
              >
                <FaCheck size={14} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-[#65417f] dark:text-gray-300 dark:hover:text-white"
            >
              <FaRegEdit size={15} />
            </button>
          ))}
      </div>

      <div className="p-4 sm:p-6 xl:p-10">
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mt-4 relative cursor-pointer"
          onMouseDown={(e) => {
            if (isInTailZone(e)) {
              setIsDragging(true);
              calculateProgressFromMouse(e);
            }
          }}
        >
          <svg ref={svgRef} className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#c6b0dc"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#65417f"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ strokeDashoffset: dashOffset }}
            />
            {/* Cola visual: morado con borde blanco */}
            <motion.circle r="6" fill="white" style={{ cx, cy }} />
            <motion.circle r="4" fill="#65417f" style={{ cx, cy }} />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#65417f]">
            {isEditing ? tempProgress : progress}%
          </div>
        </div>

        {!isEditing && editable && (
          <div className="mt-4 text-center">
            <p className="inline-block text-xs rounded-md px-2 py-1 text-gray-900 dark:text-white">
              Actualiza el progreso del proyecto
            </p>
          </div>
        )}

        {editable && isEditing && (
          <div className="mt-4 text-center">
            <input
              type="number"
              value={tempProgress}
              onChange={(e) => {
                const val = Math.min(
                  100,
                  Math.max(0, parseInt(e.target.value))
                );
                setTempProgress(isNaN(val) ? 0 : val);
              }}
              className="text-center w-20 rounded-md px-2 py-1 bg-gray-100 dark:bg-[#443153] text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-[#65417f]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
