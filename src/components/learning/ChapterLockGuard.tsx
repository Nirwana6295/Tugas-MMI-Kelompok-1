"use client";

import React from "react";
import Link from "next/link";
import { Lock, AlertCircle, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ChapterLockGuardProps {
  chapterSlug: string;
  chapterTitle: string;
  totalSubMaterials: number;
  completedCount: number;
  subMaterialsList?: { order: number; title: string; slug: string; isCompleted: boolean }[];
  children: React.ReactNode;
}

export function ChapterLockGuard({
  chapterSlug,
  chapterTitle,
  totalSubMaterials,
  completedCount,
  subMaterialsList = [],
  children,
}: ChapterLockGuardProps) {
  const isUnlocked = completedCount >= totalSubMaterials && totalSubMaterials > 0;
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / (totalSubMaterials || 1)) * 100)
  );

  // If chapter is 100% completed, allow access to Quiz
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Otherwise, lock down and render clear pedagogical message
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="glass-panel-glow border-amber-500/30 text-center p-8 space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="warning" className="mx-auto">
            AKSES KUIS SUMATIF TERKUNCI (CHAPTER GATING)
          </Badge>
          <h2 className="font-heading text-2xl font-extrabold text-white">
            Selesaikan Seluruh Submateri Terlebih Dahulu
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Sesuai panduan pedagogis Geografi Kelas X, kuis sumatif kognitif level C4 hanya dapat
            diakses setelah Anda menuntaskan 100% materi pada bab <strong>{chapterTitle}</strong>.
          </p>
        </div>

        {/* Progress Status */}
        <div className="p-4 rounded-2xl bg-[#04162B] border border-cyan-500/20 text-left space-y-2 max-w-md mx-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">Progres Ketuntasan Bab:</span>
            <span className="font-bold text-amber-400">
              {completedCount} dari {totalSubMaterials} Submateri ({progressPercent}%)
            </span>
          </div>
          <ProgressBar value={progressPercent} color="#F59E0B" size="md" />
        </div>

        {/* Submaterials Checklist */}
        {subMaterialsList.length > 0 && (
          <div className="space-y-2 text-left max-w-md mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Daftar Submateri Wajib:
            </span>
            {subMaterialsList.map((sub) => (
              <div
                key={sub.order}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#091B30]/70 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">0{sub.order}.</span>
                  <span className="text-slate-200 font-medium">{sub.title}</span>
                </div>
                {sub.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-amber-400 font-semibold">Belum Tuntas</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/dashboard">
            <Button size="md" variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Kembali ke Menu Utama</span>
            </Button>
          </Link>

          <Link href={`/learn/${chapterSlug}/struktur-lapisan-bumi`}>
            <Button size="md" variant="primary" glow>
              <BookOpen className="w-4 h-4 mr-1" />
              <span>Buka Materi Pembelajaran</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
