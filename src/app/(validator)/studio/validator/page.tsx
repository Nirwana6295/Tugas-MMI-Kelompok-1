"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Map,
  Eye,
  Check,
  Clock,
  Filter,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Info,
  CheckSquare,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AppNavbar } from "@/components/layout/AppNavbar";

interface QuestionQueueItem {
  id: string;
  chapter: string;
  author: string;
  questionText: string;
  stimulusType: string;
  cognitiveLevel: string;
  status: "PENDING" | "TERVERIFIKASI" | "REVISI";
  notes: string;
  stimulusText: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  taxonomyCheck: {
    hasDiferensiasi: boolean;
    hasPengorganisasian: boolean;
    hasAtribusiKausalitas: boolean;
  };
}

interface LayerRegistryItem {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  source: string;
  license: string;
  attributionText: string;
  isVerified: boolean;
  status: "TERVERIFIKASI" | "PENDING";
  category: string;
}

export default function ValidatorStudioPage() {
  const [activeTab, setActiveTab] = useState<"questions" | "layers">("questions");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "TERVERIFIKASI" | "REVISI">("ALL");
  const [selectedQuestionForModal, setSelectedQuestionForModal] = useState<QuestionQueueItem | null>(null);
  const [revisionNotesInput, setRevisionNotesInput] = useState<string>("");

  // Approval queue for C4 Questions
  const [questionsQueue, setQuestionsQueue] = useState<QuestionQueueItem[]>([
    {
      id: "q-val-1",
      chapter: "Litosfer",
      author: "Bpk. Bambang Sutrisno, M.Pd.",
      questionText:
        "Berdasarkan analisis fenomena geologi pesisir selatan Jawa (subsidence & seismisitas dangkal), proses endogen manakah yang menjadi pemicu utamanya?",
      stimulusType: "Studi Kasus BMKG",
      cognitiveLevel: "C4 (Menganalisis)",
      status: "TERVERIFIKASI",
      notes: "Stimulus data BMKG sangat kontekstual dan menuntut daya analisis sebab-akibat yang kuat.",
      stimulusText:
        "Di wilayah pesisir selatan Jawa Timur tercatat peningkatan aktivitas seismik secara periodik dan kemunduran garis pantai rata-rata 0.8 meter per tahun akibat penurunan elevasi daratan lokal (subsidence). Hiposentrum BMKG 15-45 km.",
      options: [
        { key: "a", text: "Pengangkatan lempeng (orogenesis) akibat tumbukan benua" },
        { key: "b", text: "Subduksi lempeng Samudra Indo-Australia yang menunjam ke bawah lempeng Benua Eurasia" },
        { key: "c", text: "Vulkanisme akibat erupsi intrusi magma dasar samudra" },
        { key: "d", text: "Pelapukan kimiawi batuan gamping dan abrasi laut" },
      ],
      correctKey: "b",
      explanation:
        "Zona subduksi aktif Lempeng Samudra Indo-Australia menunjam di bawah Benua Eurasia mengakibatkan akumulasi tegangan geser elastis yang memicu gempa megathrust dan subsidensi.",
      taxonomyCheck: {
        hasDiferensiasi: true,
        hasPengorganisasian: true,
        hasAtribusiKausalitas: true,
      },
    },
    {
      id: "q-val-2",
      chapter: "Litosfer",
      author: "Bpk. Bambang Sutrisno, M.Pd.",
      questionText:
        "Kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah massal di lereng Gunung Wilis saat hujan lebat?",
      stimulusType: "Peta Tematik Kelerengan",
      cognitiveLevel: "C4 (Menganalisis)",
      status: "TERVERIFIKASI",
      notes: "Sangat kontekstual dengan kondisi geomorfologi Kabupaten Madiun dan batuan vulkanik muda.",
      stimulusText:
        "Peta tematik kelerengan lereng dan sesar aktif lereng Wilis. Wilayah Mejayan timur didominasi batuan vulkanik muda bertekstur lepas kelerengan >35% yang mengalami alih fungsi menjadi kebun semusim.",
      options: [
        { key: "a", text: "Lapisan batuan kompak yang mengalami peningkatan gaya kohesi" },
        { key: "b", text: "Tekanan air pori meningkat drastis pada bidang gelincir batuan akibat hilangnya akar pengikat vegetasi dalam" },
        { key: "c", text: "Pengurangan sudut gesek dalam tanah oleh vegetasi semusim" },
        { key: "d", text: "Peningkatan daya infiltrasi tanah mempercepat horizon O" },
      ],
      correctKey: "b",
      explanation:
        "Air hujan ekstrem menembus regolit lepas hingga lapisan batuan kedap air, melipatgandakan tekanan air pori pada bidang gelincir dan memicu longsoran.",
      taxonomyCheck: {
        hasDiferensiasi: true,
        hasPengorganisasian: true,
        hasAtribusiKausalitas: true,
      },
    },
    {
      id: "q-val-3",
      chapter: "Pedosfer",
      author: "Bpk. Bambang Sutrisno, M.Pd.",
      questionText:
        "Analisis dampak hilangnya horizon O dan A terhadap kapasitas infiltrasi dan produktivitas pertanian lereng bawah adalah:",
      stimulusType: "Diagram Profil Horizon",
      cognitiveLevel: "C4 (Menganalisis)",
      status: "PENDING",
      notes: "Menunggu peninjauan kejelasan diagram profil horizon tanah O-A-B-C-R.",
      stimulusText:
        "Profil tanah di lereng atas Wilis memperlihatkan horizon O tebal (15 cm) kaya humus. Di lereng bawah yang telah dibuka menjadi kebun terbuka, horizon O dan A telah hilang tersapu air.",
      options: [
        { key: "a", text: "Kapasitas infiltrasi meningkat karena pori makro terbuka langsung" },
        { key: "b", text: "Kapasitas retensi air dan bahan organik anjlok drastis sehingga limpasan permukaan melipatgandakan laju erosi parit" },
        { key: "c", text: "Kadar keasaman tanah menjadi netral secara alami karena terpapar matahari" },
        { key: "d", text: "Struktur remah tanah berkembang lebih cepat menjadi gumpal" },
      ],
      correctKey: "b",
      explanation:
        "Horizon O dan A menampung bahan organik perekat agregat tanah. Ketiadaan kedua horizon memicu pemadatan permukaan dan lonjakan aliran permukaan.",
      taxonomyCheck: {
        hasDiferensiasi: true,
        hasPengorganisasian: true,
        hasAtribusiKausalitas: true,
      },
    },
    {
      id: "q-val-4",
      chapter: "Atmosfer",
      author: "Bpk. Bambang Sutrisno, M.Pd.",
      questionText:
        "Berdasarkan analisis sirkulasi Walker, mengapa pemanasan muka laut Pasifik timur menekan curah hujan di Indonesia?",
      stimulusType: "Studi Kasus El Niño",
      cognitiveLevel: "C4 (Menganalisis)",
      status: "PENDING",
      notes: "Perlu pengecekan representasi grafik sel sirkulasi Walker.",
      stimulusText:
        "Saat terjadi El Niño kuat, indeks SOI negatif dan suhu muka laut Pasifik timur menghangat hingga +2.5°C di atas normal. Indonesia mengalami defisit curah hujan ekstrem.",
      options: [
        { key: "a", text: "Sel konveksi Walker bergeser ke Pasifik timur sehingga cabang sel yang turun (subsidence) berada di Indonesia dan menekan pertumbuhan awan" },
        { key: "b", text: "Angin pasat tenggara bertiup kencang mendorong seluruh uap air ke Kutub Selatan" },
        { key: "c", text: "Lapisan ozon di atas Madiun menipis dan menguapkan awan hujan" },
        { key: "d", text: "Suhu air laut Indonesia naik di atas 35°C menghambat kondensasi" },
      ],
      correctKey: "a",
      explanation:
        "Pergeseran sel Walker menempatkan cabang penurunan massa udara (subsidence) bertekanan tinggi di atas wilayah maritim Indonesia, mematikan konveksi awan hujan.",
      taxonomyCheck: {
        hasDiferensiasi: true,
        hasPengorganisasian: true,
        hasAtribusiKausalitas: true,
      },
    },
  ]);

  // Approval queue for Geospatial Layer Licenses
  const [layersQueue, setLayersQueue] = useState<LayerRegistryItem[]>([
    {
      id: "layer-val-1",
      name: "Batas Lempeng Tektonik & Ring of Fire (Level 1 Makro)",
      level: 1,
      source: "Badan Informasi Geospasial (BIG) & USGS",
      license: "CC-BY-4.0 / Open Government Data",
      attributionText: "© Badan Informasi Geospasial (BIG) & USGS 2024",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Tektonik Lempeng Global",
    },
    {
      id: "layer-val-2",
      name: "Vektor Sirkulasi Angin Muson Barat & Timur (Level 1 Makro)",
      level: 1,
      source: "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)",
      license: "Open Government Data BMKG RI",
      attributionText: "© BMKG - Pusat Meteorologi Publik 2024",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Klimatologi Nasional",
    },
    {
      id: "layer-val-3",
      name: "Garis Biogeografi Wallace & Weber (Level 1 Makro)",
      level: 1,
      source: "Kementerian Lingkungan Hidup dan Kehutanan (KLHK)",
      license: "Creative Commons Attribution 4.0",
      attributionText: "© Direktorat Konservasi Sumber Daya Alam KLHK 2024",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Biogeografi Nusantara",
    },
    {
      id: "layer-val-4",
      name: "Sub-DAS Bengawan Madiun & Jaringan Drainase (Level 2 Meso)",
      level: 2,
      source: "Balai Besar Wilayah Sungai (BBWS) Bengawan Solo",
      license: "Open Government Data Kementerian PUPR",
      attributionText: "© BBWS Bengawan Solo & Dinas PUPR Provinsi Jawa Timur 2024",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Hidrologi Regional",
    },
    {
      id: "layer-val-5",
      name: "Peta Bahaya Tanah Longsor Lereng Gunung Wilis (Level 2 Meso)",
      level: 2,
      source: "Badan Nasional Penanggulangan Bencana (BNPB) - InaRISK",
      license: "InaRISK Open Data / CC-BY-4.0",
      attributionText: "© InaRISK BNPB - Peta Bahaya Tanah Longsor Kab. Madiun 2024",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Mitigasi Bencana Geologi",
    },
    {
      id: "layer-val-6",
      name: "Citra Satelit & Street View SMAN 1 Mejayan (Level 3 Mikro)",
      level: 3,
      source: "Google Maps Platform (Satellite / Hybrid / Street View)",
      license: "Google Maps Platform Terms of Service (Educational Standard)",
      attributionText: "Map data © 2026 Google • SMAN 1 Mejayan, Kab. Madiun",
      status: "TERVERIFIKASI",
      isVerified: true,
      category: "Observasi Lokal Sekolah",
    },
  ]);

  const handleApproveQuestion = (id: string) => {
    setQuestionsQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "TERVERIFIKASI" } : q))
    );
    if (selectedQuestionForModal?.id === id) {
      setSelectedQuestionForModal(null);
    }
  };

  const handleRejectQuestion = (id: string, notes?: string) => {
    setQuestionsQueue((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: "REVISI",
              notes: notes || "Perlu revisi pada rumusan stimulus atau opsi distractor.",
            }
          : q
      )
    );
    setSelectedQuestionForModal(null);
  };

  const handleToggleLayerVerification = (id: string) => {
    setLayersQueue((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              isVerified: !l.isVerified,
              status: !l.isVerified ? "TERVERIFIKASI" : "PENDING",
            }
          : l
      )
    );
  };

  const filteredQuestions = questionsQueue.filter((q) => {
    if (filterStatus === "ALL") return true;
    return q.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#011024] text-slate-100 flex flex-col font-sans">
      <AppNavbar userRole="VALIDATOR" userName="Dr. Rina Wulandari (Ahli Materi MMI)" />

      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#04162B] via-[#091B30] to-[#04162B] border border-cyan-500/25 shadow-glow flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="warning">PORTAL PENJAMIN MUTU AKADEMIK & LISENSI</Badge>
              <span className="text-xs text-slate-400">Tim Kurasi Pembelajaran Geografi Kelas X</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-yellow-400" />
              Verifikasi Instrumen C4 & Kepatuhan Lisensi Peta
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Memastikan seluruh butir soal memenuhi taksonomi Bloom C4 (Menganalisis) terstimulus kontekstual dan seluruh data peta digital mematuhi lisensi resmi instansi pemerintah (BIG, BMKG, BNPB).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="primary" className="text-xs px-3.5 py-1.5 font-bold">
              {questionsQueue.filter((q) => q.status === "PENDING").length} Antrean Soal Tertunda
            </Badge>
            <Link href="/map-explorer">
              <Button size="md" variant="outline" className="text-xs">
                <ExternalLink className="w-4 h-4 mr-1.5 text-cyan-400" />
                <span>Uji Spatial Explorer</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-cyan-500/20 gap-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab("questions")}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "questions"
                ? "border-[#00D2EE] text-[#00D2EE]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kurasi Instrumen Soal C4 ({questionsQueue.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("layers")}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "layers"
                ? "border-[#00D2EE] text-[#00D2EE]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Registri Lisensi Data Spasial 3-Level ({layersQueue.length})</span>
          </button>
        </div>

        {/* TAB 1: QUESTIONS REVIEW */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="p-4 rounded-2xl bg-[#04162B] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 mr-1" />
                <span className="text-xs font-bold text-slate-400">Filter Status Verifikasi:</span>
                {(["ALL", "PENDING", "TERVERIFIKASI", "REVISI"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      filterStatus === st
                        ? "bg-[#00D2EE] text-[#011024] font-bold shadow-glow"
                        : "bg-[#091B30] text-slate-300 hover:text-white"
                    }`}
                  >
                    {st === "ALL" ? "Semua Butir" : st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-slate-400">
                Menampilkan {filteredQuestions.length} butir instrumen
              </span>
            </div>

            {/* Questions Queue List */}
            <div className="space-y-4">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-[#091B30] border border-cyan-500/20 space-y-4 shadow-xl hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Badge variant="primary">{q.chapter}</Badge>
                      <Badge variant="secondary">{q.stimulusType}</Badge>
                      <Badge variant="outline">{q.cognitiveLevel}</Badge>
                      <span className="text-xs text-slate-400">• Penyusun: {q.author}</span>
                    </div>

                    <div>
                      {q.status === "TERVERIFIKASI" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Disetujui Tayang ke Siswa
                        </span>
                      ) : q.status === "REVISI" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" />
                          Perlu Revisi Guru
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          Menunggu Validasi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stimulus Snippet */}
                  <div className="p-3.5 rounded-xl bg-[#011024] border border-cyan-500/20 text-xs space-y-1">
                    <span className="font-bold text-[#00D2EE] block">Stimulus Geospasial:</span>
                    <p className="text-slate-300 leading-relaxed">{q.stimulusText}</p>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-relaxed">
                    {q.questionText}
                  </h4>

                  {/* Taxonomy Bloom C4 Alignment Checklist */}
                  <div className="p-3.5 rounded-xl bg-[#04162B] border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Checklist Standar Taksonomi Bloom C4 (Menganalisis):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Diferensiasi Komponen Relevan</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pengorganisasian Struktur Spasial</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-300">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Atribusi Kausalitas Dinamika</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Notes */}
                  <div className="p-3.5 rounded-xl bg-[#011024] border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-cyan-300">Catatan Telaah Validator: </strong>
                      {q.notes}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                    <button
                      onClick={() => setSelectedQuestionForModal(q)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Periksa Opsi & Penjelasan Lengkap
                    </button>

                    <div className="flex items-center gap-2">
                      {q.status !== "REVISI" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectQuestion(q.id)}
                          className="text-rose-400 border-rose-500/40 hover:bg-rose-500/10 text-xs"
                        >
                          Minta Revisi
                        </Button>
                      )}
                      {q.status !== "TERVERIFIKASI" && (
                        <Button
                          size="sm"
                          variant="primary"
                          glow
                          onClick={() => handleApproveQuestion(q.id)}
                          className="text-xs"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Setujui Soal C4
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GEOSPATIAL LAYERS LICENSING REGISTRY */}
        {activeTab === "layers" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#04162B] border border-cyan-500/20 space-y-1">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-[#00D2EE]" />
                Registri Kepatuhan Atribusi & Lisensi Layer Geospasial
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Setiap layer data spasial yang ditampilkan pada modul Google Maps Spatial Explorer wajib divalidasi keabsahan lisensinya sebelum diizinkan tampil pada endpoint siswa.
              </p>
            </div>

            <div className="space-y-4">
              {layersQueue.map((layer) => (
                <div
                  key={layer.id}
                  className="p-6 rounded-3xl bg-[#091B30] border border-cyan-500/20 space-y-4 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Badge variant="primary">Level {layer.level}</Badge>
                      <Badge variant="outline">{layer.category}</Badge>
                      <h4 className="font-heading font-bold text-white text-sm sm:text-base">{layer.name}</h4>
                    </div>

                    <div>
                      {layer.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Lisensi Sah Terverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Verifikasi Tertunda
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#04162B] border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Instansi Sumber Resmi:
                      </span>
                      <strong className="text-white text-xs">{layer.source}</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#04162B] border border-white/5 space-y-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Tipe Lisensi Hak Cipta:
                      </span>
                      <strong className="text-cyan-300 text-xs">{layer.license}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#011024] border border-cyan-500/20 text-xs">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase mb-0.5">
                      Teks Atribusi Legal yang Ditampilkan di Peta:
                    </span>
                    <p className="font-mono text-cyan-200 text-[11px]">{layer.attributionText}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href="/map-explorer"
                      className="text-xs text-[#00D2EE] hover:underline font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Pratinjau Layer di Spatial Explorer
                    </Link>

                    <Button
                      size="sm"
                      variant={layer.isVerified ? "outline" : "primary"}
                      onClick={() => handleToggleLayerVerification(layer.id)}
                      className="text-xs"
                    >
                      {layer.isVerified ? "Cabut Verifikasi" : "Setujui & Verifikasi Lisensi"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: DETAIL TELAAH SOAL */}
        {selectedQuestionForModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="bg-[#04162B] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00D2EE]" />
                  <h3 className="font-heading font-extrabold text-white text-base">
                    Telaah Komprehensif Instrumen Soal C4
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedQuestionForModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Stimulus Pembelajaran:</span>
                  <p className="p-3 rounded-xl bg-[#011024] border border-cyan-500/20 text-slate-200 leading-relaxed">
                    {selectedQuestionForModal.stimulusText}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Rumusan Pertanyaan:</span>
                  <p className="font-bold text-white text-sm">
                    {selectedQuestionForModal.questionText}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Opsi Jawaban & Kunci Benar:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedQuestionForModal.options.map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                          opt.key === selectedQuestionForModal.correctKey
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold"
                            : "bg-[#091B30] border-white/5 text-slate-300"
                        }`}
                      >
                        <span className="w-5 h-5 rounded font-bold text-[10px] flex items-center justify-center bg-[#011024]">
                          {opt.key.toUpperCase()}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Pembahasan Ilmiah:</span>
                  <p className="p-3 rounded-xl bg-[#091B30] border border-white/5 text-slate-300 leading-relaxed">
                    {selectedQuestionForModal.explanation}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRejectQuestion(selectedQuestionForModal.id)}
                  className="text-rose-400 border-rose-500/40 hover:bg-rose-500/10"
                >
                  Minta Revisi
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  glow
                  onClick={() => handleApproveQuestion(selectedQuestionForModal.id)}
                >
                  <Check className="w-4 h-4 mr-1.5" />
                  Setujui Soal Sekarang
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
