"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes cache
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDemoDummyKeyForGeoSpatialXMMI";

  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={googleMapsApiKey} libraries={["geometry", "places"]}>
        {children}
      </APIProvider>
    </QueryClientProvider>
  );
}
