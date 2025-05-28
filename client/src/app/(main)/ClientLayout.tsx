"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "components/Layouts/sidebar";
import { Header } from "components/Layouts/header";
import Loading from "components/Loading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token && pathname !== "/login") {
      router.push("/login");
      setAuthorized(false);
      return;
    }

    if (
      rol === "manager" &&
      ["/Aplicacion", "/my-projects"].includes(pathname)
    ) {
      router.push("/dashboard");
      setAuthorized(false);
      return;
    }

    if (rol === "STAFF" && pathname === "/Project-Manager") {
      router.push("/dashboard");
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (authorized === null) {
    return <Loading fullScreen />;
  }

  if (!authorized && pathname !== "/login") {
    return null;
  }

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-[#d0bfdb] dark:bg-[#1b0e23]">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
