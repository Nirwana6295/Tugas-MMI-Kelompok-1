"use client";

import React, { useState } from "react";
import { Layers, Sliders, SplitSquareVertical, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Level2MesoOverlayProps {
  onLayerToggle?: (layerSlug: string, isVisible: boolean) => void;
  onOpacityChange?: (layerSlug: string, opacity: number) => void;
  onSplitScreenToggle?: (enabled: boolean) => void;
}

export function Level2MesoOverlay({
  onLayerToggle,
  onOpacityChange,
  onSplitScreenToggle,
}: Level2MesoOverlayProps) {
  const [layers, setLayers] = useState([
    {
      id: "das-bengawan-madiun",
      title: "Daerah Aliran Sungai (DAS) Madiun",
      source: "BBWS Bengawan Solo",
      color: "#0284C7",
      opacity: 80,
      visible: true,
      legendDesc: "Wilayah tangkapan air & jaringan drainase Kali Catur hingga Mejayan",
    },
    {
      id: "kerawanan-longsor-wilis",
      title: "Kerawanan Gerakan Tanah Wilis",
      source: "InaRISK BNPB",
      color: "#DC2626",
      opacity: 70,
      visible: true,
      legendDesc: "Zona lereng terjal (>35%) berisiko tinggi saat curah hujan ekstrim",
    },
    {
      id: "tanah-aluvial-andosol",
      title: "Peta Horizon & Jenis Tanah Madiun",
      source: "BBSDLP Kementan",
      color: "#D97706",
      opacity: 65,
      visible: false,
      legendDesc: "Tanah Aluvial subur (lembah) dan Andosol vulkanik (lereng atas)",
    },
  ]);

  const [isSplitMode, setIsSplitMode] = useState(false);

  const handleToggle = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const next = !l.visible;
          if (onLayerToggle) onLayerToggle(id, next);
          return { ...l, visible: next };
        }
        return l;
      })
    );
  };

  const handleOpacity = (id: string, newOpacity: number) => {
    setLayers((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          if (onOpacityChange) onOpacityChange(id, newOpacity / 100);
          return { ...l, opacity: newOpacity };
        }
        return l;
      })
    );
  };

  const handleSplitToggle = () => {
    const next = !isSplitMode;
    setIsSplitMode(next);
    if (onSplitScreenToggle) onSplitScreenToggle(next);
  };

  return (
    <div className="absolute top-20 right-4 z-20 w-80 sm:w-96 space-y-3">
      <div className="rounded-2xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/30 p-4 shadow-2xl text-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00D2EE]" />
            <span className="font-heading font-bold text-white text-sm">
              Level 2: Skala Meso
            </span>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            Regional Madiun
          </Badge>
        </div>

        {/* Split Screen Toggle */}
        <div className="p-2.5 rounded-xl bg-[#04162B] border border-cyan-500/20 flex items-center justify-between">
          <div>
            <p className="font-bold text-white text-[11px] flex items-center gap-1.5">
              <SplitSquareVertical className="w-3.5 h-3.5 text-[#00D2EE]" />
              <span>Perbandingan Layar Terbelah</span>
            </p>
            <p className="text-[10px] text-slate-400">Komparasi komparatif 2 layer tematik</p>
          </div>
          <Button
            size="sm"
            variant={isSplitMode ? "primary" : "outline"}
            onClick={handleSplitToggle}
            className="text-[10px] py-1 px-2.5 h-auto"
          >
            {isSplitMode ? "Aktif" : "Buka Split"}
          </Button>
        </div>

        {/* Layer Switcher with Opacity Sliders */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Pengaturan Layer Tematik & Transparansi:
          </span>

          {layers.map((l) => (
            <div
              key={l.id}
              className={`p-3 rounded-xl border transition-all space-y-2 ${
                l.visible
                  ? "bg-[#091B30] border-cyan-500/30"
                  : "bg-[#04162B]/60 border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: l.color }}
                  />
                  <div>
                    <p className="font-bold text-white text-[11px]">{l.title}</p>
                    <p className="text-[9px] text-slate-400">Sumber: {l.source}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(l.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  {l.visible ? (
                    <Eye className="w-4 h-4 text-[#00D2EE]" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Opacity Slider */}
              {l.visible && (
                <div className="pt-1 space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3 h-3" />
                      Opasitas
                    </span>
                    <span className="font-bold text-[#00D2EE]">{l.opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={l.opacity}
                    onChange={(e) => handleOpacity(l.id, Number(e.target.value))}
                    className="w-full h-1.5 bg-[#011024] rounded-lg appearance-none cursor-pointer accent-[#00D2EE]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Legend */}
        <div className="p-3 rounded-xl bg-[#04162B] border border-cyan-500/20 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
            Legenda Dinamis Regional:
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-1.5 rounded-sm bg-[#0284C7] shrink-0" />
              <span>Poligon Biru: Koridor Aliran Sungai DAS Madiun</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-1.5 rounded-sm bg-[#DC2626] shrink-0" />
              <span>Poligon Merah: Zona Rawan Longsor Lereng Wilis</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-1.5 rounded-sm bg-[#D97706] shrink-0" />
              <span>Poligon Kuning: Sebaran Endapan Aluvial Caruban</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
