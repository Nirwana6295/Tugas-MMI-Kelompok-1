"use client";

import React, { useState } from "react";
import {
  MapPin,
  Ruler,
  Maximize2,
  Scan,
  Compass,
  CheckCircle2,
  Layers,
  Eye,
  Camera,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Level3MicroGoogleMapsProps {
  onMapTypeSelect?: (type: "roadmap" | "satellite" | "hybrid" | "terrain") => void;
  onStreetViewToggle?: (enabled: boolean) => void;
  onMarkerSelect?: (markerId: string) => void;
}

export function Level3MicroGoogleMaps({
  onMapTypeSelect,
  onStreetViewToggle,
  onMarkerSelect,
}: Level3MicroGoogleMapsProps) {
  const [selectedMapType, setSelectedMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">(
    "hybrid"
  );
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [isStreetViewActive, setIsStreetViewActive] = useState(false);
  const [activeChecklistKey, setActiveChecklistKey] = useState<string | null>("rona");

  // 9 Visual Interpretation Elements Checklist for SMAN 1 Mejayan Satellite Image
  const nineElements = [
    {
      key: "rona",
      title: "1. Rona (Tone)",
      desc: "Tingkat kecerahan relatif objek pada citra.",
      caseResult: "Cerah keputihan pada atap seng baru/galvalum gedung kelas; rona gelap pada lapangan rumput dan pohon peneduh.",
    },
    {
      key: "warna",
      title: "2. Warna (Color)",
      desc: "Wujud spektral tampak mata (komposit RGB).",
      caseResult: "Atap genteng merah bata dan abu-abu, jalan aspal hitam pekat, persawahan sekitar hijau cerah hingga kecokelatan.",
    },
    {
      key: "bentuk",
      title: "3. Bentuk (Shape)",
      desc: "Konfigurasi atau kerangka luar objek.",
      caseResult: "Persegi panjang modular (bangunan ruang kelas bertingkat) yang tersusun membentuk formasi huruf U dan L mengitari halaman upacara.",
    },
    {
      key: "ukuran",
      title: "4. Ukuran (Size)",
      desc: "Dimensi panjang, lebar, luas, dan tinggi objek.",
      caseResult: "Luas kompleks sekolah ± 22.000 m² (2.2 hektar), jauh lebih luas dibandingkan perumahan warga sekitar.",
    },
    {
      key: "tekstur",
      title: "5. Tekstur (Texture)",
      desc: "Frekuensi perubahan rona pada citra (halus, sedang, kasar).",
      caseResult: "Tekstur halus seragam pada lapangan upacara dan jalan aspal; tekstur kasar berbintik pada kanopi pohon halaman sekolah.",
    },
    {
      key: "pola",
      title: "6. Pola (Pattern)",
      desc: "Susunan spasial atau pengulangan objek.",
      caseResult: "Pola teratur berjejer rapi menghadap lapangan upacara mencerminkan kompleks fasilitas pendidikan terencana.",
    },
    {
      key: "bayangan",
      title: "7. Bayangan (Shadow)",
      desc: "Efek penyinaran matahari yang memperjelas profil ketinggian.",
      caseResult: "Bayangan tampak jatuh ke arah barat (orientasi pemotretan citra pagi hari), membuktikan bangunan berlantai dua.",
    },
    {
      key: "situs",
      title: "8. Situs (Site)",
      desc: "Posisi objek terhadap bentang alam sekitarnya.",
      caseResult: "Terletak di dataran rendah lembah Bengawan Madiun, persis di tepi jalan arteri primer Jl. Panglima Sudirman No. 82.",
    },
    {
      key: "asosiasi",
      title: "9. Asosiasi (Association)",
      desc: "Keterkaitan objek dengan fasilitas pendukung lain.",
      caseResult: "Terdapat lapangan olahraga, tiang bendera, tempat parkir siswa, dan halte angkutan umum yang berasosiasi kuat dengan sekolah menengah.",
    },
  ];

  // Observation markers around SMAN 1 Mejayan
  const observationPoints = [
    {
      id: "pt-sman1",
      name: "Kompleks SMAN 1 Mejayan",
      coords: "Jl. Panglima Sudirman No. 82, Mejayan",
      category: "Sekolah Target",
    },
    {
      id: "pt-bengawan",
      name: "Jembatan Aliran Bengawan Madiun",
      coords: "Kali Madiun Caruban",
      category: "Hidrosfer / DAS",
    },
    {
      id: "pt-wilis",
      name: "Kaki Lereng Gunung Wilis",
      coords: "Kare, Wilayah Hulu Madiun",
      category: "Litosfer / Vulkanisme",
    },
  ];

  const handleTypeChange = (type: "roadmap" | "satellite" | "hybrid" | "terrain") => {
    setSelectedMapType(type);
    if (onMapTypeSelect) onMapTypeSelect(type);
  };

  const handleStreetView = () => {
    const next = !isStreetViewActive;
    setIsStreetViewActive(next);
    if (onStreetViewToggle) onStreetViewToggle(next);
  };

  return (
    <div className="absolute top-20 right-4 z-20 w-80 sm:w-96 space-y-3">
      <div className="rounded-2xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/30 p-4 shadow-2xl text-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-[#00D2EE]" />
            <span className="font-heading font-bold text-white text-sm">
              Level 3: Skala Mikro Google Maps
            </span>
          </div>
          <Badge variant="primary" className="text-[10px]">
            SMAN 1 Mejayan
          </Badge>
        </div>

        {/* Map Type Switcher */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Mode Peta Google Maps:
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {(["satellite", "hybrid", "roadmap", "terrain"] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t)}
                className={`py-1.5 rounded-lg border text-[10px] font-semibold capitalize transition-all ${
                  selectedMapType === t
                    ? "bg-[#00D2EE] text-[#011024] border-[#00D2EE] font-bold"
                    : "bg-[#04162B] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Action Toolbars (Street View & Measurement) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            size="sm"
            variant={isStreetViewActive ? "primary" : "outline"}
            onClick={handleStreetView}
            className="text-[11px] py-1.5"
          >
            <Camera className="w-3.5 h-3.5 mr-1" />
            <span>{isStreetViewActive ? "Tutup StreetView" : "Street View 360°"}</span>
          </Button>

          <Button
            size="sm"
            variant={isMeasuring ? "secondary" : "outline"}
            onClick={() => setIsMeasuring(!isMeasuring)}
            className="text-[11px] py-1.5"
          >
            <Ruler className="w-3.5 h-3.5 mr-1" />
            <span>{isMeasuring ? "Batal Ukur" : "Ukur Jarak/Luas"}</span>
          </Button>
        </div>

        {isMeasuring && (
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Ruler className="w-3 h-3 text-[#00D2EE]" />
              Mode Pengukuran Aktif
            </p>
            <p className="text-[10px] text-slate-300">
              Klik 2 titik di peta untuk ukur jarak (m), atau 3+ titik untuk hitung luas poligon (m²/ha).
            </p>
            <div className="pt-1 flex justify-between font-bold text-white text-[11px]">
              <span>Hasil Ukur Kompleks:</span>
              <span className="text-[#00D2EE]">± 2.2 hektar (22.000 m²)</span>
            </div>
          </div>
        )}

        {/* 9 Elements of Remote Sensing Checklist (Core Curriculum Feature) */}
        <div className="pt-2 border-t border-cyan-500/15 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#00D2EE] flex items-center gap-1.5">
              <Scan className="w-3.5 h-3.5" />
              9 Unsur Interpretasi Citra Satelit
            </span>
            <span className="text-[10px] text-slate-400">SMAN 1 Mejayan</span>
          </div>

          <p className="text-[10px] text-slate-400">
            Klik salah satu unsur interpretasi di bawah ini untuk melihat hasil analisis citra satelit:
          </p>

          <div className="grid grid-cols-3 gap-1.5">
            {nineElements.map((el) => (
              <button
                key={el.key}
                onClick={() => setActiveChecklistKey(el.key)}
                className={`p-1.5 rounded-lg border text-[10px] font-semibold text-center transition-all ${
                  activeChecklistKey === el.key
                    ? "bg-[#091B30] border-[#00D2EE] text-[#00D2EE] shadow-sm font-bold"
                    : "bg-[#04162B] border-white/5 text-slate-300 hover:text-white"
                }`}
              >
                {el.title.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Active 9-Element Detailed Inspection */}
          {activeChecklistKey && (
            <div className="p-3 rounded-xl bg-[#091B30] border border-cyan-500/30 space-y-1.5 mt-2 animate-fadeIn">
              {(() => {
                const el = nineElements.find((x) => x.key === activeChecklistKey);
                if (!el) return null;
                return (
                  <>
                    <div className="flex items-center justify-between text-[#00D2EE] font-bold text-xs">
                      <span>{el.title}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 italic">{el.desc}</p>
                    <div className="p-2 rounded-lg bg-[#04162B] text-[11px] text-slate-200 border border-white/5 leading-relaxed">
                      <span className="font-bold text-white">Hasil Pengamatan: </span>
                      {el.caseResult}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
