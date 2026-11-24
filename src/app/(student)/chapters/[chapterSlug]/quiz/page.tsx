import React from "react";
import { C4QuizPlayer } from "@/components/quiz/C4QuizPlayer";
import { QuestionDTO } from "@/types";

interface QuizPageProps {
  params: {
    chapterSlug: string;
  };
}

// Fallback client questions for immediate reliable rendering
const fallbackQuizQuestions: QuestionDTO[] = [
  {
    id: "q-1",
    order: 1,
    cognitive_level: "C4",
    stimulus_type: "CASE_STUDY",
    stimulus_url: "/assets/images/stimulus/stimulus_pesisir_selatan.png",
    stimulus_text:
      "Di wilayah pesisir selatan Jawa terjadi peningkatan aktivitas seismik secara periodik dan tercatat mundurnya garis pantai rata-rata 0.8 meter per tahun akibat penurunan elevasi daratan lokal (subsidence). Data kegempaan BMKG menunjukkan kedalaman hiposentrum berkisar antara 15-45 km di zona laut lepas.",
    question_text:
      "Berdasarkan analisis fenomena geologi tersebut, proses endogen manakah yang paling mungkin menjadi penyebab utama penurunan muka tanah dan peningkatan seismisitas di wilayah tersebut?",
    options: [
      { key: "a", text: "Pengangkatan lempeng (orogenesis) akibat tumbukan benua" },
      { key: "b", text: "Subduksi lempeng Samudra Indo-Australia yang menunjam ke bawah lempeng Benua Eurasia" },
      { key: "c", text: "Vulkanisme akibat erupsi intrusi magma dangkal dasar samudra" },
      { key: "d", text: "Pelapukan kimiawi batuan gamping dan erosi gelombang air laut (abrasi)" },
    ],
  },
  {
    id: "q-2",
    order: 2,
    cognitive_level: "C4",
    stimulus_type: "THEMATIC_MAP",
    stimulus_url: "/assets/images/stimulus/stimulus_patahan_wilis.png",
    stimulus_text:
      "Perhatikan peta tematik kemiringan lereng dan jalur patahan sesar aktif di sekitar lereng Gunung Wilis Kabupaten Madiun. Wilayah bagian timur Mejayan didominasi batuan vulkanik muda bertekstur lepas dengan kelerengan >35% yang mengalami alih fungsi dari hutan lindung menjadi kebun semusim.",
    question_text:
      "Jika terjadi curah hujan intensitas tinggi (>100 mm/hari) selama 3 hari berturut-turut, kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah (longsor) massal di kawasan tersebut?",
    options: [
      { key: "a", text: "Lapisan batuan induk kompak yang mengalami peningkatan gaya kohesi" },
      { key: "b", text: "Tekanan pori air tanah meningkat pada bidang gelincir batuan akibat hilangnya akar pengikat vegetasi dalam" },
      { key: "c", text: "Pengurangan sudut gesek dalam tanah oleh vegetasi kebun semusim" },
      { key: "d", text: "Peningkatan daya infiltrasi tanah yang mempercepat pembentukan horizon O" },
    ],
  },
  {
    id: "q-3",
    order: 3,
    cognitive_level: "C4",
    stimulus_type: "SATELLITE_CROP",
    stimulus_url: "/assets/images/stimulus/stimulus_satelit_tekstur.png",
    stimulus_text:
      "Kajian citra satelit resolusi tinggi di koridor lembah sesar menunjukkan perbedaan rona dan tekstur: di sisi barat tampak pola vegetasi rapat berwarna hijau gelap dengan tekstur kasar bertingkat, sedangkan di sisi timur tampak rona cerah bertekstur halus berpola terputus-putus.",
    question_text:
      "Berdasarkan 9 unsur interpretasi citra penginderaan jauh, kesimpulan analitis manakah yang paling tepat mengenai kondisi lahan di kedua sisi lembah sesar tersebut?",
    options: [
      { key: "a", text: "Sisi barat merupakan lahan kritis yang belum terehabilitasi sedangkan sisi timur hutan primer" },
      { key: "b", text: "Sisi barat merupakan kawasan konservasi dengan tutupan pohon bertajuk lebat sedangkan sisi timur adalah lahan terbuka/pemukiman" },
      { key: "c", text: "Sisi barat mencerminkan perairan tergenang sedangkan sisi timur batuan kapur" },
      { key: "d", text: "Kedua sisi memiliki tingkat erosi yang identik karena berada pada formasi geologi sama" },
    ],
  },
  {
    id: "q-4",
    order: 4,
    cognitive_level: "C4",
    stimulus_type: "CASE_STUDY",
    stimulus_url: "/assets/images/stimulus/stimulus_mitigasi_gempa.png",
    stimulus_text:
      "Sebuah gedung sekolah berlantai dua di Kabupaten Madiun terletak 15 km dari jalur sesar aktif. Berdasarkan inspeksi struktur, bangunan didirikan di atas tanah endapan aluvium lunak Bengawan Madiun tanpa perkuatan kolom struktur tahan gempa.",
    question_text:
      "Dari perspektif rekayasa mitigasi geologis, mengapa tanah lunak aluvium memperbesar risiko kerusakan bangunan saat terjadi getaran gempa bumi (seisme)?",
    options: [
      { key: "a", text: "Tanah aluvium meredam energi gelombang gempa primer (P-wave)" },
      { key: "b", text: "Terjadi efek amplifikasi gelombang seismik permukaan (S-wave) dan potensi likuefaksi pada lapisan jenuh air" },
      { key: "c", text: "Tanah aluvium memiliki frekuensi resonansi alami yang selalu lebih tinggi dari getaran bangunan" },
      { key: "d", text: "Tanah aluvium mengubah gelombang transversal menjadi gelombang elektromagnetik" },
    ],
  },
  {
    id: "q-5",
    order: 5,
    cognitive_level: "C4",
    stimulus_type: "THEMATIC_MAP",
    stimulus_url: "/assets/images/stimulus/stimulus_zonasi_vulkanik.png",
    stimulus_text:
      "Kawasan Rawan Bencana (KRB) vulkanik dibagi menjadi KRB I, KRB II, dan KRB III. Kota Caruban dan Mejayan berada di radius aliran lahar hujan lembah sungai yang berhulu di gunung api aktif.",
    question_text:
      "Strategi mitigasi struktural dan non-struktural paling efektif untuk melindungi permukiman di dataran limpasan banjir lahar dingin adalah:",
    options: [
      { key: "a", text: "Membangun tanggul penahan lahar (Sabo Dam) di alur sungai hulu dan memasang sistem peringatan dini berbasis sensor debit & curah hujan" },
      { key: "b", text: "Mengeringkan seluruh danau kawah dan menimbun alur sungai dengan pasir" },
      { key: "c", text: "Memindahkan seluruh penduduk Kabupaten Madiun ke luar pulau Jawa" },
      { key: "d", text: "Membiarkan endapan lahar menumpuk secara alami untuk menyuburkan lahan pertanian seketika" },
    ],
  },
];

export default function StudentQuizPage({ params }: QuizPageProps) {
  const chapterSlug = params.chapterSlug || "litosfer";

  return <C4QuizPlayer chapterSlug={chapterSlug} initialQuestions={fallbackQuizQuestions} />;
}
