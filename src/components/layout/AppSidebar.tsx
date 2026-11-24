"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Mountain,
  CloudRain,
  Droplets,
  Leaf,
  Users,
  Map,
  Award,
  CheckCircle2,
  Lock,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleNav {
  slug: string;
  title: string;
  sphere: string;
  color: string;
  icon: React.ElementType;
  progress: number;
  isUnlocked: boolean;
}

const modulesList: ModuleNav[] = [
  {
    slug: "litosfer",
    title: "Dinamika Litosfer",
    sphere: "Lapisan Kerak & Batuan",
    color: "#D9480F",
    icon: Flame,
    progress: 100,
    isUnlocked: true,
  },
  {
    slug: "pedosfer",
    title: "Dinamika Pedosfer",
    sphere: "Tanah & Konservasi",
    color: "#D97706",
    icon: Mountain,
    progress: 60,
    isUnlocked: true,
  },
  {
    slug: "atmosfer",
    title: "Dinamika Atmosfer",
    sphere: "Cuaca & Iklim",
    color: "#38BDF8",
    icon: CloudRain,
    progress: 0,
    isUnlocked: true,
  },
  {
    slug: "hidrosfer",
    title: "Dinamika Hidrosfer",
    sphere: "Perairan & DAS Madiun",
    color: "#0284C7",
    icon: Droplets,
    progress: 0,
    isUnlocked: true,
  },
  {
    slug: "biosfer",
    title: "Dinamika Biosfer",
    sphere: "Flora, Fauna, Bioma",
    color: "#10B981",
    icon: Leaf,
    progress: 0,
    isUnlocked: true,
  },
  {
    slug: "antroposfer",
    title: "Dinamika Antroposfer",
    sphere: "Manusia & Lingkungan",
    color: "#8B5CF6",
    icon: Users,
    progress: 0,
    isUnlocked: true,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-card-fresh rounded-3xl m-3 p-4 flex flex-col justify-between hidden lg:flex border border-white/10 shrink-0 self-start sticky top-24">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Modul Geosfer
            </span>
            <span className="text-[10px] text-slate-400 font-mono">6 Bab</span>
          </div>

          <div className="space-y-1.5">
            {modulesList.map((mod) => {
              const Icon = mod.icon;
              const isActive = pathname?.includes(`/chapters/${mod.slug}`) || pathname?.includes(`/learn/${mod.slug}`);
              return (
                <Link
                  key={mod.slug}
                  href={`/learn/${mod.slug}/${mod.slug === "litosfer" ? "lit-01" : mod.slug === "pedosfer" ? "ped-01" : mod.slug === "atmosfer" ? "atm-01" : mod.slug === "hidrosfer" ? "hid-01" : mod.slug === "biosfer" ? "bio-01" : "ant-01"}`}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-2xl border transition-all text-xs font-semibold group",
                    isActive
                      ? "bg-white/15 border-white/30 text-white shadow-sm"
                      : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${mod.color}25`,
                        color: mod.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight font-medium">{mod.title.replace("Dinamika ", "")}</div>
                      <div className="text-[10px] text-slate-400 font-light truncate max-w-[110px]">
                        {mod.sphere}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {mod.progress === 100 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : mod.isUnlocked ? (
                      <span className="text-[10px] font-mono text-slate-400">{mod.progress}%</span>
                    ) : (
                      <Lock className="w-3 h-3 text-slate-500" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Spatial Explorer Shortcut Card */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Compass className="w-4 h-4 text-[#00D2EE]" />
            <span>Spatial Explorer</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug font-light">
            Eksplorasi peta 3 level: Lempeng dunia, DAS Madiun, dan SMAN 1 Mejayan.
          </p>
          <Link
            href="/map-explorer"
            className="block text-center py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-all"
          >
            Buka Peta ↗
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 text-center font-mono">
        SMAN 1 Mejayan • 2026
      </div>
    </aside>
  );
}
