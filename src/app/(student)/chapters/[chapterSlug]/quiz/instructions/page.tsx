"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChapterLockGuard } from "@/components/learning/ChapterLockGuard";
import { useLearningStore } from "@/store/useLearningStore";

interface QuizInstructionsPageProps {
  params: {
    chapterSlug: string;
  };
}

export default function QuizInstructionsPage({ params }: QuizInstructionsPageProps) {
  const router = useRouter();
  const { completedSubMaterials } = useLearningStore();

  const chapterSlug = params.chapterSlug || "litosfer";
  const chapterTitle =
    chapterSlug === "litosfer" ? "Dinamika Litosfer" : `Dinamika ${chapterSlug}`;

  // Check completion: in demo, litosfer is marked 100% complete
  const subMaterials = [
    {
      order: 1,
      title: "Struktur Internal Lapisan Bumi",
      slug: "struktur-lapisan-bumi",
      isCompleted: true,
    },
    {
      order: 2,
      title: "Tenaga Endogen & Eksogen Pembentuk Muka Bumi",
      slug: "tenaga-endogen-eksogen",
      isCompleted: true,
    },
    {
      order: 3,
      title: "Mitigasi Bencana Geologis Kontekstual Madiun",
      slug: "mitigasi-bencana-geologis",
      isCompleted: true,
    },
  ];

  const totalSubs = subMaterials.length;
  const completedCount = subMaterials.filter((s) => s.isCompleted).length;

  const instructions = [
    {
      num: "1",
      title: "Kerjakan dalam Batas Waktu",
      desc: "Setiap sesi kuis memiliki batas waktu pengerjaan 15 menit. Jawaban akan otomatis terkirim jika waktu habis.",
    },
    {
      num: "2",
      title: "Pilih Satu Jawaban Terbaik",
      desc: "Setiap butir soal memiliki 4 opsi (A, B, C, D) dengan stimulus peta, citra satelit, atau studi kasus.",
    },
    {
      num: "3",
      title: "Navigasi Nomor Soal Fleksibel",
      desc: "Gunakan navigator nomor soal untuk berpindah dan meninjau kembali jawaban yang masih ragu.",
    },
    {
      num: "4",
      title: "Tingkat Kognitif C4 (Menganalisis)",
      desc: "Soal menuntut daya analisis sebab-akibat fenomena geografi nyata di wilayah Jawa Timur, bukan hafalan rumus.",
    },
    {
      num: "5",
      title: "Umpan Balik Diagnostik Seketika",
      desc: "Setelah pengumpulan, sistem server akan langsung menampilkan skor akhir dan pembahasan analitis tiap butir soal.",
    },
  ];

  return (
    <ChapterLockGuard
      chapterSlug={chapterSlug}
      chapterTitle={chapterTitle}
      totalSubMaterials={totalSubs}
      completedCount={completedCount}
      subMaterialsList={subMaterials}
    >
      <div className="max-w-3xl mx-auto py-6 space-y-6">
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <Badge variant="primary">Asesmen Sumatif Akhir Bab</Badge>
        </div>

        {/* Main Instruction Card (Matching Page 83 of Design UI UX.pdf) */}
        <Card className="glass-panel-glow border-cyan-500/30 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                Evaluasi Bab • {chapterTitle}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Petunjuk Pengerjaan Kuis
              </h1>
              <p className="text-xs text-slate-300">
                Baca dengan teliti aturan dan petunjuk berikut sebelum memulai kuis sumatif C4.
              </p>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-cyan-500/15 text-center">
            <div className="p-3 rounded-xl bg-[#04162B] border border-white/5 space-y-0.5">
              <p className="text-[10px] text-slate-400">Batas Waktu</p>
              <p className="font-heading font-bold text-white text-sm flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                15 Menit
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#04162B] border border-white/5 space-y-0.5">
              <p className="text-[10px] text-slate-400">Jumlah Soal</p>
              <p className="font-heading font-bold text-white text-sm">5 Soal C4</p>
            </div>
            <div className="p-3 rounded-xl bg-[#04162B] border border-white/5 space-y-0.5">
              <p className="text-[10px] text-slate-400">Passing Grade</p>
              <p className="font-heading font-bold text-emerald-400 text-sm">75 / 100</p>
            </div>
          </div>

          {/* Rules List from Design Page 83 */}
          <div className="space-y-3 pt-2">
            <h3 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D2EE]" />
              <span>Aturan Pengerjaan Kuis:</span>
            </h3>

            <div className="space-y-2">
              {instructions.map((ins) => (
                <div
                  key={ins.num}
                  className="p-3 rounded-xl bg-[#04162B] border border-white/5 flex items-start gap-3 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {ins.num}
                  </span>
                  <div>
                    <p className="font-bold text-white text-xs">{ins.title}</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{ins.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA: Start Quiz */}
          <div className="pt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-4">
            <Link href={`/learn/${chapterSlug}/mitigasi-bencana-geologis`}>
              <Button size="md" variant="outline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Review Submateri 03</span>
              </Button>
            </Link>

            <Link href={`/chapters/${chapterSlug}/quiz`}>
              <Button size="lg" variant="primary" glow className="shadow-glow-lg font-bold">
                <span>Mulai Pengerjaan Kuis C4</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </ChapterLockGuard>
  );
}
