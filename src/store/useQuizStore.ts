import { create } from "zustand";
import { QuestionDTO, QuizSubmissionResult } from "@/types";

interface QuizState {
  quizId: string | null;
  chapterSlug: string | null;
  questions: QuestionDTO[];
  currentQuestionIndex: number;
  answers: Record<string, "a" | "b" | "c" | "d">;
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  isTimerRunning: boolean;
  isSubmitting: boolean;
  isCompleted: boolean;
  result: QuizSubmissionResult | null;

  initQuiz: (quizId: string, chapterSlug: string, questions: QuestionDTO[], timeLimitMinutes: number) => void;
  selectOption: (questionId: string, optionKey: "a" | "b" | "c" | "d") => void;
  setCurrentQuestionIndex: (index: number) => void;
  decrementTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  setSubmitting: (submitting: boolean) => void;
  setCompletedResult: (result: QuizSubmissionResult) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  quizId: null,
  chapterSlug: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  timeRemainingSeconds: 900,
  totalTimeSeconds: 900,
  isTimerRunning: false,
  isSubmitting: false,
  isCompleted: false,
  result: null,

  initQuiz: (quizId, chapterSlug, questions, timeLimitMinutes) => {
    const totalSeconds = timeLimitMinutes * 60;
    set({
      quizId,
      chapterSlug,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      timeRemainingSeconds: totalSeconds,
      totalTimeSeconds: totalSeconds,
      isTimerRunning: true,
      isSubmitting: false,
      isCompleted: false,
      result: null,
    });
  },

  selectOption: (questionId, optionKey) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: optionKey,
      },
    })),

  setCurrentQuestionIndex: (index) =>
    set({
      currentQuestionIndex: index,
    }),

  decrementTimer: () => {
    const { timeRemainingSeconds, isTimerRunning } = get();
    if (!isTimerRunning) return;

    if (timeRemainingSeconds <= 1) {
      set({ timeRemainingSeconds: 0, isTimerRunning: false });
    } else {
      set({ timeRemainingSeconds: timeRemainingSeconds - 1 });
    }
  },

  pauseTimer: () => set({ isTimerRunning: false }),
  resumeTimer: () => set({ isTimerRunning: true }),

  setSubmitting: (submitting) => set({ isSubmitting: submitting }),

  setCompletedResult: (result) =>
    set({
      isSubmitting: false,
      isCompleted: true,
      isTimerRunning: false,
      result,
    }),

  resetQuiz: () =>
    set({
      quizId: null,
      chapterSlug: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      timeRemainingSeconds: 900,
      totalTimeSeconds: 900,
      isTimerRunning: false,
      isSubmitting: false,
      isCompleted: false,
      result: null,
    }),
}));
