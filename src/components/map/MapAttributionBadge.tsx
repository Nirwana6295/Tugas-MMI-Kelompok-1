"use client";

import React, { useState } from "react";
import { ShieldCheck, Info, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface MapAttributionBadgeProps {
  activeLevel: 1 | 2 | 3;
  activeLayers: string[];
}

export function MapAttributionBadge({ activeLevel, activeLayers }: MapAttributionBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const layerAttributions: Record<
    string,
    { name: string; source: string; license: string; text: string; verified: boolean }
  > = {
    "lempeng-tektonik-indonesia": {
      name: "Batas Lempeng Tektonik & Ring of Fire",
      source: "Badan Informasi Geospasial (BIG) & USGS",
      license: "CC-BY-4.0 / Open Government Data",
      text: "© Badan Informasi Geospasial (BIG) & USGS Tectonic Plate Boundaries 2024",
      verified: true,
    },
    "das-bengawan-madiun": {
      name: "Daerah Aliran Sungai (DAS) Bengawan Madiun",
      source: "BBWS Bengawan Solo & Dinas PUPR Jatim",
      license: "Open Government Data RI",
      text: "© BBWS Bengawan Solo - Peta Pola Aliran Sungai Caruban & Madiun 2024",
      verified: true,
    },
    "kerawanan-longsor-wilis": {
      name: "Zona Kerawanan Gerakan Tanah Lereng Wilis",
      source: "Badan Nasional Penanggulangan Bencana (BNPB)",
      license: "InaRISK Open Data / CC-BY-4.0",
      text: "© InaRISK BNPB - Peta Bahaya Tanah Longsor Kab. Madiun 2024",
      verified: true,
    },
    "sman1-mejayan-mikro": {
      name: "Citra Satelit & Fasilitas SMAN 1 Mejayan",
      source: "Google Maps Platform & ESRI World Imagery",
      license: "Google Maps Platform Standard License",
      text: "Map data ©2026 Google / Imagery ©2026 CNES / Airbus, Maxar Technologies",
      verified: true,
    },
  };

  const currentLevelLabel =
    activeLevel === 1
      ? "Level 1: Makro (Skala Global/Nasional)"
      : activeLevel === 2
      ? "Level 2: Meso (Skala Regional Madiun)"
      : "Level 3: Mikro (Kontekstual SMAN 1 Mejayan)";

  const activeAttributions = activeLayers
    .map((slug) => layerAttributions[slug])
    .filter(Boolean);

  return (
    <div className="absolute bottom-4 left-4 z-30 max-w-sm sm:max-w-md">
      <div className="rounded-xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/30 shadow-xl overflow-hidden text-xs">
        {/* Header Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-white/5 transition-colors gap-2"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-white truncate">{currentLevelLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge variant="primary" className="text-[10px] py-0 px-1.5">
              {activeAttributions.length} Layer Aktif
            </Badge>
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
        </button>

        {/* Collapsed Brief Attribution */}
        {!isExpanded && activeAttributions.length > 0 && (
          <div className="px-3 pb-2 text-[10px] text-slate-400 truncate border-t border-white/5 pt-1">
            {activeAttributions[0].text}
          </div>
        )}

        {/* Expanded Detailed License Registry */}
        {isExpanded && (
          <div className="p-3 border-t border-cyan-500/20 space-y-2.5 max-h-56 overflow-y-auto">
            <p className="text-[11px] font-semibold text-cyan-300">
              Kepatuhan Lisensi Data Geospasial Resmi:
            </p>
            {activeAttributions.map((attr, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-[#04162B] border border-cyan-500/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px]">{attr.name}</span>
                  {attr.verified && (
                    <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                      Terverifikasi
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-300">
                  <span className="text-slate-400">Sumber:</span> {attr.source}
                </p>
                <p className="text-[10px] text-slate-300">
                  <span className="text-slate-400">Lisensi:</span> {attr.license}
                </p>
                <p className="text-[9px] text-slate-400 italic pt-0.5 border-t border-white/5">
                  {attr.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
