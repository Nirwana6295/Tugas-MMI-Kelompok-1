"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Video,
  Volume2,
  MapPin,
  Award,
  Sparkles,
  Wifi,
  WifiOff,
  Layers,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLearningStore } from "@/store/useLearningStore";

interface SubMaterialData {
  id: string;
  slug: string;
  order: number;
  title: string;
  summary: string;
  contentMarkdown: string;
  diagramUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  latitude?: number;
  longitude?: number;
  zoomLevel?: number;
}

interface ChapterData {
  id: string;
  slug: string;
  title: string;
  order: number;
  sphereName: string;
  themeColor: string;
  videoUrl?: string;
  subMaterials: SubMaterialData[];
}

interface ContextualLessonViewerProps {
  chapter: ChapterData;
  subMaterial: SubMaterialData;
}

export function ContextualLessonViewer({ chapter, subMaterial }: ContextualLessonViewerProps) {
  const router = useRouter();
  const { completedSubMaterials, markSubMaterialCompleted } = useLearningStore();

  const [isCompletedLocally, setIsCompletedLocally] = useState(
    completedSubMaterials.includes(subMaterial.id)
  );
  const [useLowBandwidthVideo, setUseLowBandwidthVideo] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSubmittingProgress, setIsSubmittingProgress] = useState(false);

  const currentIndex = chapter.subMaterials.findIndex((s) => s.slug === subMaterial.slug);
  const prevSub = currentIndex > 0 ? chapter.subMaterials[currentIndex - 1] : null;
  const nextSub =
    currentIndex < chapter.subMaterials.length - 1 ? chapter.subMaterials[currentIndex + 1] : null;

  // Compute progress for this chapter
  const completedInChapterCount = chapter.subMaterials.filter(
    (s) => completedSubMaterials.includes(s.id) || (s.id === subMaterial.id && isCompletedLocally)
  ).length;
  const chapterProgressPercent = Math.min(
    100,
    Math.round((completedInChapterCount / chapter.subMaterials.length) * 100)
  );
  const isAllChapterCompleted = chapterProgressPercent >= 100;

  const handleMarkComplete = async () => {
    setIsSubmittingProgress(true);
    setIsCompletedLocally(true);
    markSubMaterialCompleted(subMaterial.id);

    try {
      await fetch("/api/v1/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "siswa-demo-mejayan",
          subMaterialId: subMaterial.id,
          chapterSlug: chapter.slug,
        }),
      });
    } catch (e) {
      console.warn("Offline fallback: progress marked locally");
    } finally {
      setIsSubmittingProgress(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Breadcrumb & Progress Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#091B30]/80 border border-cyan-500/20 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Peta Konsep
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold" style={{ color: chapter.themeColor }}>
            {chapter.title}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold truncate max-w-xs">{subMaterial.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">Ketuntasan Bab:</span>
          <div className="w-28">
            <ProgressBar value={chapterProgressPercent} color={chapter.themeColor} size="sm" />
          </div>
          <span className="font-bold text-white text-[11px]">{chapterProgressPercent}%</span>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div
        className="rounded-3xl p-6 sm:p-8 bg-[#04162B] border relative overflow-hidden shadow-2xl"
        style={{ borderColor: `${chapter.themeColor}44` }}
      >
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[70px] pointer-events-none"
          style={{ backgroundColor: `${chapter.themeColor}22` }}
        />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="module"
              moduleColor={chapter.themeColor}
              className="px-2.5 py-0.5 text-xs font-bold"
            >
              SUBMATERI 0{subMaterial.order} • {chapter.sphereName}
            </Badge>

            {isCompletedLocally && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Selesai Dipelajari
              </span>
            )}
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {subMaterial.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {subMaterial.summary}
          </p>
        </div>
      </div>

      {/* Multimodal Media Viewers (Video & Audio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Video Player with School-Lab Low Bandwidth Toggle */}
        <div className="lg:col-span-8 space-y-3">
          <div className="p-4 rounded-2xl bg-[#091B30]/90 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <Video className="w-4 h-4 text-[#00D2EE]" />
                <span>Video Animasi Kontekstual Pembelajaran</span>
              </div>

              {/* Low-Bandwidth Toggle */}
              <button
                onClick={() => setUseLowBandwidthVideo(!useLowBandwidthVideo)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#011024] border border-cyan-500/30 text-[10px] font-semibold text-cyan-300 hover:text-white"
              >
                {useLowBandwidthVideo ? (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-400" />
                    <span>Mode Hemat Bandwidth Aktif</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>Lab Sekolah: Mode Normal</span>
                  </>
                )}
              </button>
            </div>

            {/* Video Viewport / Low Bandwidth Fallback */}
            {useLowBandwidthVideo ? (
              <div className="aspect-video rounded-xl bg-[#011024] border border-white/10 p-6 flex flex-col justify-center items-center text-center space-y-2">
                <Layers className="w-10 h-10 text-cyan-400 mb-1" />
                <h4 className="font-bold text-white text-sm">
                  Ringkasan Visual Cepat (Koneksi Terbatas)
                </h4>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                  Menampilkan infografis gerak lapisan litosfer dan simulasi sesar tektonik tanpa streaming video berat, hemat kuota internet laboratorium.
                </p>
                <div className="pt-2">
                  <Badge variant="primary" className="text-[10px]">
                    Infografis Statis Termuat
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  className="w-full h-full"
                  src={subMaterial.videoUrl || chapter.videoUrl || "https://www.youtube.com/embed/UFEtgNYnYGs"}
                  title={subMaterial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Audio Player & Direct Spatial Link */}
        <div className="lg:col-span-4 space-y-4">
          {/* Audio Player Card */}
          <div className="p-4 rounded-2xl bg-[#091B30]/90 border border-cyan-500/20 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-xs">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Audio Penjelasan Konseptual</span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Dengarkan rekaman narasi penjelasan guru mengenai {subMaterial.title}:
            </p>

            <div className="p-3 rounded-xl bg-[#011024] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-[#00D2EE] text-[#011024] flex items-center justify-center font-bold shadow-glow"
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div>
                  <p className="text-xs font-bold text-white">Audio Narasi Bab 1</p>
                  <p className="text-[10px] text-slate-400">
                    {isPlayingAudio ? "Memutar: 01:24 / 03:40" : "Durasi: 03:40 menit"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Spatial Explorer Shortcut */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#091B30] to-[#04162B] border border-cyan-500/30 space-y-3 shadow-glow">
            <div className="flex items-center gap-2 text-[#00D2EE] font-bold text-xs">
              <MapPin className="w-4 h-4" />
              <span>Observasi Spasial Terkait</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Buka Google Maps Level 3 untuk mengamati konteks lokasi SMAN 1 Mejayan dan sesar Wilis secara langsung:
            </p>
            <Link href="/map-explorer">
              <Button size="sm" variant="primary" glow className="w-full text-xs">
                <span>Eksplorasi di Peta Level 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Lesson Theory (Markdown Content) */}
      <Card className="glass-panel p-6 sm:p-8 space-y-4 text-slate-200 leading-relaxed text-sm">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-line leading-relaxed font-body text-slate-200">
            {subMaterial.contentMarkdown}
          </div>
        </div>

        {/* Action: Mark SubMaterial Complete */}
        <div className="pt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-sm">Ketuntasan Aktivitas Belajar</p>
            <p className="text-xs text-slate-400">
              Tandai submateri ini telah selesai agar progres bab tercatat dan kuis sumatif terbuka.
            </p>
          </div>

          <Button
            size="md"
            variant={isCompletedLocally ? "secondary" : "primary"}
            glow={!isCompletedLocally}
            onClick={handleMarkComplete}
            disabled={isSubmittingProgress}
          >
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" />
            <span>{isCompletedLocally ? "Sudah Tuntas (Tandai Ulang)" : "Tandai Submateri Selesai"}</span>
          </Button>
        </div>
      </Card>

      {/* Bottom Navigation Buttons (Kembali, Lanjut, Buka Kuis Sumatif) */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
        {prevSub ? (
          <Link href={`/learn/${chapter.slug}/${prevSub.slug}`}>
            <Button size="md" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Sebelumnya: 0{prevSub.order}</span>
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button size="md" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Menu Utama</span>
            </Button>
          </Link>
        )}

        <div className="flex items-center gap-3">
          {nextSub ? (
            <Link href={`/learn/${chapter.slug}/${nextSub.slug}`}>
              <Button size="md" variant="primary" glow>
                <span>Lanjut: Submateri 0{nextSub.order}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            // Last submaterial reached: show quiz button
            <Link href={`/chapters/${chapter.slug}/quiz/instructions`}>
              <Button
                size="md"
                variant={isAllChapterCompleted ? "primary" : "secondary"}
                glow={isAllChapterCompleted}
                className={isAllChapterCompleted ? "shadow-glow-lg border-amber-400/50" : "opacity-80"}
              >
                <Award className="w-4 h-4 mr-1.5 text-amber-400" />
                <span>
                  {isAllChapterCompleted
                    ? "Buka Kuis Sumatif C4 Bab"
                    : "Kuis Sumatif C4 (Selesaikan 100%)"}
                </span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
