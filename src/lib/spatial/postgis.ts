/**
 * PostGIS and Geospatial Processing Utilities for GeoSpatialX MMI
 * Coordinates System: WGS 84 (SRID 4326)
 * Deployment Context: SMAN 1 Mejayan, Kab. Madiun (-7.5476, 111.6536)
 */

export interface GeoJSONGeometry {
  type: string;
  coordinates: any;
}

export interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties: Record<string, any>;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

/**
 * Validates whether coordinates fall within the broader Madiun / East Java regional bounding box
 */
export function isWithinMadiunRegion(lat: number, lng: number): boolean {
  // Bounding box for Madiun Regency and surrounding area
  const minLat = -8.0;
  const maxLat = -7.3;
  const minLng = 111.3;
  const maxLng = 112.0;

  return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

/**
 * Calculates Haversine distance in meters between two [lat, lng] points
 * Useful as a fast fallback when google.maps.geometry.spherical is loading
 */
export function calculateHaversineDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Formats distance in meters to a human-readable Indonesian string
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Formats polygon area in square meters to a human-readable string (m² or ha or km²)
 */
export function formatArea(sqMeters: number): string {
  if (sqMeters >= 1000000) {
    return `${(sqMeters / 1000000).toFixed(2)} km²`;
  }
  if (sqMeters >= 10000) {
    return `${(sqMeters / 10000).toFixed(2)} hektar (ha)`;
  }
  return `${Math.round(sqMeters)} m²`;
}
