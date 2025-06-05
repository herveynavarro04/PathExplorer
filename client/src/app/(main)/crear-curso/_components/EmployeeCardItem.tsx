"use client";

interface EmployeeCardItemProps {
  employeeId: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  mimeType?: string;
  handleToggleEmployee: (employeeId: string) => void;
  employeeSelected: (employeeId: string) => boolean;
}

export default function EmployeeCardItem({
  employeeId,
  firstName,
  lastName,
  profilePicture,
  mimeType,
  employeeSelected,
  handleToggleEmployee,
}: EmployeeCardItemProps) {
  const imageSrc =
    profilePicture && mimeType
      ? `data:${mimeType};base64,${profilePicture}`
      : "/profile.png";

  const isSelected = employeeSelected(employeeId);

  return (
    <div
      onClick={() => handleToggleEmployee(employeeId)}
      className={`relative w-[150px] flex-shrink-0 flex flex-col items-center text-center p-4 rounded-xl cursor-pointer transition-all border shadow-sm
        ${
          isSelected
            ? "bg-[#d9c5e5] border-[#65417f] dark:bg-[#76598a]"
            : "bg-white border-gray-200 dark:bg-[#3c2a4e] dark:border-transparent"
        } hover:shadow-lg hover:scale-[1.03]`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-10">
          ✓
        </div>
      )}

      <img
        src={imageSrc}
        alt="profile"
        className="w-16 h-16 mb-3 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
      <h4 className="text-[#65417f] dark:text-white font-semibold mb-1">
        {firstName} {lastName}
      </h4>
    </div>
  );
}
