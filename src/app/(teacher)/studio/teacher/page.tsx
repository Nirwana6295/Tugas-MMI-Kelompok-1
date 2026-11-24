"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  BookOpen,
  BarChart3,
  Plus,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  TrendingUp,
  Filter,
  Check,
  X,
  Sparkles,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AppNavbar } from "@/components/layout/AppNavbar";

interface QuestionItem {
  id: string;
  sphere: string;
  order: number;
  cognitiveLevel: string;
  stimulusType: "CASE_STUDY" | "THEMATIC_MAP" | "SATELLITE_CROP" | "DIAGRAM";
  stimulusText: string;
  questionText: string;
  options: { key: "a" | "b" | "c" | "d"; text: string }[];
  correctKey: "a" | "b" | "c" | "d";
  explanation: string;
  isVerified: boolean;
}

export default function TeacherStudioPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "groups" | "quiz-bank">("analytics");
  const [selectedSphereFilter, setSelectedSphereFilter] = useState<string>("ALL");
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState<boolean>(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState<boolean>(false);

  // Form State for Adding New Question
  const [newSphere, setNewSphere] = useState<string>("litosfer");
  const [newStimulusType, setNewStimulusType] = useState<"CASE_STUDY" | "THEMATIC_MAP" | "SATELLITE_CROP" | "DIAGRAM">("CASE_STUDY");
  const [newStimulusText, setNewStimulusText] = useState<string>("");
  const [newQuestionText, setNewQuestionText] = useState<string>("");
  const [newOptionA, setNewOptionA] = useState<string>("");
  const [newOptionB, setNewOptionB] = useState<string>("");
  const [newOptionC, setNewOptionC] = useState<string>("");
  const [newOptionD, setNewOptionD] = useState<string>("");
  const [newCorrectKey, setNewCorrectKey] = useState<"a" | "b" | "c" | "d">("b");
  const [newExplanation, setNewExplanation] = useState<string>("");

  // Recharts Data: Average C4 Scores across the 6 Geosphere Modules
  const c4ScoresByChapter = [
    { chapter: "Litosfer", avgScore: 84, passingCount: 32, needRemedial: 4 },
    { chapter: "Pedosfer", avgScore: 78, passingCount: 29, needRemedial: 7 },
    { chapter: "Atmosfer", avgScore: 72, passingCount: 24, needRemedial: 12 },
    { chapter: "Hidrosfer", avgScore: 80, passingCount: 30, needRemedial: 6 },
    { chapter: "Biosfer", avgScore: 88, passingCount: 34, needRemedial: 2 },
    { chapter: "Antroposfer", avgScore: 82, passingCount: 31, needRemedial: 5 },
  ];

  // Recharts Data: Diagnostic Group Distribution (Pengayaan vs Remedial)
  const diagnosticGroups = [
    { name: "Kelompok Pengayaan (>85)", value: 18, color: "#10B981" },
    { name: "Kelompok Mandiri (75-85)", value: 14, color: "#00D2EE" },
    { name: "Kelompok Pendampingan (<75)", value: 4, color: "#F59E0B" },
  ];

  // Recharts Data: Bloom C4 Cognitive Sub-Skills Radar
  const radarHotsData = [
    { indicator: "Diferensiasi", score: 86, fullMark: 100 },
    { indicator: "Pengorganisasian", score: 80, fullMark: 100 },
    { indicator: "Atribusi Kausalitas", score: 84, fullMark: 100 },
    { indicator: "Mitigasi Spasial", score: 79, fullMark: 100 },
    { indicator: "Interpretasi Spektral", score: 76, fullMark: 100 },
    { indicator: "Pemodelan Wilayah", score: 81, fullMark: 100 },
  ];

  // Study Groups based on teacher's initial diagnostic assessment
  const [studyGroupsList, setStudyGroupsList] = useState([
    {
      id: "grp-1",
      groupName: "Kelompok Geologi 1 (Pengayaan)",
      targetClass: "X-1",
      membersCount: 6,
      students: ["Adi Pratama", "Bunga Lestari", "Cahyo Utomo", "Dewi Sartika", "Eko Prasetyo", "Fani Rahma"],
      focusTopic: "Analisis Megathrust Pesisir Selatan & Gempa Jawa",
      status: "Pengayaan",
      actionPlan: "Riset peta sesar aktif InaTEWS BMKG & simulasi tsunami 3D",
    },
    {
      id: "grp-2",
      groupName: "Kelompok Pedologi 2 (Mandiri)",
      targetClass: "X-1",
      membersCount: 6,
      students: ["Gilang Ramadhan", "Hana Fitriani", "Indra Wijaya", "Joko Susilo", "Kartika Putri", "Lukman Hakim"],
      focusTopic: "Studi Konservasi Terasering Lereng Wilis",
      status: "Reguler",
      actionPlan: "Perhitungan rumus USLE laju erosi tanah lereng perkebunan",
    },
    {
      id: "grp-3",
      groupName: "Kelompok Hidrologi 3 (Pendampingan)",
      targetClass: "X-1",
      membersCount: 4,
      students: ["Mega Utami", "Nanda Pratama", "Oki Setiawan", "Putri Anggraini"],
      focusTopic: "Pemodelan Pola Aliran DAS Bengawan Madiun",
      status: "Remedial",
      actionPlan: "Penguatan konsep koefisien limpasan air dan hidrograf banjir",
    },
  ]);

  // C4 Question Bank (Live State)
  const [questionsBank, setQuestionsBank] = useState<QuestionItem[]>([
    {
      id: "q-lit-1",
      sphere: "litosfer",
      order: 1,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: "CASE_STUDY",
      stimulusText:
        "Di wilayah pesisir selatan Jawa Timur terjadi peningkatan seismisitas periodik dan kemunduran garis pantai rata-rata 0.8 meter/tahun akibat penurunan elevasi daratan lokal (subsidence). Hiposentrum 15-45 km.",
      questionText:
        "Berdasarkan analisis fenomena geologi tersebut, proses endogen manakah yang menjadi faktor pemicu utama subsidensi dan gempa di zona selatan Jawa?",
      options: [
        { key: "a", text: "Pengangkatan lempeng (orogenesis) akibat tumbukan antar-benua" },
        { key: "b", text: "Subduksi lempeng Samudra Indo-Australia yang menunjam ke bawah lempeng Benua Eurasia" },
        { key: "c", text: "Vulkanisme akibat intrusi magma dangkal pada palung samudra" },
        { key: "d", text: "Pelapukan kimiawi batuan gamping dan abrasi gelombang laut" },
      ],
      correctKey: "b",
      explanation:
        "Wilayah pesisir selatan Jawa berada tepat di atas zona subduksi aktif Lempeng Samudra Indo-Australia yang menunjam ke bawah Lempeng Benua Eurasia. Tegangan geser elastis memicu gempa megathrust dan subsidensi pantai.",
      isVerified: true,
    },
    {
      id: "q-lit-2",
      sphere: "litosfer",
      order: 2,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: "THEMATIC_MAP",
      stimulusText:
        "Peta tematik kelerengan lereng dan sesar aktif lereng Wilis. Wilayah Mejayan timur didominasi batuan vulkanik muda bertekstur lepas kelerengan >35% yang mengalami alih fungsi dari hutan lindung menjadi kebun semusim.",
      questionText:
        "Jika terjadi curah hujan intensitas tinggi (>100 mm/hari) berturut-turut, kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah (longsor) massal?",
      options: [
        { key: "a", text: "Lapisan batuan kompak yang mengalami peningkatan gaya kohesi" },
        { key: "b", text: "Tekanan air pori meningkat drastis pada bidang gelincir batuan akibat hilangnya akar pengikat vegetasi dalam" },
        { key: "c", text: "Pengurangan sudut gesek dalam tanah oleh vegetasi kebun semusim" },
        { key: "d", text: "Peningkatan daya infiltrasi tanah yang mempercepat pembentukan horizon O" },
      ],
      correctKey: "b",
      explanation:
        "Hilangnya vegetasi berakar dalam memicu infiltrasi jenuh air hingga bidang gelincir batuan kedap air, melipatgandakan tekanan air pori dan memicu longsoran luncuran.",
      isVerified: true,
    },
    {
      id: "q-ped-1",
      sphere: "pedosfer",
      order: 1,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: "DIAGRAM",
      stimulusText:
        "Profil tanah di lereng atas Wilis memperlihatkan horizon O dan A tebal kaya humus. Di lereng bawah yang telah dibuka menjadi kebun terbuka, horizon O dan A telah hilang tersapu erosi.",
      questionText:
        "Analisis dampak hilangnya horizon O dan A terhadap kapasitas infiltrasi dan produktivitas pertanian lereng bawah adalah:",
      options: [
        { key: "a", text: "Kapasitas infiltrasi meningkat karena pori makro batuan induk terbuka langsung" },
        { key: "b", text: "Kapasitas retensi air dan bahan organik anjlok drastis sehingga limpasan permukaan melipatgandakan laju erosi parit" },
        { key: "c", text: "Kadar keasaman tanah menjadi netral secara alami karena terpapar sinar matahari langsung" },
        { key: "d", text: "Struktur remah tanah berkembang lebih cepat menjadi struktur gumpal membulat" },
      ],
      correctKey: "b",
      explanation:
        "Horizon O dan A menampung sebagian besar bahan organik dan mikrobiota penstabil agregat. Erosi lapisan atas memicu pembentukan kerak tanah kedap air (soil crusting).",
      isVerified: true,
    },
    {
      id: "q-atm-1",
      sphere: "atmosfer",
      order: 1,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: "THEMATIC_MAP",
      stimulusText:
        "Sirkulasi Angin Muson Barat berhembus dari Benua Asia melintasi Samudra Hindia menuju Benua Australia pada Oktober-April, membawa uap air jenuh melintasi pulau Jawa.",
      questionText:
        "Analisis implikasi pola sirkulasi Angin Muson Barat terhadap kalender tanam dan neraca air pertanian padi di Kabupaten Madiun adalah:",
      options: [
        { key: "a", text: "Memicu musim kemarau ekstrem sehingga petani beralih ke tanaman palawija tahan kering" },
        { key: "b", text: "Membawa uap air jenuh yang memicu puncak musim penghujan, menjadi dasar penetapan Musim Tanam 1 (MT-1) padi sawah" },
        { key: "c", text: "Menurunkan kelembapan udara relatif di bawah 30% sehingga terjadi fenomena embun upas" },
        { key: "d", text: "Meningkatkan kecepatan evaporasi permukaan waduk hingga debit sungai menyusut drastis" },
      ],
      correctKey: "b",
      explanation:
        "Angin Muson Barat menjadi penentu utama musim hujan di Jawa bagian barat dan tengah-timur, mengawali musim tanam padi sawah lahan basah (MT-1).",
      isVerified: true,
    },
    {
      id: "q-hid-1",
      sphere: "hidrosfer",
      order: 1,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: "THEMATIC_MAP",
      stimulusText:
        "Peta batas hidrologis Wilayah Sungai Bengawan Solo: Sub-DAS Bengawan Madiun mengalami kenaikan koefisien limpasan (C) dari 0.35 menjadi 0.68 akibat degradasi tutupan lahan hulu.",
      questionText:
        "Jika terjadi hujan lebat di hulu, dampak perubahan koefisien limpasan terhadap hidrograf banjir di Caruban & Mejayan adalah:",
      options: [
        { key: "a", text: "Waktu konsentrasi air memanjang dan debit puncak banjir turun signifikan" },
        { key: "b", text: "Waktu mencapai debit puncak (time to peak) semakin singkat dan volume puncak banjir melonjak tajam" },
        { key: "c", text: "Debit aliran dasar (base flow) sungai meningkat stabil sepanjang tahun" },
        { key: "d", text: "Koefisien limpasan mendekati nol karena air terserap sempurna ke batuan beku" },
      ],
      correctKey: "b",
      explanation:
        "Koefisien limpasan yang tinggi mempercepat konversi air hujan menjadi aliran permukaan, memperpendek time to peak dan melipatgandakan debit puncak banjir bandang.",
      isVerified: true,
    },
  ]);

  const filteredQuestions = questionsBank.filter((q) => {
    if (selectedSphereFilter === "ALL") return true;
    return q.sphere.toLowerCase() === selectedSphereFilter.toLowerCase();
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !newOptionA || !newOptionB) {
      alert("Harap lengkapi redaksi soal dan pilihan jawaban!");
      return;
    }

    const newQ: QuestionItem = {
      id: `q-custom-${Date.now()}`,
      sphere: newSphere,
      order: questionsBank.length + 1,
      cognitiveLevel: "C4 (Menganalisis)",
      stimulusType: newStimulusType,
      stimulusText: newStimulusText || "Stimulus fenomena spasial kurikulum geografi kontekstual.",
      questionText: newQuestionText,
      options: [
        { key: "a", text: newOptionA },
        { key: "b", text: newOptionB },
        { key: "c", text: newOptionC || "Opsi C" },
        { key: "d", text: newOptionD || "Opsi D" },
      ],
      correctKey: newCorrectKey,
      explanation: newExplanation || "Umpan balik diagnostik ilmiah geografi.",
      isVerified: false, // Must be verified by validator
    };

    setQuestionsBank((prev) => [newQ, ...prev]);
    setIsNewQuestionModalOpen(false);

    // Reset Form
    setNewQuestionText("");
    setNewStimulusText("");
    setNewOptionA("");
    setNewOptionB("");
    setNewOptionC("");
    setNewOptionD("");
    setNewExplanation("");
  };

  return (
    <div className="min-h-screen bg-[#011024] text-slate-100 flex flex-col font-sans">
      <AppNavbar userRole="TEACHER" userName="Bpk. Bambang Sutrisno, M.Pd." />

      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
        {/* Studio Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#04162B] via-[#091B30] to-[#04162B] border border-cyan-500/25 shadow-glow flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary">STUDIO GURU GEOGRAFI</Badge>
              <span className="text-xs text-slate-400">SMAN 1 Mejayan • Tahun Ajaran 2026/2027</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-[#00D2EE]" />
              Dashboard Evaluasi, Analitik & Bank Soal C4
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Pantau ketercapaian kognitif tingkat analisis (C4), kelola kelompok belajar adaptif hasil asesmen awal, dan kelola instrumen soal berbasis stimulus.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="md"
              variant="primary"
              glow
              onClick={() => setIsNewQuestionModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Tambah Butir Soal C4</span>
            </Button>
            <Link href="/studio/validator">
              <Button size="md" variant="outline">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-yellow-400" />
                <span>Portal Validator</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex border-b border-cyan-500/20 gap-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "analytics"
                ? "border-[#00D2EE] text-[#00D2EE]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analitik Capaian C4 Siswa</span>
          </button>

          <button
            onClick={() => setActiveTab("groups")}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "groups"
                ? "border-[#00D2EE] text-[#00D2EE]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kelompok Belajar Adaptif ({studyGroupsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz-bank")}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "quiz-bank"
                ? "border-[#00D2EE] text-[#00D2EE]"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bank Soal Terstimulus ({questionsBank.length})</span>
          </button>
        </div>

        {/* TAB 1: ANALYTICS (Recharts) */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#091B30] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Siswa Aktif</span>
                <p className="font-heading font-extrabold text-2xl text-white">36 Siswa</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Kelas X-1 SMAN 1 Mejayan
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#091B30] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Rata-rata Skor C4</span>
                <p className="font-heading font-extrabold text-2xl text-[#00D2EE]">80.6 / 100</p>
                <p className="text-[11px] text-cyan-400">+5.6 poin di atas KKM (75)</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#091B30] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Tingkat Ketuntasan</span>
                <p className="font-heading font-extrabold text-2xl text-emerald-400">88.8%</p>
                <p className="text-[11px] text-slate-400">32 tuntas • 4 remedial</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#091B30] border border-cyan-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Kelompok Adaptif</span>
                <p className="font-heading font-extrabold text-2xl text-purple-400">3 Klaster</p>
                <p className="text-[11px] text-purple-300">Pengayaan, Mandiri, Remedial</p>
              </div>
            </div>

            {/* Recharts Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* BarChart: C4 Average Scores per Module */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-[#04162B] border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Rata-Rata Capaian Skor Kognitif C4 per Bab Geosfer
                    </h3>
                    <p className="text-xs text-slate-400">Evaluasi pemahaman konsep 6 sfera geosfer</p>
                  </div>
                  <Badge variant="primary" className="text-xs">
                    KKM: 75
                  </Badge>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={c4ScoresByChapter}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#092442" />
                      <XAxis dataKey="chapter" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#011024",
                          borderColor: "#00D2EE",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="avgScore" fill="#00D2EE" radius={[6, 6, 0, 0]} name="Rata-rata Nilai" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* PieChart: Diagnostic Groups Distribution */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#04162B] border border-cyan-500/20 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Distribusi Asesmen Awal
                  </h3>
                  <p className="text-xs text-slate-400">Pemetaan kelompok belajar siswa</p>
                </div>

                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diagnosticGroups}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {diagnosticGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#011024",
                          borderColor: "#00D2EE",
                          borderRadius: "0.75rem",
                          fontSize: "11px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 text-xs">
                  {diagnosticGroups.map((g, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                        <span className="text-[11px]">{g.name}</span>
                      </div>
                      <span className="font-bold text-white text-[11px]">{g.value} Siswa</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar Chart: HOTS Sub-Competencies */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 p-6 rounded-3xl bg-[#04162B] border border-cyan-500/20 space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00D2EE]" />
                    Daya Serap 6 Sub-Keterampilan Analisis C4
                  </h3>
                  <p className="text-xs text-slate-400">Profil penguasaan kompetensi spasial siswa</p>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarHotsData}>
                      <PolarGrid stroke="#0e2a47" />
                      <PolarAngleAxis dataKey="indicator" stroke="#94A3B8" fontSize={10} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                      <Radar name="Penguasaan Siswa (%)" dataKey="score" stroke="#00D2EE" fill="#00D2EE" fillOpacity={0.4} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#011024",
                          borderColor: "#00D2EE",
                          borderRadius: "0.75rem",
                          fontSize: "11px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Item Analysis & Remedial Recommendations */}
              <div className="lg:col-span-6 p-6 rounded-3xl bg-[#04162B] border border-cyan-500/20 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Analisis Butir & Rekomendasi Remedial Guru
                  </h3>
                  <p className="text-xs text-slate-400">Pemberian perlakuan berbasis diagnosis kesalahan</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#091B30] border border-cyan-500/15 space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">Litosfer (Soal #4: Likuefaksi & Amplifikasi)</strong>
                      <span className="text-amber-400 font-bold">Daya Serap 66.7%</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Siswa kerap terkecoh membedakan gelombang primer (P-wave) dan geser (S-wave) pada tanah aluvium lembah Madiun. Disarankan menggunakan simulasi video getaran tanah.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#091B30] border border-cyan-500/15 space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">Atmosfer (Soal #3: Sirkulasi Walker & El Niño)</strong>
                      <span className="text-amber-400 font-bold">Daya Serap 68.2%</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Diperlukan penjelasan visual mengenai pergeseran cabang sel konveksi atmosfer dan mekanisme subsidensi udara kering di atas kepulauan Indonesia.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#091B30] border border-cyan-500/15 space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">Hidrosfer (Soal #1: Koefisien Limpasan Sub-DAS)</strong>
                      <span className="text-emerald-400 font-bold">Daya Serap 83.3%</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Siswa sangat memahami konsep hidrograf puncak banjir DAS Bengawan Madiun pasca-alih fungsi lahan hulu Gunung Wilis.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/map-explorer">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Buka Peta Layer Wilis & DAS Madiun untuk Sesi Remedial Kelas
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDY GROUPS */}
        {activeTab === "groups" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Kelompok Belajar Adaptif Siswa</h3>
                <p className="text-xs text-slate-400">
                  Dikelompokkan secara otomatis berdasarkan hasil evaluasi kuis kognitif C4
                </p>
              </div>
              <Button size="sm" variant="primary" glow onClick={() => setIsNewGroupModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1.5" />
                <span>+ Buat Kelompok Baru</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyGroupsList.map((grp) => (
                <div
                  key={grp.id}
                  className="p-6 rounded-3xl bg-[#091B30] border border-cyan-500/20 space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          grp.status === "Pengayaan"
                            ? "success"
                            : grp.status === "Remedial"
                            ? "danger"
                            : "primary"
                        }
                      >
                        {grp.status}
                      </Badge>
                      <span className="text-[11px] text-cyan-400 font-bold font-mono">
                        {grp.membersCount} Siswa
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white">{grp.groupName}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300">Fokus Kajian:</strong> {grp.focusTopic}
                    </p>

                    <div className="p-3 rounded-xl bg-[#04162B] border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Rencana Pembelajaran:</span>
                      <p className="text-xs text-slate-200">{grp.actionPlan}</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Daftar Anggota:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {grp.students.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-[#011024] border border-cyan-500/20 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Target: Kelas {grp.targetClass}</span>
                    <button className="text-xs text-[#00D2EE] hover:underline font-semibold">
                      Kelola Anggota →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ BANK */}
        {activeTab === "quiz-bank" && (
          <div className="space-y-6">
            {/* Filter Pills & Controls */}
            <div className="p-5 rounded-2xl bg-[#04162B] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2">
                  <Filter className="w-3.5 h-3.5 text-[#00D2EE]" />
                  Filter Bab Geosfer:
                </span>
                {["ALL", "litosfer", "pedosfer", "atmosfer", "hidrosfer", "biosfer", "antroposfer"].map((sphere) => (
                  <button
                    key={sphere}
                    onClick={() => setSelectedSphereFilter(sphere)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                      selectedSphereFilter === sphere
                        ? "bg-[#00D2EE] text-[#011024] shadow-glow font-bold"
                        : "bg-[#091B30] text-slate-300 hover:text-white hover:bg-[#004090]/40"
                    }`}
                  >
                    {sphere === "ALL" ? "Semua 6 Sfera" : sphere}
                  </button>
                ))}
              </div>

              <Badge variant="primary" className="text-xs">
                {filteredQuestions.length} Butir Soal C4 Ditampilkan
              </Badge>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-[#091B30] border border-cyan-500/20 space-y-4 shadow-xl hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-[#00D2EE] border border-cyan-500/30 flex items-center justify-center font-heading font-black text-xs">
                        {q.order}
                      </span>
                      <Badge variant="primary" className="uppercase text-[10px]">
                        {q.sphere}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {q.stimulusType}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {q.cognitiveLevel}
                      </Badge>
                    </div>

                    <div>
                      {q.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Terverifikasi Validator
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                          Menunggu Validasi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stimulus Preview */}
                  <div className="p-3.5 rounded-xl bg-[#011024] border border-cyan-500/20 text-xs text-slate-300">
                    <span className="font-bold text-[#00D2EE] block mb-1">
                      Stimulus Pembelajaran:
                    </span>
                    <p className="leading-relaxed">{q.stimulusText}</p>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="font-heading font-bold text-white text-sm sm:text-base leading-relaxed">
                    {q.questionText}
                  </h4>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isCorrect = opt.key === q.correctKey;
                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                            isCorrect
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-200"
                              : "bg-[#04162B] border-white/5 text-slate-300"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded uppercase font-bold text-[10px] flex items-center justify-center shrink-0 ${
                              isCorrect
                                ? "bg-emerald-400 text-[#011024] font-black"
                                : "bg-[#011024] text-slate-400"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="leading-snug pt-0.5">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Diagnostic Explanation Feedback */}
                  <div className="p-3.5 rounded-xl bg-[#04162B] border border-white/5 space-y-1 text-xs">
                    <span className="font-bold text-cyan-300 block">
                      Kunci Jawaban ({q.correctKey.toUpperCase()}) & Pembahasan Diagnostik Ilmiah:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: TAMBAH BUTIR SOAL C4 BARU */}
        {isNewQuestionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="bg-[#04162B] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#00D2EE]" />
                  <h3 className="font-heading font-extrabold text-white text-lg">
                    Tambah Instrumen Asesmen C4 Baru
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewQuestionModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Bab Dinamika Geosfer</label>
                    <select
                      value={newSphere}
                      onChange={(e) => setNewSphere(e.target.value)}
                      className="w-full bg-[#011024] border border-cyan-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2EE]"
                    >
                      <option value="litosfer">Litosfer</option>
                      <option value="pedosfer">Pedosfer</option>
                      <option value="atmosfer">Atmosfer</option>
                      <option value="hidrosfer">Hidrosfer</option>
                      <option value="biosfer">Biosfer</option>
                      <option value="antroposfer">Antroposfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Tipe Stimulus Multimodal</label>
                    <select
                      value={newStimulusType}
                      onChange={(e) => setNewStimulusType(e.target.value as any)}
                      className="w-full bg-[#011024] border border-cyan-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2EE]"
                    >
                      <option value="CASE_STUDY">Studi Kasus Lapangan</option>
                      <option value="THEMATIC_MAP">Peta Tematik Geologi / Wilayah</option>
                      <option value="SATELLITE_CROP">Potongan Citra Satelit</option>
                      <option value="DIAGRAM">Diagram Profil / Alur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Teks Stimulus Fenomena</label>
                  <textarea
                    rows={3}
                    value={newStimulusText}
                    onChange={(e) => setNewStimulusText(e.target.value)}
                    placeholder="Masukkan narasi stimulus fenomena, data BMKG/BIG, atau observasi lapangan..."
                    className="w-full bg-[#011024] border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D2EE]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Rumusan Pertanyaan (Tingkat Kognitif C4)</label>
                  <input
                    type="text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Contoh: Berdasarkan analisis fenomena tersebut, faktor manakah..."
                    className="w-full bg-[#011024] border border-cyan-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2EE]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 font-semibold block">Pilihan Jawaban (A, B, C, D)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Opsi A..."
                      value={newOptionA}
                      onChange={(e) => setNewOptionA(e.target.value)}
                      className="bg-[#011024] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="Opsi B..."
                      value={newOptionB}
                      onChange={(e) => setNewOptionB(e.target.value)}
                      className="bg-[#011024] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="Opsi C..."
                      value={newOptionC}
                      onChange={(e) => setNewOptionC(e.target.value)}
                      className="bg-[#011024] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="Opsi D..."
                      value={newOptionD}
                      onChange={(e) => setNewOptionD(e.target.value)}
                      className="bg-[#011024] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Kunci Jawaban Benar</label>
                    <select
                      value={newCorrectKey}
                      onChange={(e) => setNewCorrectKey(e.target.value as any)}
                      className="w-full bg-[#011024] border border-emerald-500/40 rounded-xl px-3 py-2 text-emerald-300 font-bold focus:outline-none"
                    >
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                      <option value="d">D</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">
                    Pembahasan Diagnostik Ilmiah (Umpan Balik Pasca-Ujian)
                  </label>
                  <textarea
                    rows={2}
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    placeholder="Jelaskan alasan ilmiah mengapa jawaban tersebut benar untuk umpan balik diagnostik siswa..."
                    className="w-full bg-[#011024] border border-cyan-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#00D2EE]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewQuestionModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" variant="primary" glow>
                    <Check className="w-4 h-4 mr-1.5" />
                    Simpan & Ajukan ke Validator
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
