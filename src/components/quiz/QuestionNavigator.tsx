"use client";

import React from "react";
import { Check, HelpCircle } from "lucide-react";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answeredMap: Record<string, string>;
  questions: { id: string; order: number }[];
  onSelectIndex: (index: number) => void;
}

export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answeredMap,
  questions,
  onSelectIndex,
}: QuestionNavigatorProps) {
  return (
    <div className="rounded-2xl bg-[#04162B] border border-cyan-500/20 p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-heading font-bold text-white text-xs">Navigator Soal</span>
        <span className="text-[10px] text-slate-400 font-semibold">
          {Object.keys(answeredMap).length} / {totalQuestions} Terjawab
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(answeredMap[q.id]);
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={q.id}
              onClick={() => onSelectIndex(idx)}
              className={`h-10 rounded-xl font-heading text-xs font-bold transition-all flex flex-col items-center justify-center relative ${
                isCurrent
                  ? "bg-[#00D2EE] text-[#011024] ring-2 ring-white shadow-glow scale-105"
                  : isAnswered
                  ? "bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-600/50"
                  : "bg-[#091B30] border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30"
              }`}
            >
              <span>{q.order}</span>
              {isAnswered && !isCurrent && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-md bg-emerald-500/30 border border-emerald-500/50" />
          <span>Terjawab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-md bg-[#00D2EE]" />
          <span>Sedang Dibuka</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-md bg-[#091B30] border border-white/10" />
          <span>Belum</span>
        </div>
      </div>
    </div>
  );
}
