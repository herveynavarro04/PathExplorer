// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/login");
// }

"use client";

import { SidebarProvider } from "components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
