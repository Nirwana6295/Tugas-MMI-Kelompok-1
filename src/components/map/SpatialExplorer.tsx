"use client";

import React, { useState } from "react";
import { Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import {
  Compass,
  Layers,
  Scan,
  SplitSquareVertical,
  ArrowLeft,
  Ruler,
  Camera,
  Maximize2,
  X,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useMapStore } from "@/store/useMapStore";
import { Level1MacroOverlay } from "@/components/map/Level1MacroOverlay";
import { Level2MesoOverlay } from "@/components/map/Level2MesoOverlay";
import { Level3MicroGoogleMaps } from "@/components/map/Level3MicroGoogleMaps";
import { MapAttributionBadge } from "@/components/map/MapAttributionBadge";
import { Button } from "@/components/ui/Button";

// Custom Google Maps Dark Theme to match Design UI UX.pdf Cosmic Midnight Navy
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#04162B" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#011024" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94A3B8" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#00D2EE" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#CBD5E1" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#022438" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#092442" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#061B33" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#E2E8F0" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#004090" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#011024" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#00D2EE" }],
  },
];

export function SpatialExplorer() {
  const {
    activeLevel,
    activeLayers,
    layerOpacity,
    mapCenter,
    mapZoom,
    splitScreenMode,
    setLevel,
    setMapViewport,
    setSplitScreenMode,
  } = useMapStore();

  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">(
    "hybrid"
  );
  const [isStreetViewActive, setIsStreetViewActive] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    id: string;
    title: string;
    position: { lat: number; lng: number };
    desc: string;
    coordsText: string;
  } | null>(null);

  // Markers at SMAN 1 Mejayan context
  const mejayanMarkers = [
    {
      id: "sman1",
      title: "SMAN 1 Mejayan (Kampus Utama)",
      position: { lat: -7.5476, lng: 111.6536 },
      coordsText: "-7.5476° S, 111.6536° E",
      desc: "Jl. Panglima Sudirman No. 82, Kowang, Mejayan. Luas kompleks ±2.2 ha, formasi bangunan modular berbentuk U mengitari lapangan upacara.",
    },
    {
      id: "bengawan",
      title: "Aliran Bengawan Madiun & Jembatan Caruban",
      position: { lat: -7.535, lng: 111.64 },
      coordsText: "-7.5350° S, 111.6400° E",
      desc: "Anak sungai Bengawan Solo dengan pola aliran dendritik penyuplai irigasi persawahan teknis Caruban.",
    },
    {
      id: "lereng-wilis",
      title: "Zona Kaki Lereng Gunung Wilis",
      position: { lat: -7.62, lng: 111.75 },
      coordsText: "-7.6200° S, 111.7500° E",
      desc: "Morfologi perbukitan vulkanik tanah andosol dengan kelerengan >35% rawan longsoran luncuran saat hujan ekstrem.",
    },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-3xl overflow-hidden border border-cyan-500/25 shadow-2xl bg-[#011024]">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2.5">
        <Link href="/dashboard">
          <Button size="sm" variant="outline" className="bg-[#011024]/85 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Peta Konsep</span>
          </Button>
        </Link>

        {/* 3-Level Switcher Buttons */}
        <div className="p-1 rounded-2xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1 shadow-glow">
          <button
            onClick={() => setLevel(1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLevel === 1
                ? "bg-[#00D2EE] text-[#011024] shadow-sm font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Level 1 (Makro)</span>
          </button>

          <button
            onClick={() => setLevel(2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLevel === 2
                ? "bg-[#00D2EE] text-[#011024] shadow-sm font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Level 2 (Meso)</span>
          </button>

          <button
            onClick={() => setLevel(3)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLevel === 3
                ? "bg-[#00D2EE] text-[#011024] shadow-sm font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Level 3 (Mikro SMAN 1)</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport (Dual Container if Split-Screen is Active) */}
      <div className={`w-full h-full ${splitScreenMode ? "grid grid-cols-2 gap-1 bg-[#011024]" : ""}`}>
        {/* Map Pane 1 */}
        <div className="relative w-full h-full">
          <Map
            center={mapCenter}
            zoom={mapZoom}
            mapTypeId={mapType}
            styles={mapType === "roadmap" ? darkMapStyle : undefined}
            disableDefaultUI={false}
            zoomControl={true}
            streetViewControl={true}
            className="w-full h-full"
            onCameraChanged={(ev) => {
              setMapViewport(ev.detail.center, ev.detail.zoom);
            }}
          >
            {/* Markers on Level 3 */}
            {activeLevel === 3 &&
              mejayanMarkers.map((m) => (
                <Marker
                  key={m.id}
                  position={m.position}
                  title={m.title}
                  onClick={() => setSelectedMarker(m)}
                />
              ))}

            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-2 max-w-xs text-[#011024] space-y-1">
                  <p className="font-heading font-bold text-xs">{selectedMarker.title}</p>
                  <p className="text-[10px] text-cyan-800 font-semibold">{selectedMarker.coordsText}</p>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{selectedMarker.desc}</p>
                </div>
              </InfoWindow>
            )}
          </Map>

          {/* SVG Vector Graphic Layer for Macro Lines (Level 1) */}
          {activeLevel === 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80">
              <defs>
                <linearGradient id="megathrust-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D9480F" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Tectonic Plate Boundary (Sunda Megathrust) */}
              <path
                d="M 120 420 Q 320 540 550 560 T 900 620"
                fill="none"
                stroke="url(#megathrust-grad)"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="animate-pulse"
              />
              <text x="340" y="525" fill="#EF4444" fontSize="11" fontWeight="bold">
                Zona Subduksi Megathrust Jawa (Ring of Fire)
              </text>

              {/* Wallace Line */}
              <line
                x1="620"
                y1="180"
                x2="600"
                y2="580"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="5 5"
              />
              <text x="610" y="240" fill="#10B981" fontSize="10" fontWeight="bold">
                Garis Wallace (1859)
              </text>

              {/* Weber Line */}
              <line
                x1="780"
                y1="160"
                x2="800"
                y2="600"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeDasharray="5 5"
              />
              <text x="790" y="220" fill="#8B5CF6" fontSize="10" fontWeight="bold">
                Garis Weber
              </text>
            </svg>
          )}

          {/* SVG Layer for Meso Polygons (Level 2) */}
          {activeLevel === 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {/* DAS Bengawan Madiun Polygon */}
              {activeLayers.includes("das-bengawan-madiun") && (
                <polygon
                  points="260,180 480,160 560,340 420,440 280,380"
                  fill="#0284C7"
                  fillOpacity={layerOpacity["das-bengawan-madiun"] * 0.35 || 0.25}
                  stroke="#0284C7"
                  strokeWidth="2.5"
                />
              )}

              {/* Zona Longsor Lereng Wilis Polygon */}
              {activeLayers.includes("kerawanan-longsor-wilis") && (
                <polygon
                  points="500,280 620,300 640,460 520,440"
                  fill="#DC2626"
                  fillOpacity={layerOpacity["kerawanan-longsor-wilis"] * 0.4 || 0.3}
                  stroke="#DC2626"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />
              )}
            </svg>
          )}

          {/* Street View 360° Panorama Modal on Level 3 */}
          {isStreetViewActive && (
            <div className="absolute inset-0 z-40 bg-black/90 flex flex-col">
              <div className="p-3 bg-[#011024] border-b border-cyan-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#00D2EE]" />
                  <span className="font-bold text-white">
                    Google Street View 360° — Gerbang SMAN 1 Mejayan
                  </span>
                  <span className="text-slate-400">Jl. Panglima Sudirman No. 82, Madiun</span>
                </div>
                <button
                  onClick={() => setIsStreetViewActive(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Simulated StreetView Panorama Viewport */}
              <div className="flex-1 w-full bg-[#04162B] flex flex-col items-center justify-center relative p-8 text-center subtle-grid-bg">
                <div className="p-6 rounded-3xl bg-[#091B30]/90 border border-cyan-500/30 max-w-lg space-y-3 shadow-glow">
                  <Camera className="w-12 h-12 text-[#00D2EE] mx-auto animate-pulse" />
                  <h4 className="font-heading font-extrabold text-white text-base">
                    Panorama Lingkungan SMAN 1 Mejayan
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengamatan darat 360° di Jl. Panglima Sudirman No. 82 memperlihatkan pagar sekolah, gerbang utama, lapangan upacara, dan pepohonan peneduh yang selaras dengan interpretasi citra satelit rona cerah dan tekstur kasar bertajuk.
                  </p>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setIsStreetViewActive(false)}
                  >
                    Kembali ke Peta Satelit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Level Overlay Floating Control Drawers */}
          {activeLevel === 1 && <Level1MacroOverlay />}
          {activeLevel === 2 && (
            <Level2MesoOverlay
              onSplitScreenToggle={(en) => setSplitScreenMode(en)}
            />
          )}
          {activeLevel === 3 && (
            <Level3MicroGoogleMaps
              onMapTypeSelect={(t) => setMapType(t)}
              onStreetViewToggle={(en) => setIsStreetViewActive(en)}
            />
          )}

          {/* Automatic License Attribution Badge */}
          <MapAttributionBadge activeLevel={activeLevel} activeLayers={activeLayers} />
        </div>

        {/* Map Pane 2 (Only active when split-screen is enabled) */}
        {splitScreenMode && (
          <div className="relative w-full h-full border-l border-cyan-500/40">
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-[#011024]/95 border border-cyan-500/40 text-xs font-bold text-cyan-300 flex items-center gap-2 shadow-lg">
              <SplitSquareVertical className="w-3.5 h-3.5 text-[#00D2EE]" />
              <span>Komparasi Layar Terbelah: Kerawanan Gerakan Tanah Lereng Wilis</span>
            </div>
            <Map
              center={{ lat: -7.62, lng: 111.75 }}
              zoom={11}
              mapTypeId="satellite"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
