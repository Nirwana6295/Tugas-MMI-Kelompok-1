"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  BookOpen,
  MapPin,
  Award,
  LogIn,
  User,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Server,
  Sun,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface AppNavbarProps {
  userRole?: "STUDENT" | "TEACHER" | "VALIDATOR" | "ADMIN" | null;
  userName?: string | null;
}

export function AppNavbar({ userRole = null, userName = null }: AppNavbarProps) {
  const pathname = usePathname();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("08:15 WIB");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Peta Konsep", href: "/dashboard" },
    { label: "Materi Geosfer", href: "/chapters/litosfer" },
    { label: "Spatial Explorer", href: "/map-explorer" },
    { label: "Asesmen C4", href: "/chapters/litosfer/quiz/instructions" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 pointer-events-none mb-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Minimalist Brand Pill */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white hover:border-white/30 transition-all shadow-lg group"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 to-[#00D2EE] flex items-center justify-center text-[#011024]">
            <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </div>
          <span className="font-editorial text-sm tracking-wide text-white">
            GeoSpatial<span className="text-[#00D2EE] italic font-bold">X</span>
          </span>
        </Link>

        {/* Center: Floating Island Navigation Pill (like reference images) */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill">
          <Link
            href="/"
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all mr-1"
            title="Beranda"
          >
            <Sun className="w-3.5 h-3.5 text-amber-300" />
          </Link>

          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Quick CTA Pill inside Island */}
          <div className="ml-1.5 relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000814]/85 text-xs text-white border border-white/20 hover:border-[#00D2EE]/60 hover:text-[#00D2EE] transition-all shadow-sm"
            >
              <span className="text-[11px] font-semibold">
                {userRole ? `Peran: ${userRole}` : "Pilih Peran"}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${roleMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {roleMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#04162B]/95 border border-white/20 shadow-2xl p-2 z-50 text-xs space-y-1 backdrop-blur-2xl animate-fadeIn"
                onClick={() => setRoleMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-white/10">
                  Akses 4 Peran Sistem
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Siswa (Student)</div>
                    <div className="text-[10px] text-slate-400">Peta Konsep & Belajar</div>
                  </div>
                </Link>
                <Link
                  href="/studio/teacher"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Guru (Teacher)</div>
                    <div className="text-[10px] text-slate-400">Analitik & Bank Soal C4</div>
                  </div>
                </Link>
                <Link
                  href="/studio/validator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-white">Validator (Ahli)</div>
                    <div className="text-[10px] text-slate-400">Verifikasi Soal & Lisensi</div>
                  </div>
                </Link>
                <Link
                  href="/admin/system"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Server className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">Admin (System)</div>
                    <div className="text-[10px] text-slate-400">Infrastruktur & Kuota Map</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Timestamp & School Badge (Matches the top-right indicator in Image 1) */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-[11px] text-slate-300 font-mono">
            <Clock className="w-3 h-3 text-[#00D2EE]" />
            <span>{currentTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200">SMAN 1 Mejayan</span>
          </div>

          {!userRole && (
            <Link
              href="/login"
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-[#011024] font-semibold text-xs hover:bg-slate-200 transition-all shadow-md"
            >
              <span>Masuk</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
