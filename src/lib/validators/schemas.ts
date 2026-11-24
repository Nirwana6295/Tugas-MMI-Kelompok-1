import { z } from "zod";

export const StudentLoginSchema = z.object({
  name: z.string().min(2, "Nama lengkap wajib diisi minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  schoolClass: z.string().min(1, "Pilih kelas"),
  role: z.enum(["STUDENT", "TEACHER", "VALIDATOR", "ADMIN"]).default("STUDENT"),
});

export type StudentLoginInput = z.infer<typeof StudentLoginSchema>;

export const ProgressUpdateSchema = z.object({
  userId: z.string().min(1, "User ID wajib ada"),
  subMaterialId: z.string().min(1, "Sub-material ID wajib ada"),
  chapterSlug: z.string().min(1, "Chapter slug wajib ada"),
});

export type ProgressUpdateInput = z.infer<typeof ProgressUpdateSchema>;

export const QuizSubmitSchema = z.object({
  quizId: z.string().min(1, "Quiz ID wajib ada"),
  userId: z.string().min(1, "User ID wajib ada"),
  timeSpentSeconds: z.number().nonnegative(),
  answers: z.record(z.string(), z.enum(["a", "b", "c", "d"])),
});

export type QuizSubmitInput = z.infer<typeof QuizSubmitSchema>;

export const LayerValidationSchema = z.object({
  layerId: z.string().min(1),
  isVerified: z.boolean(),
  validatorNotes: z.string().optional(),
});
