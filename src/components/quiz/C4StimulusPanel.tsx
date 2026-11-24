"use client";

import React, { useState } from "react";
import {
  FileText,
  Map,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Compass,
  Layers,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface C4StimulusPanelProps {
  stimulusType: "IMAGE" | "SATELLITE_CROP" | "THEMATIC_MAP" | "AUDIO" | "VIDEO" | "CASE_STUDY" | "DIAGRAM";
  stimulusText: string;
  stimulusUrl?: string;
}

export function C4StimulusPanel({ stimulusType, stimulusText, stimulusUrl }: C4StimulusPanelProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeVisualFilter, setActiveVisualFilter] = useState<"standard" | "infrared" | "contour">("standard");

  const typeConfig = {
    CASE_STUDY: { label: "Stimulus: Studi Kasus Lapangan", icon: FileText, color: "#00D2EE" },
    THEMATIC_MAP: { label: "Stimulus: Peta Tematik Geospasial", icon: Map, color: "#D9480F" },
    SATELLITE_CROP: { label: "Stimulus: Potongan Citra Satelit Resolusi Tinggi", icon: ImageIcon, color: "#10B981" },
    DIAGRAM: { label: "Stimulus: Diagram Profil Dinamika Geosfer", icon: Layers, color: "#8B5CF6" },
    IMAGE: { label: "Stimulus: Foto Udara / Dokumentasi Lapangan", icon: ImageIcon, color: "#38BDF8" },
    AUDIO: { label: "Stimulus: Rekaman Audio Fenomena", icon: FileText, color: "#F59E0B" },
    VIDEO: { label: "Stimulus: Cuplikan Dinamika Geosfer", icon: FileText, color: "#EC4899" },
  };

  const current = typeConfig[stimulusType] || typeConfig.CASE_STUDY;
  const Icon = current.icon;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="rounded-2xl bg-[#04162B] border border-cyan-500/25 p-5 space-y-4 shadow-xl">
      {/* Panel Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold shadow-md"
            style={{ backgroundColor: `${current.color}25`, color: current.color }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading font-bold text-xs sm:text-sm text-white block">
              {current.label}
            </span>
            <span className="text-[10px] text-slate-400">
              Analisis Spasial Kontekstual • Wilayah Madiun
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary" className="text-[10px] py-0.5 px-2.5">
            C4 • Menganalisis
          </Badge>
        </div>
      </div>

      {/* Stimulus Context Text */}
      <div className="bg-[#091B30]/80 p-4 rounded-xl border border-cyan-500/15">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
          Konteks Fenomena Geosfer
        </span>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
          {stimulusText}
        </p>
      </div>

      {/* Interactive Mini Map / Satellite Crop Viewer */}
      <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 bg-[#011024]">
        {/* Top Controls Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
          <div className="px-2 py-1 rounded-md bg-[#011024]/85 backdrop-blur-md border border-cyan-500/30 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#00D2EE]" />
            <span>-7.5476° S, 111.6536° E</span>
          </div>
          <div className="hidden sm:flex px-2 py-1 rounded-md bg-[#011024]/85 backdrop-blur-md border border-cyan-500/30 text-[10px] text-slate-400 font-mono">
            Skala 1:25.000
          </div>
        </div>

        {/* Zoom & Action Buttons */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#011024]/85 backdrop-blur-md p-1 rounded-lg border border-cyan-500/30">
          <button
            onClick={handleZoomIn}
            className="p-1 rounded text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-colors"
            title="Perbesar (Zoom In)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 rounded text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-colors"
            title="Perkecil (Zoom Out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Skala"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-700 mx-0.5"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 rounded text-[#00D2EE] hover:text-white hover:bg-[#00D2EE]/20 transition-colors"
            title="Layar Penuh (Full View)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Map / Thematic Graphic Stage */}
        <div className="h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden relative select-none">
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Thematic Map or Satellite Vector Canvas */}
            <div className="w-full max-w-md h-full rounded-lg border border-cyan-500/20 p-4 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#021126] to-[#011024]">
              {/* Synthetic Geospatial Grid / Contour Lines */}
              <div className="absolute inset-0 subtle-grid-bg opacity-40"></div>
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,40 Q 90,80 180,30 T 360,70" fill="none" stroke="#00D2EE" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M 0,90 Q 120,40 240,110 T 400,60" fill="none" stroke="#D9480F" strokeWidth="1.5" />
                <path d="M 0,140 Q 80,160 200,120 T 400,150" fill="none" stroke="#10B981" strokeWidth="1.2" />
                <circle cx="160" cy="70" r="4" fill="#00D2EE" />
                <circle cx="240" cy="110" r="4" fill="#D9480F" />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,210,238,0.3)]"
                  style={{ backgroundColor: `${current.color}25` }}
                >
                  <Icon className="w-6 h-6" style={{ color: current.color }} />
                </div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-white tracking-wide">
                  Visualisasi Stimulus Geospasial
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 max-w-xs leading-snug">
                  Lokasi: SMAN 1 Mejayan & Lereng Wilis / DAS Bengawan Madiun
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-[#00D2EE] font-mono border border-cyan-500/30">
                    Zoom: {Math.round(zoomLevel * 100)}%
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                    Sensor: Multispektral
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scale Bar & North Indicator Overlay */}
          <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-2 bg-[#011024]/90 px-2 py-1 rounded border border-cyan-500/20">
            <div className="w-12 h-1 bg-gradient-to-r from-white via-cyan-400 to-white"></div>
            <span className="text-[9px] font-mono text-slate-300">2.5 km</span>
          </div>

          <div className="absolute bottom-2 right-2.5 z-10 bg-[#011024]/90 px-2 py-1 rounded border border-cyan-500/20 flex items-center gap-1">
            <span className="text-[9px] font-bold text-[#00D2EE]">U</span>
            <span className="text-[9px] text-slate-400 font-mono">▲</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Stimulus Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#04162B] border border-cyan-500/40 rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <Icon className="w-5 h-5 text-[#00D2EE]" />
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  Penampil Stimulus Geospasial Resolusi Tinggi
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Canvas */}
            <div className="h-96 w-full rounded-2xl bg-[#011024] border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden subtle-grid-bg">
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,80 Q 180,160 360,60 T 720,140" fill="none" stroke="#00D2EE" strokeWidth="2" strokeDasharray="4,4" />
                <path d="M 0,160 Q 240,80 480,220 T 800,120" fill="none" stroke="#D9480F" strokeWidth="2" />
                <circle cx="360" cy="140" r="6" fill="#00D2EE" />
                <circle cx="480" cy="220" r="6" fill="#D9480F" />
              </svg>

              <div className="relative z-10 max-w-xl space-y-3">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,210,238,0.4)]"
                  style={{ backgroundColor: `${current.color}30` }}
                >
                  <Icon className="w-8 h-8" style={{ color: current.color }} />
                </div>
                <h4 className="font-heading font-extrabold text-white text-base">
                  {current.label}
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed bg-[#091B30]/80 p-4 rounded-xl border border-cyan-500/20">
                  {stimulusText}
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
                  <span>Sistem Proyeksi: UTM Zona 49S</span>
                  <span>•</span>
                  <span>Datum: WGS 1984 (SRID 4326)</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Tekan tombol Tutup untuk kembali menjawab soal evaluasi C4.
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#00D2EE] text-[#011024] font-bold text-xs hover:bg-[#00D2EE]/90 transition-all shadow-glow"
              >
                Kembali ke Soal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
