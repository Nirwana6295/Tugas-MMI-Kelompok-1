import React from "react";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  MapPin,
  Award,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  Layers,
  ShieldCheck,
  Check,
  MessageSquare,
  Sun,
  Activity,
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";

export default function LandingPage() {
  const geosphereSpheres = [
    {
      num: "01",
      name: "Litosfer",
      tagline: "Struktur kerak bumi, aktivitas tektonik lempeng & mitigasi bencana gempa",
      accent: "#D9480F",
      href: "/learn/litosfer/lit-01",
    },
    {
      num: "02",
      name: "Pedosfer",
      tagline: "Profil horizon tanah, dinamika erosi & konservasi terasering lereng",
      accent: "#D97706",
      href: "/learn/pedosfer/ped-01",
    },
    {
      num: "03",
      name: "Atmosfer",
      tagline: "Lapisan udara, awan konvektif, dinamika monsun & variabilitas iklim",
      accent: "#38BDF8",
      href: "/learn/atmosfer/atm-01",
    },
    {
      num: "04",
      name: "Hidrosfer",
      tagline: "Siklus air, Sub-DAS Bengawan Madiun & tata kelola perairan maritim",
      accent: "#0284C7",
      href: "/learn/hidrosfer/hid-01",
    },
    {
      num: "05",
      name: "Biosfer",
      tagline: "Biogeografi Wallace-Weber, persebaran flora-fauna & konservasi alam",
      accent: "#10B981",
      href: "/learn/biosfer/bio-01",
    },
    {
      num: "06",
      name: "Antroposfer",
      tagline: "Struktur demografi penduduk, daya dukung lahan & interaksi spasial desa-kota",
      accent: "#8B5CF6",
      href: "/learn/antroposfer/ant-01",
    },
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-slate-100 flex flex-col p-2 sm:p-4 lg:p-6 font-sans">
      {/* Floating Island Pill Navbar */}
      <AppNavbar userRole={null} />

      {/* Hero Outer Canvas Frame (Matches the window frame in the user's reference images) */}
      <main className="max-w-[1400px] w-full mx-auto space-y-6">
        <section className="window-canvas relative min-h-[680px] sm:min-h-[740px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-b from-[#024486] via-[#022852] to-[#011024]">
          {/* Scenic Sky, Cloud & Landscape Graphic Horizon */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Sun Glow */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-400/25 rounded-full blur-[120px]" />
            {/* Atmospheric Sky Contrail */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="10%"
                y1="85%"
                x2="85%"
                y2="15%"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="12 4"
              />
              <circle cx="85%" cy="15%" r="4" fill="white" />
            </svg>
            {/* Subtle Landscape Silhouette in Background */}
            <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#011024] via-[#011024]/80 to-transparent" />
          </div>

          {/* Top Status Toast (Matches Top-Right Slack Card in Image 3) */}
          <div className="relative z-10 flex justify-end">
            <div className="glass-card-fresh rounded-2xl p-3.5 max-w-sm flex items-start gap-3 shadow-2xl border border-white/20">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-[#00D2EE] flex items-center justify-center text-[#011024] shrink-0 font-bold shadow-md">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white">Observasi Geospasial</span>
                  <span className="text-[10px] text-cyan-300 font-mono">Live</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Studi Kasus SMAN 1 Mejayan, Kab. Madiun • Koordinat: -7.5476° S, 111.6536° E
                </p>
              </div>
            </div>
          </div>

          {/* Hero Editorial Headline (Center-Upper, High-Contrast Serif like Image 1 & 3) */}
          <div className="relative z-10 max-w-4xl pt-6 sm:pt-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-cyan-200 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2EE]" />
              <span>Multimedia Interaktif Geografi Kelas X SMA</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Menjelajah Dinamika Bumi, <br />
              <span className="italic font-light text-cyan-200">
                dari fenomena global hingga ruang belajar kita.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-light leading-relaxed">
              Sebuah platform pembelajaran geospasial modern yang memadukan eksplorasi Google Maps 3 Level, kurikulum 6 sfera geosfer kontekstual, dan asesmen sumatif kognitif C4 HOTS.
            </p>
          </div>

          {/* Bottom Floating Frosted Glass Card & Actions (like Image 1) */}
          <div className="relative z-10 pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Frosted Acrylic Card */}
            <div className="glass-card-fresh rounded-3xl p-6 sm:p-7 max-w-md space-y-3.5 border border-white/20 shadow-2xl">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
                Aplikasi WebGIS & Edukasi
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal leading-snug">
                Pembelajaran Berbasis Bukti Nyata & Analisis Tingkat Tinggi
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Didukung data resmi Badan Informasi Geospasial (BIG), BMKG, InaRISK BNPB, serta citra penginderaan jauh resolusi tinggi.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00D2EE] text-[#011024] font-bold text-xs hover:bg-cyan-300 transition-all shadow-glow"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/map-explorer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white font-medium text-xs hover:bg-white/20 border border-white/20 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Spatial Explorer</span>
                </Link>
              </div>
            </div>

            {/* Bottom-right testimonial / note (like Image 3) */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300 px-4 py-2.5 rounded-full glass-pill max-w-xs sm:self-end">
              <MessageSquare className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-[11px] leading-tight">
                Dirancang khusus untuk komputer laboratorium & perangkat bergerak siswa SMA.
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Clean Editorial Layout (Matches Image 2 Style) */}
        <section className="window-canvas bg-[#04162B]/85 border border-white/15 p-8 sm:p-14 lg:p-16 space-y-10">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white leading-tight">
              Seluruh fenomena geosfer saling bertaut, namun seringkali dipelajari secara{" "}
              <span className="editorial-tag text-cyan-300">terpisah</span>.
            </h2>
            <p className="font-editorial text-2xl sm:text-3xl font-light italic text-slate-300">
              Mereka membutuhkan integrasi keruangan dan pemahaman holistik.
            </p>
          </div>

          {/* Two-Column Editorial & Diagram Layout (like Figure 1 in Image 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            {/* Left Column: Conceptual Prose */}
            <div className="lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              <div className="w-8 h-[2px] bg-cyan-400 mb-3" />
              <h4 className="font-bold text-white text-base">Sistem Geografis Terpadu</h4>
              <p>
                Bencana gerakan tanah di lereng Gunung Wilis bukan semata peristiwa batuan (Litosfer), melainkan interaksi antara jenis tanah lapuk (Pedosfer), presipitasi hujan ekstrem (Atmosfer), jaringan aliran air (Hidrosfer), ketiadaan akar penahan kanopi (Biosfer), serta konversi lahan oleh aktivitas manusia (Antroposfer).
              </p>
              <p>
                Melalui antarmuka GeoSpatialX, siswa tidak hanya menghafal definisi, tetapi menganalisis langsung penyebab dan dampaknya menggunakan perangkat geospasial nyata.
              </p>
            </div>

            {/* Right Column: Minimalist Figure Diagram (like Figure 1 in Image 2) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#011024]/90 border border-white/15 shadow-xl space-y-4">
              <div className="h-64 sm:h-72 w-full rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden subtle-grid-bg">
                {/* SVG Schematic Connections */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="20%" y1="70%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50%" y1="85%" x2="50%" y2="50%" stroke="rgba(0, 210, 238, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>

                {/* Central Coordinator Node */}
                <div className="relative z-10 w-24 h-24 rounded-full border-2 border-dashed border-[#00D2EE] bg-[#00D2EE]/10 flex flex-col items-center justify-center text-center p-2 backdrop-blur-md shadow-glow">
                  <Compass className="w-5 h-5 text-[#00D2EE] mb-1 animate-spin-slow" />
                  <span className="text-[10px] font-bold text-white font-heading leading-tight">
                    Spatial Explorer
                  </span>
                </div>

                {/* Satellite Module Nodes */}
                <div className="absolute top-4 left-6 px-3 py-1 rounded-lg bg-[#04162B] border border-[#D9480F]/40 text-[10px] text-orange-300 font-semibold shadow-md">
                  Litosfer
                </div>
                <div className="absolute top-4 right-6 px-3 py-1 rounded-lg bg-[#04162B] border border-[#38BDF8]/40 text-[10px] text-sky-300 font-semibold shadow-md">
                  Atmosfer
                </div>
                <div className="absolute bottom-4 left-6 px-3 py-1 rounded-lg bg-[#04162B] border border-[#D97706]/40 text-[10px] text-amber-300 font-semibold shadow-md">
                  Pedosfer
                </div>
                <div className="absolute bottom-4 right-6 px-3 py-1 rounded-lg bg-[#04162B] border border-[#0284C7]/40 text-[10px] text-blue-300 font-semibold shadow-md">
                  Hidrosfer
                </div>
                <div className="absolute top-2 inset-x-0 mx-auto w-fit px-3 py-1 rounded-lg bg-[#04162B] border border-[#10B981]/40 text-[10px] text-emerald-300 font-semibold shadow-md">
                  Biosfer
                </div>
                <div className="absolute bottom-2 inset-x-0 mx-auto w-fit px-3 py-1 rounded-lg bg-[#04162B] border border-[#8B5CF6]/40 text-[10px] text-purple-300 font-semibold shadow-md">
                  Antroposfer
                </div>
              </div>

              {/* Figure Caption */}
              <p className="text-[11px] text-slate-400 text-center font-mono italic">
                Fig. 1 — Keterkaitan 6 Sfera Dinamika Geosfer Terpusat pada Analisis Spasial Multiskala
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: 6 Geosphere Modules Showcase */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#00D2EE]">
                Kurikulum Geografi Kelas X SMA
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-1">
                Jelajahi 6 Sfera Dinamika Geosfer
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-semibold group"
            >
              <span>Buka Peta Konsep Lengkap</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {geosphereSpheres.map((sfera) => (
              <Link
                key={sfera.num}
                href={sfera.href}
                className="glass-card-fresh rounded-3xl p-6 space-y-3.5 border border-white/10 hover:border-white/30 transition-all group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: sfera.accent }}
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{sfera.num}</span>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: sfera.accent }}
                  />
                </div>

                <h3 className="font-editorial text-2xl text-white font-normal group-hover:text-cyan-200 transition-colors">
                  Dinamika {sfera.name}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {sfera.tagline}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-cyan-300 group-hover:translate-x-1 transition-transform">
                  <span>Pelajari Materi</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Pedagogical Workflow Footer */}
        <footer className="window-canvas bg-[#021126] border border-white/15 p-8 sm:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-[#00D2EE] shadow-md">
            <Compass className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              Siap Memulai Petualangan Belajar Geografi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Mulai dari memahami konsep inti, mengeksplorasi citra satelit dan peta digital interaktif, hingga menguji kemampuan analisis pada evaluasi kognitif C4.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-white text-[#011024] font-bold text-xs hover:bg-slate-200 transition-all shadow-lg"
            >
              Masuk ke Kelas Belajar
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 border border-white/20 transition-all"
            >
              Peta Konsep 6 Bab
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 text-[11px] text-slate-500 font-mono">
            © 2026 GeoSpatialX MMI • SMAN 1 Mejayan, Kabupaten Madiun • Kurikulum Merdeka Geografi Kelas X
          </div>
        </footer>
      </main>
    </div>
  );
}
