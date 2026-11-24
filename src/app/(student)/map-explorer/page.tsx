import React from "react";
import { SpatialExplorer } from "@/components/map/SpatialExplorer";

export const metadata = {
  title: "Peta Interaktif Bertingkat (Spatial Explorer) — GeoSpatialX MMI",
  description:
    "Eksplorasi peta 3 tingkat: Level 1 Makro Nasional, Level 2 Meso Regional Madiun, dan Level 3 Mikro Kontekstual SMAN 1 Mejayan terhubung Google Maps.",
};

export default function MapExplorerPage() {
  return (
    <div className="space-y-4">
      <SpatialExplorer />
    </div>
  );
}
