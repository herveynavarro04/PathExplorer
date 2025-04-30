import "styles/satoshi.css";
import "styles/globals.css";

import { Sidebar } from "components/Layouts/sidebar";
import { Header } from "components/Layouts/header";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "PathExplorer",
    default: "PathExplorer",
  },
  description:
    "Path Explorer",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-[#d0bfdb] dark:bg-[#1b0e23]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
