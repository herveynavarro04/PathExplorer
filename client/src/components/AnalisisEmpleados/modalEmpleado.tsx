// components/AddEmployeeModal.tsx
import React from "react";

type AddEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  onAdd: (name: string) => void;
};

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  employeeName,
  onAdd,
}) => {
  if (!isOpen) return null;

  const [added, setAdded] = React.useState(false);

  const handleAdd = () => {
    onAdd(employeeName);
    setAdded(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-[#f8f6fa] text-dark-5 dark:bg-[#411F57FF] dark:text-dark-6 rounded-xl shadow-lg p-6 text-center relative w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold hover:bg-[#9F86B1FF] dark:hover:bg-[#FFFFFF1A] rounded-lg px-4 py-2 transition-colors duration-200"
        >
          ×
        </button>

        <img
          src="/profile.png"
          alt="Empleado"
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
        <h2 className="text-lg font-medium mb-2">{employeeName}</h2>
        <div className="rounded-xl">
          <input
            type="text"
            className="w-full bg-[#e6d6f5] dark:bg-[#C3ABD9FF] text-[#5a3bb3] font-semibold py-3 px-7 rounded-xl mb-6 text-center"
            placeholder="Puesto dentro del proyecto"
          />
        </div>
        {!added ? (
          <button
            onClick={handleAdd}
            className="bg-[#5a3bb3] dark:bg-[#6F3C9EFF] text-white py-2 px-6 rounded-full hover:bg-[#B98ED8FF] dark:hover:bg-[#CB99EFDC] rounded-lg px-4 py-2 transition-colors duration-200"
          >
            Añadir
          </button>
        ) : (
          <button
            disabled
            className="bg-[#1CC55DFF] dark:bg-[#1C8D47FF] text-white py-2 px-6 rounded-full text-center mx-auto block"
          >
            Añadido
          </button>
        )}
      </div>
    </div>
  );
};
