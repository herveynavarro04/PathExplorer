"use client";

import { Logo } from "components/logo";
import { cn } from "lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const rol =
    typeof window !== "undefined" ? localStorage.getItem("rol") : null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-gray-200 bg-[#f8f6fa] transition-[width] duration-200 ease-linear dark:border-[#1b0e23] dark:bg-[#311a42]",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0"
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={"/dashboard"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => {
              const filteredItems = section.items.filter((item) => {
                if (rol === "STAFF" && item.title === "Project Manager")
                  return false;
                if (
                  rol === "manager" &&
                  ["Aplicación a Proyectos", "Mis Proyectos"].includes(
                    item.title
                  )
                )
                  return false;
                return true;
              });

              if (filteredItems.length === 0) return null;

              return (
                <div key={section.label} className="mb-6">
                  <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                    {section.label}
                  </h2>
                  <nav role="navigation" aria-label={section.label}>
                    <ul className="space-y-2">
                      {filteredItems.map((item) => {
                        const href =
                          item.url ||
                          "/" + item.title.toLowerCase().split(" ").join("-");
                        return (
                          <li key={item.title}>
                            <MenuItem
                              className="flex items-center gap-3 py-3"
                              as="link"
                              href={href}
                              isActive={pathname === href}
                            >
                              <item.icon
                                className="size-6 shrink-0"
                                aria-hidden="true"
                              />
                              <span>{item.title}</span>
                            </MenuItem>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
