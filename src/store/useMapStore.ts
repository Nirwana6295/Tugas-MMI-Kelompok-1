import { create } from "zustand";
import { LayerLevel } from "@/types";

interface MapState {
  activeLevel: LayerLevel;
  activeLayers: string[];
  layerOpacity: Record<string, number>;
  splitScreenMode: boolean;
  splitCompareLayerId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  selectedRSFeatureId: string | null;
  activeRSChecklist: Record<string, boolean>;

  setLevel: (level: LayerLevel) => void;
  toggleLayer: (layerSlug: string) => void;
  setLayerOpacity: (layerSlug: string, opacity: number) => void;
  setSplitScreenMode: (enabled: boolean, compareLayerId?: string | null) => void;
  setMapViewport: (center: { lat: number; lng: number }, zoom: number) => void;
  selectRSFeature: (featureId: string | null) => void;
  toggleRSChecklistItem: (elementKey: string) => void;
  resetMapState: () => void;
}

// Default center: SMAN 1 Mejayan, Kab. Madiun (-7.5476, 111.6536)
const DEFAULT_CENTER = { lat: -7.5476, lng: 111.6536 };

export const useMapStore = create<MapState>((set) => ({
  activeLevel: 3, // Default to Micro scale (SMAN 1 Mejayan)
  activeLayers: ["sman1-mejayan-mikro"],
  layerOpacity: {
    "lempeng-tektonik-indonesia": 0.85,
    "das-bengawan-madiun": 0.75,
    "kerawanan-longsor-wilis": 0.7,
    "sman1-mejayan-mikro": 0.9,
  },
  splitScreenMode: false,
  splitCompareLayerId: null,
  mapCenter: DEFAULT_CENTER,
  mapZoom: 16,
  selectedRSFeatureId: "sman1-mejayan-mikro",
  activeRSChecklist: {
    rona: true,
    warna: true,
    bentuk: true,
    ukuran: true,
    tekstur: true,
    pola: true,
    bayangan: true,
    situs: true,
    asosiasi: true,
  },

  setLevel: (level) => {
    let center = DEFAULT_CENTER;
    let zoom = 16;
    let defaultLayer = "sman1-mejayan-mikro";

    if (level === 1) {
      // Makro: Global / Kepulauan Indonesia
      center = { lat: -2.5, lng: 118.0 };
      zoom = 5;
      defaultLayer = "lempeng-tektonik-indonesia";
    } else if (level === 2) {
      // Meso: Regional Madiun & DAS Solo
      center = { lat: -7.6, lng: 111.6 };
      zoom = 10;
      defaultLayer = "das-bengawan-madiun";
    }

    set((state) => ({
      activeLevel: level,
      mapCenter: center,
      mapZoom: zoom,
      activeLayers: state.activeLayers.includes(defaultLayer)
        ? state.activeLayers
        : [...state.activeLayers, defaultLayer],
    }));
  },

  toggleLayer: (layerSlug) =>
    set((state) => {
      const exists = state.activeLayers.includes(layerSlug);
      return {
        activeLayers: exists
          ? state.activeLayers.filter((slug) => slug !== layerSlug)
          : [...state.activeLayers, layerSlug],
      };
    }),

  setLayerOpacity: (layerSlug, opacity) =>
    set((state) => ({
      layerOpacity: {
        ...state.layerOpacity,
        [layerSlug]: opacity,
      },
    })),

  setSplitScreenMode: (enabled, compareLayerId = null) =>
    set({
      splitScreenMode: enabled,
      splitCompareLayerId: compareLayerId,
    }),

  setMapViewport: (center, zoom) =>
    set({
      mapCenter: center,
      mapZoom: zoom,
    }),

  selectRSFeature: (featureId) =>
    set({
      selectedRSFeatureId: featureId,
    }),

  toggleRSChecklistItem: (elementKey) =>
    set((state) => ({
      activeRSChecklist: {
        ...state.activeRSChecklist,
        [elementKey]: !state.activeRSChecklist[elementKey],
      },
    })),

  resetMapState: () =>
    set({
      activeLevel: 3,
      activeLayers: ["sman1-mejayan-mikro"],
      mapCenter: DEFAULT_CENTER,
      mapZoom: 16,
      splitScreenMode: false,
      splitCompareLayerId: null,
    }),
}));
