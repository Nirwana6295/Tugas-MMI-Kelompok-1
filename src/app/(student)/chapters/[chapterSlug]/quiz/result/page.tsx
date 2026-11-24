"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Sparkles,
  Info,
  Compass,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuizSubmissionResult } from "@/types";

interface QuizResultPageProps {
  params: {
    chapterSlug: string;
  };
}

export default function QuizResultPage({ params }: QuizResultPageProps) {
  const chapterSlug = params.chapterSlug || "litosfer";
  const [result, setResult] = useState<QuizSubmissionResult | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`quiz_result_${chapterSlug}`);
      if (stored) {
        try {
          setResult(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [chapterSlug]);

  // Default fallback mock if user navigates directly
  const data: QuizSubmissionResult = result || {
    attemptId: "att-demo-litosfer",
    score: 80,
    totalQuestions: 5,
    correctCount: 4,
    isPassed: true,
    passingScore: 75,
    submittedAt: new Date().toISOString(),
    diagnostics: [
      {
        questionId: "q-1",
        order: 1,
        userAnswerKey: "b",
        isCorrect: true,
        correctAnswerKey: "b",
        cognitiveLevel: "C4 (Menganalisis)",
        explanation:
          "Wilayah pesisir selatan Jawa berada tepat di atas zona subduksi aktif Lempeng Samudra Indo-Australia yang menunjam ke bawah Lempeng Benua Eurasia.",
      },
      {
        questionId: "q-2",
        order: 2,
        userAnswerKey: "b",
        isCorrect: true,
        correctAnswerKey: "b",
        cognitiveLevel: "C4 (Menganalisis)",
        explanation:
          "Tekanan air pori yang meningkat drastis pada bidang gelincir batuan akibat ketiadaan akar vegetasi hutan merupakan pemicu utama longsoran lereng Wilis.",
      },
      {
        questionId: "q-3",
        order: 3,
        userAnswerKey: "b",
        isCorrect: true,
        correctAnswerKey: "b",
        cognitiveLevel: "C4 (Menganalisis)",
        explanation:
          "Rona gelap bertekstur kasar pada band inframerah mencirikan tutupan kanopi pohon lebat hutan konservasi.",
      },
      {
        questionId: "q-4",
        order: 4,
        userAnswerKey: "a",
        isCorrect: false,
        correctAnswerKey: "b",
        cognitiveLevel: "C4 (Menganalisis)",
        explanation:
          "Jawaban yang tepat adalah B. Lapisan aluvium lunak mengalami efek amplifikasi gelombang seismik permukaan (S-wave) dan rawan likuefaksi saat jenuh air.",
      },
      {
        questionId: "q-5",
        order: 5,
        userAnswerKey: "a",
        isCorrect: true,
        correctAnswerKey: "a",
        cognitiveLevel: "C4 (Menganalisis)",
        explanation:
          "Kombinasi Sabo Dam di hulu dan Early Warning System sensor debit merupakan proteksi limpasan banjir lahar dingin paling efektif.",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 pb-20">
      {/* Thank You Completion Hero (Page 93 of Design UI UX.pdf) */}
      <Card className="glass-panel-glow border-cyan-500/40 p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl space-y-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D2EE]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#004090] to-[#00D2EE] text-[#011024] p-0.5 mx-auto shadow-glow">
          <div className="w-full h-full bg-[#011024] rounded-[22px] flex items-center justify-center">
            <Award className="w-8 h-8 text-[#00D2EE]" />
          </div>
        </div>

        {/* Narrative from Page 93 */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terima Kasih!
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Kamu sudah menyelesaikan perjalanan belajar geografi hari ini. Setiap langkah kecil adalah bagian dari perjalanan besar menuju masa depan yang lebih baik.
          </p>
          <p className="text-xs text-cyan-300 font-semibold italic pt-1">
            “Terus belajar, terus menjelajah, karena bumi ini punya banyak cerita untuk kamu pahami.”
          </p>
        </div>

        {/* Score Summary Box */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="p-5 rounded-2xl bg-[#04162B] border border-cyan-500/30 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Skor Asesmen C4
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-4xl text-white">{data.score}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="text-right">
              {data.isPassed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  LULUS TUNTAS
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold text-xs">
                  <RotateCcw className="w-4 h-4" />
                  PERLU REMEDIAL
                </span>
              )}
              <p className="text-[10px] text-slate-400 mt-1">
                Kriteria Ketuntasan Minimal: {data.passingScore}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Itemized Diagnostic Report Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00D2EE]" />
            <span>Laporan Diagnostik & Analisis Butir Soal C4</span>
          </h2>
          <Badge variant="secondary" className="text-xs">
            {data.correctCount} dari {data.totalQuestions} Benar
          </Badge>
        </div>

        <div className="space-y-3">
          {data.diagnostics.map((diag) => (
            <div
              key={diag.questionId}
              className={`p-5 rounded-2xl border transition-all space-y-2.5 ${
                diag.isCorrect
                  ? "bg-[#091B30]/80 border-emerald-500/30"
                  : "bg-[#091B30]/80 border-rose-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs text-white">
                  Soal Nomor {diag.order} ({diag.cognitiveLevel})
                </span>

                {diag.isCorrect ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Jawaban Benar ({diag.userAnswerKey.toUpperCase()})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/30">
                    <XCircle className="w-3.5 h-3.5" />
                    Jawaban Anda: {diag.userAnswerKey.toUpperCase()} • Kunci: {diag.correctAnswerKey.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Diagnostic Explanation */}
              <div className="p-3.5 rounded-xl bg-[#04162B] border border-white/5 space-y-1">
                <p className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Pembahasan Analitis Geografi:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{diag.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/dashboard">
          <Button size="lg" variant="outline">
            <Compass className="w-4 h-4 mr-1" />
            <span>Kembali ke Peta Konsep</span>
          </Button>
        </Link>

        <Link href="/map-explorer">
          <Button size="lg" variant="primary" glow>
            <span>Buka Spatial Explorer (Peta 3 Level)</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
