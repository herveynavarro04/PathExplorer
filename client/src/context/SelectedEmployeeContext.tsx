"use client";

import { createContext, useContext, useState } from "react";

const SelectedEmployeeContext = createContext<{
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string) => void;
}>({
  selectedEmployeeId: null,
  setSelectedEmployeeId: () => {},
});

export const SelectedEmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  return (
    <SelectedEmployeeContext.Provider
      value={{ selectedEmployeeId, setSelectedEmployeeId }}
    >
      {children}
    </SelectedEmployeeContext.Provider>
  );
};

export const useSelectedEmployee = () => useContext(SelectedEmployeeContext);
