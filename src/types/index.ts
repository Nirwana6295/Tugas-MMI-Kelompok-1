export type Role = "STUDENT" | "TEACHER" | "VALIDATOR" | "ADMIN";

export type LayerLevel = 1 | 2 | 3; // 1: Makro, 2: Meso, 3: Mikro

export interface AttributionMetadata {
  sourceName: string;
  licenseType: string;
  attributionText: string;
  year?: number;
}

export interface NineElementsRS {
  rona: string;      // Brightness / Tone
  warna: string;     // Color
  bentuk: string;    // Shape
  ukuran: string;    // Size / Scale
  tekstur: string;   // Texture (Smooth / Coarse)
  pola: string;      // Pattern
  bayangan: string;  // Shadow
  situs: string;     // Site / Relative topographic position
  asosiasi: string;  // Association with surrounding features
}

export interface MapObservationPoint {
  id: string;
  name: string;
  category: string;
  coordinates: [number, number]; // [lng, lat]
  description: string;
  interpretation?: NineElementsRS;
}

export interface QuestionDTO {
  id: string;
  order: number;
  cognitive_level: string; // "C4"
  stimulus_type: "IMAGE" | "SATELLITE_CROP" | "THEMATIC_MAP" | "AUDIO" | "VIDEO" | "CASE_STUDY";
  stimulus_url?: string;
  stimulus_text: string;
  question_text: string;
  options: {
    key: "a" | "b" | "c" | "d";
    text: string;
  }[];
}

export interface DiagnosticItemResult {
  questionId: string;
  order: number;
  userAnswerKey: string;
  isCorrect: boolean;
  correctAnswerKey: string;
  cognitiveLevel: string;
  explanation: string;
}

export interface QuizSubmissionResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  isPassed: boolean;
  passingScore: number;
  submittedAt: string;
  diagnostics: DiagnosticItemResult[];
}
