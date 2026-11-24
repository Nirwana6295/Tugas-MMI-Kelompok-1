"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  Mountain,
  CloudRain,
  Droplets,
  Leaf,
  Users,
  Map,
  Award,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Compass,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ModuleCardData {
  id: string;
  slug: string;
  number: string;
  title: string;
  sphere: string;
  summary: string;
  keyPoints: string[];
  themeColor: string;
  icon: React.ElementType;
  progressPercent: number;
  totalSubMaterials: number;
  completedSubMaterials: number;
  isQuizUnlocked: boolean;
}

export default function StudentDashboardPage() {
  const modules: ModuleCardData[] = [
    {
      id: "mod-1",
      slug: "litosfer",
      number: "01",
      title: "Dinamika Litosfer",
      sphere: "Litosfer",
      summary: "Bentuk muka bumi, struktur internal kerak bumi dan proses geologis tektonisme serta gempa.",
      keyPoints: [
        "Struktur Kerak, Mantel, Inti Bumi",
        "Tenaga Endogen (Tektonisme, Vulkanisme, Seisme)",
        "Mitigasi Gempa Pesisir Selatan & Wilis",
      ],
      themeColor: "#D9480F",
      icon: Flame,
      progressPercent: 100,
      totalSubMaterials: 3,
      completedSubMaterials: 3,
      isQuizUnlocked: true,
    },
    {
      id: "mod-2",
      slug: "pedosfer",
      number: "02",
      title: "Dinamika Pedosfer",
      sphere: "Pedosfer",
      summary: "Proses pembentukan tanah, profil horizon O-A-B-C-R, dan konservasi lahan lereng Wilis.",
      keyPoints: [
        "5 Faktor Pembentuk Tanah (Pedogenesis)",
        "Profil Horizon Tanah O-A-B-C-R",
        "Kerusakan Erosi & Konservasi Terasering",
      ],
      themeColor: "#D97706",
      icon: Mountain,
      progressPercent: 66,
      totalSubMaterials: 3,
      completedSubMaterials: 2,
      isQuizUnlocked: false,
    },
    {
      id: "mod-3",
      slug: "atmosfer",
      number: "03",
      title: "Dinamika Atmosfer",
      sphere: "Atmosfer",
      summary: "Lapisan udara, dinamika cuaca, awan konvektif, angin muson barat-timur dan variabilitas iklim.",
      keyPoints: [
        "Lapisan Troposfer hingga Eksosfer",
        "Unsur Cuaca & Klasifikasi Awan BMKG",
        "Angin Muson & Efek Rumah Kaca",
      ],
      themeColor: "#38BDF8",
      icon: CloudRain,
      progressPercent: 0,
      totalSubMaterials: 3,
      completedSubMaterials: 0,
      isQuizUnlocked: false,
    },
    {
      id: "mod-4",
      slug: "hidrosfer",
      number: "04",
      title: "Dinamika Hidrosfer",
      sphere: "Hidrosfer",
      summary: "Siklus air presipitasi-limpasan, Daerah Aliran Sungai (DAS) Bengawan Madiun, dan hukum laut.",
      keyPoints: [
        "Tahapan Lengkap Siklus Hidrologi",
        "Karakteristik DAS Bengawan Madiun",
        "Zonasi Kedalaman Laut & Batas ZEE",
      ],
      themeColor: "#0284C7",
      icon: Droplets,
      progressPercent: 0,
      totalSubMaterials: 3,
      completedSubMaterials: 0,
      isQuizUnlocked: false,
    },
    {
      id: "mod-5",
      slug: "biosfer",
      number: "05",
      title: "Dinamika Biosfer",
      sphere: "Biosfer",
      summary: "Bioma flora-fauna dunia, Garis Wallace & Weber, dan pelestarian satwa langka endemik Indonesia.",
      keyPoints: [
        "Faktor Persebaran Makhluk Hidup",
        "Garis Wallace & Weber (Fauna Asiatis, Wallacea, Australis)",
        "Konservasi Satwa Langka Endemik",
      ],
      themeColor: "#10B981",
      icon: Leaf,
      progressPercent: 0,
      totalSubMaterials: 3,
      completedSubMaterials: 0,
      isQuizUnlocked: false,
    },
    {
      id: "mod-6",
      slug: "antroposfer",
      number: "06",
      title: "Dinamika Antroposfer",
      sphere: "Antroposfer",
      summary: "Dinamika kependudukan, piramida penduduk, bonus demografi, dan penataan ruang kota Mejayan.",
      keyPoints: [
        "Piramida Penduduk Interaktif (Usia & Gender)",
        "Pemanfaatan Ruang & Interaksi Desa-Kota",
        "Dampak Deforestasi & Pembangunan Berkelanjutan",
      ],
      themeColor: "#8B5CF6",
      icon: Users,
      progressPercent: 0,
      totalSubMaterials: 3,
      completedSubMaterials: 0,
      isQuizUnlocked: false,
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner (Fresh Editorial Window Frame) */}
      <div className="window-canvas bg-gradient-to-b from-[#02407c] via-[#02254b] to-[#011024] p-8 sm:p-12 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2EE]" />
            <span>Peta Konsep & Jalur Belajar Geografi Kelas X SMA</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
            Peta Konsep Dinamika Geosfer
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
            Jelajahi keterkaitan antar unsur geosfer melalui 6 modul kurikulum kontekstual menuju pemahaman yang utuh, berbasis data spasial dan penalaran analisis.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-editorial italic text-cyan-200">
            <span>“Geografi bukan sekadar tentang tempat, tetapi tentang hubungan dan interaksi ruang.”</span>
          </div>
        </div>

        {/* Quick Action Badges */}
        <div className="relative z-10 pt-4 flex flex-wrap gap-3 items-center justify-between border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/map-explorer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00D2EE] text-[#011024] font-bold text-xs hover:bg-cyan-300 transition-all shadow-glow"
            >
              <Map className="w-4 h-4" />
              <span>Buka Spatial Explorer (Peta 3 Level)</span>
            </Link>
            <Link
              href="/chapters/litosfer/quiz/instructions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 border border-white/20 transition-all"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Asesmen Sumatif C4 (Bab Litosfer)</span>
            </Link>
          </div>

          <div className="text-xs text-slate-300 px-3 py-1 rounded-full glass-pill">
            Status: <span className="text-emerald-400 font-bold">1 Modul Tuntas (Litosfer)</span> • Kuis Terbuka
          </div>
        </div>
      </div>

      {/* 6 Modules Concept Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-[#00D2EE]" />
            <span>6 Sfera Dinamika Geosfer</span>
          </h2>
          <span className="text-xs text-slate-400">Pilih salah satu bab untuk memulai belajar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="glass-card-fresh rounded-3xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden transition-all hover:border-white/30"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: mod.themeColor }}
                />

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-md transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: `${mod.themeColor}25`,
                          color: mod.themeColor,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">
                          BAB {mod.number}
                        </span>
                        <h3 className="font-editorial text-xl text-white font-normal group-hover:text-cyan-200 transition-colors">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: mod.themeColor }}
                    />
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {mod.summary}
                  </p>

                  {/* Key points */}
                  <div className="p-3.5 rounded-2xl bg-[#011024]/80 border border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Fokus Kajian:
                    </span>
                    {mod.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-light">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: mod.themeColor }}
                        />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs text-slate-400 font-medium">
                      <span>Progres Ketuntasan</span>
                      <span className="font-bold text-white">{mod.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${mod.progressPercent}%`,
                          backgroundColor: mod.themeColor,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <Link
                    href={`/learn/${mod.slug}/${mod.slug === "litosfer" ? "lit-01" : mod.slug === "pedosfer" ? "ped-01" : mod.slug === "atmosfer" ? "atm-01" : mod.slug === "hidrosfer" ? "hid-01" : mod.slug === "biosfer" ? "bio-01" : "ant-01"}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Buka Materi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {mod.isQuizUnlocked ? (
                    <Link
                      href={`/chapters/${mod.slug}/quiz/instructions`}
                      className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                    >
                      <Award className="w-3 h-3" />
                      <span>Kuis C4 Terbuka</span>
                    </Link>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-white/5 text-[10px] flex items-center gap-1 cursor-not-allowed">
                      <Lock className="w-3 h-3" />
                      <span>Kuis Terkunci</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
