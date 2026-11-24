import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSans = Noto_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoSpatialX MMI — Pembelajaran Geografi Kelas X SMA",
  description:
    "Multimedia Interaktif (MMI) Geografi Kelas X SMA: Integrasi Peta Interaktif Bertingkat Google Maps, Materi Kontekstual Dinamika Geosfer, dan Asesmen Sumatif Kognitif C4. Studi Kasus SMAN 1 Mejayan, Kab. Madiun.",
  keywords: [
    "Geografi Kelas X",
    "Multimedia Interaktif",
    "SMAN 1 Mejayan",
    "Google Maps Geospasial",
    "Dinamika Geosfer",
    "Asesmen C4",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${notoSans.variable} dark`}>
      <body className="antialiased min-h-screen bg-[#011024] text-slate-100 selection:bg-[#00D2EE] selection:text-[#011024]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
