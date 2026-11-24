"use client";

import React, { useEffect, useState } from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState("Ridwan Putra");
  const [userRole, setUserRole] = useState<"STUDENT" | "TEACHER" | "VALIDATOR" | "ADMIN">("STUDENT");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("geospatialx_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setUserName(parsed.name);
          if (parsed.role) setUserRole(parsed.role);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] flex flex-col text-slate-100 p-2 sm:p-4">
      <AppNavbar userRole={userRole} userName={userName} />
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto gap-4">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
