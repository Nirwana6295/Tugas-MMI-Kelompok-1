"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Send, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { C4StimulusPanel } from "@/components/quiz/C4StimulusPanel";
import { QuestionNavigator } from "@/components/quiz/QuestionNavigator";
import { QuestionDTO, QuizSubmissionResult } from "@/types";
import { formatTime } from "@/lib/utils";

interface C4QuizPlayerProps {
  chapterSlug: string;
  initialQuestions: QuestionDTO[];
}

export function C4QuizPlayer({ chapterSlug, initialQuestions }: C4QuizPlayerProps) {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionDTO[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 mins
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(); // Auto submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (key: "a" | "b" | "c" | "d") => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeRemaining < 180; // Less than 3 minutes

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setShowSubmitModal(false);

    try {
      const res = await fetch(`/api/v1/quizzes/${chapterSlug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: `quiz-${chapterSlug}`,
          userId: "siswa-demo-mejayan",
          timeSpentSeconds: 15 * 60 - timeRemaining,
          answers,
        }),
      });

      if (res.ok) {
        const result: QuizSubmissionResult = await res.json();
        // Store in sessionStorage for results page rendering
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`quiz_result_${chapterSlug}`, JSON.stringify(result));
        }
        router.push(`/chapters/${chapterSlug}/quiz/result`);
      } else {
        alert("Gagal mengumpulkan kuis. Mencoba kembali...");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Quiz Top Bar with Countdown Timer */}
      <div className="sticky top-20 z-40 p-4 rounded-2xl bg-[#011024]/90 backdrop-blur-md border border-cyan-500/25 shadow-glow flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
            Asesmen Sumatif Kognitif C4
          </span>
          <h2 className="font-heading font-extrabold text-base text-white">
            Evaluasi Dinamika {chapterSlug.toUpperCase()}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer Badge */}
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-heading font-black text-sm transition-all ${
              isTimeCritical
                ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse"
                : "bg-[#04162B] border-cyan-500/30 text-white"
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? "text-rose-400" : "text-[#00D2EE]"}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <Button
            size="sm"
            variant="primary"
            glow
            onClick={() => setShowSubmitModal(true)}
            disabled={isSubmitting}
            className="text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5 mr-1" />
            <span>Kumpulkan Jawaban</span>
          </Button>
        </div>
      </div>

      {/* Main Playing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question & Stimulus Panel */}
        <div className="lg:col-span-8 space-y-5">
          {/* Question Header & Order */}
          <div className="flex items-center justify-between px-1">
            <span className="font-heading font-black text-sm text-[#00D2EE]">
              Soal Evaluasi {currentQ.order} dari {questions.length}
            </span>
            <Badge variant="secondary" className="text-[10px]">
              Tingkat Analisis HOTS
            </Badge>
          </div>

          {/* Stimulus Panel */}
          <C4StimulusPanel
            stimulusType={currentQ.stimulus_type}
            stimulusText={currentQ.stimulus_text}
            stimulusUrl={currentQ.stimulus_url}
          />

          {/* Question Statement */}
          <Card className="glass-panel p-6 space-y-4">
            <h3 className="font-heading text-base font-bold text-white leading-relaxed">
              {currentQ.question_text}
            </h3>

            {/* Options List A, B, C, D */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? "bg-[#00D2EE]/15 border-[#00D2EE] text-white shadow-glow"
                        : "bg-[#04162B] border-white/5 text-slate-300 hover:border-cyan-500/30 hover:bg-[#091B30]"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg uppercase font-heading font-extrabold text-xs flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? "bg-[#00D2EE] text-[#011024] border-[#00D2EE] font-black"
                          : "bg-[#011024] border-white/10 text-slate-400 group-hover:text-white"
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Prev / Next Question Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              size="md"
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Soal Sebelumnya</span>
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                size="md"
                variant="primary"
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              >
                <span>Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                size="md"
                variant="primary"
                glow
                onClick={() => setShowSubmitModal(true)}
              >
                <span>Selesai & Kumpulkan</span>
                <Send className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Navigator Panel & Question State */}
        <div className="lg:col-span-4 space-y-4">
          <QuestionNavigator
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            answeredMap={answers}
            questions={questions}
            onSelectIndex={(idx) => setCurrentIndex(idx)}
          />

          <div className="p-4 rounded-2xl bg-[#04162B] border border-cyan-500/20 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-4 h-4 text-[#00D2EE]" />
              Integritas & Keamanan Kuis
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Kunci jawaban dan pembahasan analitis diproteksi 100% di server backend untuk mencegah kebocoran jawaban.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#04162B] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-[#00D2EE] flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading font-extrabold text-xl text-white">
                Kumpulkan Jawaban Kuis?
              </h3>
              <p className="text-xs text-slate-300">
                Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{questions.length}</strong> soal.
                {answeredCount < questions.length && (
                  <span className="text-amber-400 block font-semibold mt-1">
                    Peringatan: Masih ada {questions.length - answeredCount} soal yang belum Anda jawab!
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowSubmitModal(false)}
                disabled={isSubmitting}
              >
                Tinjau Kembali
              </Button>

              <Button
                variant="primary"
                size="md"
                glow
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menilai..." : "Ya, Kumpulkan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
