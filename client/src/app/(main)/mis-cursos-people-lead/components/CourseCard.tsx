import React from "react";
import { cn } from "lib/utils";
import { FaCircleExclamation } from "react-icons/fa6";

type CourseCardProps = {
  courseId: string;
  title: string;
  information: string;
  mandatory: boolean;
  handleCourseClick: (course: any) => void;
};

const CourseCard = ({
  courseId,
  title,
  information,
  mandatory,
  handleCourseClick,
}: CourseCardProps) => {
  return (
    <div
      onClick={() => handleCourseClick(courseId)}
      className={cn(
        "rounded-[10px] bg-[#f8f6fa]  shadow-1 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out dark:bg-[#482a5e] dark:shadow-card relative h-[10rem]"
      )}
    >
      <div className="border-b border-stroke px-2 py-2 bg-[#eee9f3] dark:bg-[#644782] rounded-t-[10px] font-medium text-dark dark:border-dark dark:text-white sm:px-2 xl:px-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          {mandatory && <FaCircleExclamation />}
        </div>
      </div>

      <div className="h-[calc(100%-3rem)] flex items-center justify-center px-4 text-sm text-gray-700 dark:text-gray-200">
        <p className="text-center">{information}</p>
      </div>
    </div>
  );
};

export default CourseCard;
