"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, User, Mail, School, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("Ridwan Putra Jaya");
  const [email, setEmail] = useState("siswa@sman1mejayan.sch.id");
  const [schoolClass, setSchoolClass] = useState("X-1");
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "TEACHER" | "VALIDATOR" | "ADMIN">("STUDENT");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "geospatialx_user",
        JSON.stringify({
          name: fullName,
          email,
          schoolClass,
          role: selectedRole,
        })
      );
    }

    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === "STUDENT") {
        router.push("/dashboard");
      } else if (selectedRole === "TEACHER") {
        router.push("/studio/teacher");
      } else if (selectedRole === "VALIDATOR") {
        router.push("/studio/validator");
      } else {
        router.push("/admin/system");
      }
    }, 400);
  };

  const demoPresets = [
    {
      role: "STUDENT" as const,
      label: "Siswa Kelas X",
      name: "Ridwan Putra Jaya",
      email: "siswa@sman1mejayan.sch.id",
      class: "X-1",
      badgeColor: "#00D2EE",
    },
    {
      role: "TEACHER" as const,
      label: "Guru Geografi",
      name: "Bpk. Bambang Sutrisno, M.Pd.",
      email: "guru.geografi@sman1mejayan.sch.id",
      class: "Guru Pengampu",
      badgeColor: "#10B981",
    },
    {
      role: "VALIDATOR" as const,
      label: "Validator Materi",
      name: "Dr. Rina Wulandari",
      email: "validator@mmi-geografi.id",
      class: "Tim Kurasi",
      badgeColor: "#D97706",
    },
    {
      role: "ADMIN" as const,
      label: "Admin Lab Sistem",
      name: "Admin Lab SMAN 1 Mejayan",
      email: "admin@sman1mejayan.sch.id",
      class: "Infrastruktur",
      badgeColor: "#8B5CF6",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#000814] relative overflow-hidden font-sans">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Back to Home Link */}
      <Link
        href="/"
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Main Login Window Card */}
      <div className="window-canvas bg-[#04162B]/85 border border-white/20 p-8 sm:p-10 max-w-lg w-full relative z-10 space-y-6 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-[#00D2EE] p-0.5 mx-auto shadow-glow flex items-center justify-center text-[#011024]">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-3xl font-normal text-white">
            Masuk ke GeoSpatial<span className="text-[#00D2EE] italic font-bold">X</span>
          </h2>
          <p className="text-xs text-slate-300 font-light">
            Platform Pembelajaran Geografi Kelas X • SMAN 1 Mejayan
          </p>
        </div>

        {/* Demo Role Selector Pills */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
            Pilih Peran Uji Coba Cepat (1-Click Preset)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {demoPresets.map((preset) => (
              <button
                type="button"
                key={preset.role}
                onClick={() => {
                  setSelectedRole(preset.role);
                  setFullName(preset.name);
                  setEmail(preset.email);
                  setSchoolClass(preset.class);
                }}
                className={`p-2.5 rounded-2xl border text-left text-xs transition-all flex flex-col justify-between ${
                  selectedRole === preset.role
                    ? "bg-white/15 border-[#00D2EE] text-white shadow-sm"
                    : "bg-[#011024]/60 border-white/10 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-white text-[11px]">{preset.label}</span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: preset.badgeColor }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-medium block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#011024] border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#00D2EE]"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Email Sekolah / Akun</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#011024] border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#00D2EE]"
              required
            />
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Kelas / Penugasan</label>
            <input
              type="text"
              value={schoolClass}
              onChange={(e) => setSchoolClass(e.target.value)}
              className="w-full bg-[#011024] border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#00D2EE]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#00D2EE] text-[#011024] font-bold text-xs hover:bg-cyan-300 transition-all shadow-glow flex items-center justify-center gap-2 mt-2"
          >
            <span>{isLoading ? "Memproses Masuk..." : `Masuk Sebagai ${selectedRole}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center font-light pt-2">
          Akun demo terintegrasi langsung dengan database PostGIS & sistem evaluasi C4.
        </p>
      </div>
    </div>
  );
}
