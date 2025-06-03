"use client";

import { SidebarProvider } from "components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { SelectedEmployeeProvider } from "context/SelectedEmployeeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <SelectedEmployeeProvider>{children}</SelectedEmployeeProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
