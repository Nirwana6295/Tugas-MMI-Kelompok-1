"use client";

import React, { useState } from "react";
import { Info, Flame, Wind, Compass } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface Level1MacroOverlayProps {
  onFeatureSelect?: (featureName: string, description: string) => void;
}

export function Level1MacroOverlay({ onFeatureSelect }: Level1MacroOverlayProps) {
  const [selectedFeature, setSelectedFeature] = useState<{
    id: string;
    title: string;
    category: string;
    description: string;
  } | null>(null);

  const macroFeatures = [
    {
      id: "sunda-megathrust",
      title: "Zona Subduksi Megathrust Sunda (Ring of Fire)",
      category: "Lempeng Tektonik",
      badgeColor: "#D9480F",
      description:
        "Batas konvergen di mana Lempeng Samudra Indo-Australia menunjam ke bawah Lempeng Benua Eurasia dengan laju 6–7 cm/tahun, memicu busur gunung api aktif (Ring of Fire) dan gempa bumi dangkal di selatan Jawa.",
    },
    {
      id: "angin-muson-barat",
      title: "Pola Dinamika Angin Muson Barat",
      category: "Klimatologi / Atmosfer",
      badgeColor: "#38BDF8",
      description:
        "Angin yang bertiup dari Benua Asia ke Benua Australia (Oktober–April) melewati Samudra Hindia dan Laut Natuna, membawa uap air melimpah yang memicu musim hujan di Indonesia.",
    },
    {
      id: "angin-muson-timur",
      title: "Pola Dinamika Angin Muson Timur",
      category: "Klimatologi / Atmosfer",
      badgeColor: "#F59E0B",
      description:
        "Angin yang bertiup dari Benua Australia ke Benua Asia (April–Oktober) melalui gurun pasir Australia yang kering, menyebabkan musim kemarau di sebagian besar wilayah Jawa dan Nusa Tenggara.",
    },
    {
      id: "garis-wallace",
      title: "Garis Biogeografi Wallace",
      category: "Biogeografi / Biosfer",
      badgeColor: "#10B981",
      description:
        "Garis imajiner yang ditarik oleh Alfred Russel Wallace (1859) antara Bali-Lombok dan Kalimantan-Sulawesi, memisahkan fauna tipe Asiatis (gajah, harimau, badak) dengan fauna wilayah peralihan (Wallacea).",
    },
    {
      id: "garis-weber",
      title: "Garis Keseimbangan Weber",
      category: "Biogeografi / Biosfer",
      badgeColor: "#8B5CF6",
      description:
        "Garis batas fauna yang ditarik oleh Max Weber antara Kepulauan Maluku/Papua dan Sulawesi, menunjukkan zona keseimbangan di mana proporsi fauna Asiatis dan Australis seimbang 50:50.",
    },
  ];

  const handleSelect = (item: (typeof macroFeatures)[0]) => {
    setSelectedFeature(item);
    if (onFeatureSelect) {
      onFeatureSelect(item.title, item.description);
    }
  };

  return (
    <div className="absolute top-20 right-4 z-20 w-80 sm:w-96 space-y-3">
      {/* Level 1 Control Panel */}
      <div className="rounded-2xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/30 p-4 shadow-2xl text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#00D2EE]" />
            <span className="font-heading font-bold text-white text-sm">
              Level 1: Skala Makro
            </span>
          </div>
          <Badge variant="primary" className="text-[10px]">
            Global & Nasional
          </Badge>
        </div>

        <p className="text-slate-300 text-[11px] leading-relaxed">
          Pilih layer tematik berskala makro untuk mengamati fenomena lempeng tektonik, angin muson, dan biogeografi Indonesia:
        </p>

        {/* Feature Buttons */}
        <div className="space-y-1.5">
          {macroFeatures.map((feat) => (
            <button
              key={feat.id}
              onClick={() => handleSelect(feat)}
              className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                selectedFeature?.id === feat.id
                  ? "bg-[#091B30] border-cyan-400 text-white shadow-glow"
                  : "bg-[#04162B]/80 border-white/5 text-slate-300 hover:border-cyan-500/30 hover:text-white"
              }`}
            >
              <div className="space-y-0.5">
                <span
                  className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${feat.badgeColor}22`,
                    color: feat.badgeColor,
                  }}
                >
                  {feat.category}
                </span>
                <p className="text-xs font-semibold leading-tight pt-1">{feat.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Detail Inspection Card */}
        {selectedFeature && (
          <div className="p-3 rounded-xl bg-[#091B30] border border-cyan-500/40 space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[#00D2EE] font-bold text-xs">
              <Info className="w-3.5 h-3.5" />
              <span>Analisis Konseptual:</span>
            </div>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              {selectedFeature.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
