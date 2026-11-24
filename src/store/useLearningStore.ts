import { create } from "zustand";

interface LearningState {
  currentChapterSlug: string;
  currentSubMaterialSlug: string;
  completedSubMaterials: string[]; // List of subMaterial IDs
  chapterTotalSubMaterials: Record<string, number>;
  activeVideoFallback: boolean;

  setCurrentChapter: (slug: string) => void;
  setCurrentSubMaterial: (slug: string) => void;
  markSubMaterialCompleted: (subId: string) => void;
  setChapterTotalSubMaterials: (chapterSlug: string, count: number) => void;
  toggleVideoFallback: (fallback: boolean) => void;
  isChapterUnlockedForQuiz: (chapterSlug: string, totalSubMaterials: number) => boolean;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  currentChapterSlug: "litosfer",
  currentSubMaterialSlug: "struktur-lapisan-bumi",
  completedSubMaterials: [],
  chapterTotalSubMaterials: {
    litosfer: 3,
    pedosfer: 3,
    atmosfer: 3,
    hidrosfer: 3,
    biosfer: 3,
    antroposfer: 3,
  },
  activeVideoFallback: false,

  setCurrentChapter: (slug) => set({ currentChapterSlug: slug }),
  setCurrentSubMaterial: (slug) => set({ currentSubMaterialSlug: slug }),

  markSubMaterialCompleted: (subId) =>
    set((state) => ({
      completedSubMaterials: state.completedSubMaterials.includes(subId)
        ? state.completedSubMaterials
        : [...state.completedSubMaterials, subId],
    })),

  setChapterTotalSubMaterials: (chapterSlug, count) =>
    set((state) => ({
      chapterTotalSubMaterials: {
        ...state.chapterTotalSubMaterials,
        [chapterSlug]: count,
      },
    })),

  toggleVideoFallback: (fallback) => set({ activeVideoFallback: fallback }),

  isChapterUnlockedForQuiz: (chapterSlug, totalSubMaterials) => {
    // Under the strict chapter gating rule, quiz is unlocked only when all submaterials in this chapter are completed
    const { completedSubMaterials } = get();
    // In our initial setup, if litosfer has 3 submaterials, check count
    const completedCount = completedSubMaterials.filter((id) => id.startsWith(chapterSlug)).length;
    return completedCount >= totalSubMaterials;
  },
}));
