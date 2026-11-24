import { NextResponse } from "next/server";
import { QuizSubmitSchema } from "@/lib/validators/schemas";
import { prisma } from "@/lib/db/prisma";

// Authoritative Master Answer Keys and Pedagogical Explanations for all 6 Geosphere Chapters
// STRICT INVARIANT: Kept exclusively in server-side handler. Never sent across wire before evaluation.
const masterQuizQuestions: Record<
  string,
  {
    id: string;
    order: number;
    cognitive_level: string;
    question_text: string;
    correct_option_key: "a" | "b" | "c" | "d";
    explanation_feedback: string;
  }[]
> = {
  litosfer: [
    {
      id: "lit-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan analisis fenomena geologi pesisir selatan Jawa (subsidence dan gempa dangkal-menengah 15-45 km), proses endogen manakah yang menjadi faktor pemicu utama?",
      correct_option_key: "b",
      explanation_feedback:
        "Wilayah pesisir selatan Jawa berada tepat di atas zona subduksi aktif Lempeng Samudra Indo-Australia yang menunjam ke bawah Lempeng Benua Eurasia. Tegangan geser elastis yang terakumulasi memicu penurunan elevasi pantai (subsidence) dan gempa megathrust.",
    },
    {
      id: "lit-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah (longsor) massal di lereng Gunung Wilis saat hujan lebat?",
      correct_option_key: "b",
      explanation_feedback:
        "Alih fungsi vegetasi hutan berakar dalam menjadi kebun semusim menghilangkan jangkar pengikat tanah. Saat hujan ekstrem, air menembus regolit lepas hingga lapisan batuan kedap air, melipatgandakan tekanan air pori pada bidang gelincir dan memicu longsoran luncuran.",
    },
    {
      id: "lit-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan 9 unsur interpretasi citra penginderaan jauh (rona hijau gelap dengan tekstur kasar bertingkat vs rona cerah bertekstur halus berpola terputus), kesimpulan analitis manakah yang paling tepat?",
      correct_option_key: "b",
      explanation_feedback:
        "Rona gelap pada inframerah pantulan berpadu dengan tekstur kasar mencirikan kanopi pepohonan tinggi hutan lebat (kawasan konservasi). Sebaliknya, rona cerah dengan tekstur halus adalah karakteristik lahan terbuka, kebun terbuka, atau pemukiman warga.",
    },
    {
      id: "lit-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Dari perspektif geologi teknik, mengapa endapan aluvium lunak memperbesar risiko kerusakan bangunan saat terjadi getaran gempa bumi?",
      correct_option_key: "b",
      explanation_feedback:
        "Lapisan aluvium lepas menyebabkan resonansi dan amplifikasi gelombang geser (S-wave). Jika lapisan pasir jenuh air tergoncang kuat, tekanan air pori meniadakan kontak antar butir pasir dan memicu fenomena likuefaksi (tanah kehilangan daya dukung).",
    },
    {
      id: "lit-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Strategi mitigasi struktural dan non-struktural paling efektif untuk melindungi permukiman di dataran limpasan banjir lahar dingin Caruban & Mejayan adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Pembangunan Sabo Dam di alur sungai hulu Wilis menahan debris batuan dan mengontrol kecepatan lahar dingin, sedangkan sensor debit EWS memberikan waktu peringatan evakuasi dini yang memadai bagi warga di bantaran hilir.",
    },
  ],

  pedosfer: [
    {
      id: "ped-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis dampak hilangnya horizon O dan A terhadap kapasitas infiltrasi dan produktivitas pertanian lereng bawah adalah:",
      correct_option_key: "b",
      explanation_feedback:
        "Horizon O dan A merupakan gudang humus dan mikroorganisme tanah penyedia ruang pori makro. Saat keduanya terkikis erosi, air hujan tidak dapat meresap dan membentuk limpasan permukaan berkecepatan tinggi yang memicu erosi parit (gully erosion).",
    },
    {
      id: "ped-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Mengapa kombinasi metode mekanik terasering bangku dan vegetatif rumput vetiver sangat efektif mengendalikan erosi lembar?",
      correct_option_key: "a",
      explanation_feedback:
        "Terasering bangku secara mekanis memperpendek lereng sehingga kecepatan limpasan berkurang, sedangkan sistem perakaran rumput vetiver yang menghujam ke dalam mengikat partikel regolit tanah sehingga tahan terhadap daya hanyut air.",
    },
    {
      id: "ped-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan faktor pembentuk tanah (clorpt), perbedaan dominan apakah yang menyebabkan variasi karakteristik Andosol dan Aluvial di Madiun?",
      correct_option_key: "a",
      explanation_feedback:
        "Andosol di lereng Wilis dibentuk oleh batuan induk abu vulkanik dengan iklim sejuk basah yang kaya mineral amorf (alofan), sedangkan tanah Aluvial di dataran Mejayan berasal dari endapan sedimen limpasan sungai Bengawan Madiun.",
    },
    {
      id: "ped-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Unsur interpretasi citra manakah yang paling menentukan untuk mendelineasi batas zona lahan kritis tersebut?",
      correct_option_key: "b",
      explanation_feedback:
        "Kontras rona cerah (pantulan spektral tanah kering gundul) berpadu tekstur dan asosiasi kelerengan curam adalah kunci interpretasi visual penginderaan jauh untuk pemetaan lahan kritis.",
    },
    {
      id: "ped-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Bagaimanakah mekanisme biologis dan hidrologis lubang biopori dalam memperbaiki struktur agregat tanah setempat?",
      correct_option_key: "a",
      explanation_feedback:
        "Fauna tanah seperti cacing yang memakan sampah organik bergerak menciptakan terowongan pori alami (biopori). Terowongan ini memaksimalkan luas permukaan resapan air dan mempercepat perkolasi air ke cadangan akuifer tanah.",
    },
  ],

  atmosfer: [
    {
      id: "atm-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis implikasi pola sirkulasi Angin Muson Barat terhadap kalender tanam dan neraca air pertanian padi di Kabupaten Madiun adalah:",
      correct_option_key: "b",
      explanation_feedback:
        "Angin Muson Barat melintasi Samudra Hindia yang luas dan membawa uap air jenuh menuju Jawa, menandai awal musim hujan yang optimal untuk penggenangan sawah pada masa Musim Tanam 1 (MT-1).",
    },
    {
      id: "atm-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Mengapa fenomena cuaca seperti pembentukan awan konvektif Cumulonimbus, petir, dan presipitasi hujan hanya terkonsentrasi di lapisan Troposfer?",
      correct_option_key: "a",
      explanation_feedback:
        "Lapisan troposfer menampung lebih dari 99% total uap air atmosfer bumi. Di lapisan ini terjadi gradien penurunan suhu adiabatik vertikal yang memungkinkan arus konveksi udara hangat naik dan berkondensasi menjadi awan.",
    },
    {
      id: "atm-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan analisis sirkulasi Walker, mengapa pemanasan di Pasifik timur menekan intensitas curah hujan di wilayah kepulauan Indonesia?",
      correct_option_key: "a",
      explanation_feedback:
        "Saat El Niño, pusat konveksi udara basah berpindah ke Pasifik timur. Wilayah Indonesia dinaungi cabang sirkulasi Walker yang turun (subsidence), menghasilkan tekanan tinggi lokal yang menghambat pertumbuhan awan hujan.",
    },
    {
      id: "atm-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan data suhu puncak awan (-75°C) dan morfologi citra Himawari, fenomena cuaca ekstrem apakah yang harus diwaspadai di Mejayan?",
      correct_option_key: "b",
      explanation_feedback:
        "Suhu puncak awan di bawah -60°C hingga -75°C menandakan puncak awan menembus lapisan tropopause (overshooting top) yang merupakan ciri utama awan Cumulonimbus matang berpotensi badai petir dan angin kencang.",
    },
    {
      id: "atm-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Fenomena meteorologis apakah yang menyebabkan polutan dan uap air terjebak di dekat permukaan cekungan Madiun?",
      correct_option_key: "a",
      explanation_feedback:
        "Inversi suhu radiasional terjadi ketika tanah kehilangan panas radiatif sangat cepat saat malam tanpa awan. Lapisan udara dingin padat di permukaan terperangkap oleh udara hangat di atasnya, meniadakan sirkulasi vertikal pembersih polutan.",
    },
  ],

  hidrosfer: [
    {
      id: "hid-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Jika terjadi hujan 80 mm di hulu Wilis, dampak kenaikan koefisien limpasan (C) terhadap hidrograf banjir di hilir Caruban & Mejayan adalah:",
      correct_option_key: "b",
      explanation_feedback:
        "Deforestasi hulu mengurangi infiltrasi sehingga sebagian besar air hujan langsung menjadi limpasan permukaan. Kurva hidrograf menjadi sangat curam: waktu mencapai debit puncak semakin cepat (time to peak pendek) dengan debit banjir yang melonjak drastis.",
    },
    {
      id: "hid-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Pada daerah perkotaan Mejayan dengan penutupan aspal dan beton tinggi, komponen siklus hidrologi manakah yang melonjak dan mana yang anjlok?",
      correct_option_key: "a",
      explanation_feedback:
        "Permukaan kedap air (impervious surface) seperti aspal meniadakan pori infiltrasi ke tanah. Akibatnya, limpasan permukaan melonjak drastis sementara pengisian air tanah dangkal dan dalam terhenti.",
    },
    {
      id: "hid-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Strategi konservasi hidrologis terpadu manakah yang paling mendesak diimplementasikan untuk memulihkan cadangan akuifer bebas?",
      correct_option_key: "a",
      explanation_feedback:
        "Pengendalian ekstraksi air tanah harus diimbangi dengan peresapan buatan (sumur resapan komunal dan embung) serta perlindungan zonasi catchment area di hulu agar air hujan terserap kembali ke dalam formasi akuifer.",
    },
    {
      id: "hid-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis hak kedaulatan (sovereign rights) negara Indonesia di wilayah Zona Ekonomi Eksklusif (ZEE) adalah:",
      correct_option_key: "b",
      explanation_feedback:
        "Sesuai UNCLOS 1982, di wilayah ZEE (hingga 200 mil laut), negara pantai memiliki hak berdaulat eksklusif untuk mengeksplorasi dan mengeksploitasi sumber daya alam hayati dan non-hayati di kolom air maupun dasar laut, meskipun kapal asing memiliki hak kebebasan navigasi.",
    },
    {
      id: "hid-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Karakteristik litologi batuan dan struktur geologi bawah permukaan apakah yang diindikasikan oleh berkembangnya pola pengaliran dendritik?",
      correct_option_key: "b",
      explanation_feedback:
        "Pola dendritik (bercabang mirip urat daun atau pohon) adalah ciri khas daerah dengan batuan dasar yang seragam (homogen), resistensi erosi merata, dan tidak dikendalikan oleh struktur patahan atau lipatan regional.",
    },
  ],

  biosfer: [
    {
      id: "bio-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Mengapa fauna di bagian barat Indonesia memiliki kesamaan taksonomi tinggi dengan benua Asia, sedangkan Papua berkarakteristik fauna Australia?",
      correct_option_key: "a",
      explanation_feedback:
        "Pada zaman glasial, penurunan muka air laut global membuka jembatan daratan Paparan Sunda (Sundaland) yang menghubungkan Jawa, Sumatra, Kalimantan ke Asia, sementara Paparan Sahul menghubungkan Papua ke Australia.",
    },
    {
      id: "bio-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis bentuk adaptasi fisiologis pohon jati (meranggas) terhadap faktor klimatik dan ketersediaan lengas tanah adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Pohon jati beradaptasi dengan iklim monsunal bercurah hujan musiman. Pengguguran daun pada musim kemarau menutup stomata daun dari pemanasan ekstrem, sehingga pohon dapat bertahan hidup tanpa kehilangan pasokan air internal.",
    },
    {
      id: "bio-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Dampak jangka panjang fragmentasi habitat terhadap populasi satwa langka endemik seperti Elang Jawa dan Macan Tutul adalah:",
      correct_option_key: "b",
      explanation_feedback:
        "Fragmentasi memotong koridor jelajah reproduksi satwa. Populasi kecil yang terisolasi akan mengalami perkawinan sedarah (inbreeding) yang melemahkan daya tahan genetik spesies serta memicu satwa keluar ke pemukiman warga.",
    },
    {
      id: "bio-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Faktor gradien makroklimat apakah yang paling menentukan perubahan zonasi bioma dari ekuator ke arah kutub?",
      correct_option_key: "a",
      explanation_feedback:
        "Kemiringan sudut datang sinar matahari di lintang tinggi menyebabkan radiasi matahari tersebar di area lebih luas, menurunkan insolasi tahunan dan temperatur rata-rata, yang membatasi jenis vegetasi dari hutan lebat tropis hingga lumut tundra.",
    },
    {
      id: "bio-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan regulasi konservasi, aktivitas manakah yang secara legal diperbolehkan di dalam Zona Inti kawasan Cagar Alam?",
      correct_option_key: "a",
      explanation_feedback:
        "Zona Inti Cagar Alam dilindungi secara mutlak dan steril dari aktivitas ekonomi komersial. Hanya kegiatan observasi ekologi tanpa destruksi, penelitian ilmiah, dan pendidikan konservasi berizin khusus yang diperbolehkan.",
    },
  ],

  antroposfer: [
    {
      id: "ant-q1",
      order: 1,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis potensi ekonomi dan tantangan pembangunan dari struktur demografi piramida peralihan Kabupaten Madiun adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Dominasi kelompok usia 15-64 tahun (>68%) menciptakan peluang dividen demografi di mana tanggungan ekonomi keluarga minimal, namun harus didukung penyerapan tenaga kerja agar tidak berubah menjadi ledakan pengangguran terbuka.",
    },
    {
      id: "ant-q2",
      order: 2,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Berdasarkan Model Gravitasi Keruangan (Reilly), faktor apakah yang melipatgandakan kekuatan interaksi spasial Mejayan-Surabaya pasca-tol?",
      correct_option_key: "a",
      explanation_feedback:
        "Hukum gravitasi menyatakan gaya interaksi berbanding terbalik dengan kuadrat jarak. Pengurangan waktu tempuh (jarak friksi waktu/biaya) secara signifikan memperbesar volume arus mobilitas orang dan distribusi komoditas antar kota.",
    },
    {
      id: "ant-q3",
      order: 3,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Analisis dampak keruangan alih fungsi Lahan Pertanian Pangan Berkelanjutan (LP2B) terhadap ketahanan pangan dan hidrologi adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Sawah irigasi teknis di sepanjang koridor Sudirman berfungsi ganda sebagai lumbung padi dan kolam retensi banjir alami. Pengalihfungsian menjadi ruko menurunkan luas panen padi dan meningkatkan risiko banjir genangan di kawasan perkotaan Caruban.",
    },
    {
      id: "ant-q4",
      order: 4,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Dampak positif dan negatif fenomena migrasi sirkuler terhadap dinamika pedesaan daerah asal adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Uang kiriman (remisi) pekerja migran menyokong renovasi rumah dan modal usaha mikro di desa asal, tetapi desa kehilangan tenaga kerja muda terampil di bidang pertanian yang mengancam regenerasi profesi petani.",
    },
    {
      id: "ant-q5",
      order: 5,
      cognitive_level: "C4 (Menganalisis)",
      question_text:
        "Kelemahan tata ruang dari pola penjalaran perkotaan tipe ribbon development (memanjang jalan arteri) adalah:",
      correct_option_key: "a",
      explanation_feedback:
        "Pola memanjang sepanjang jalan nasional menimbulkan konflik lalu lintas lokal dan regional (hambatan samping tinggi) serta mempermahal biaya instalasi jaringan pipa air bersih dan listrik ke kawasan pedalaman.",
    },
  ],
};

export async function POST(
  request: Request,
  { params }: { params: { chapterSlug: string } }
) {
  try {
    const chapterSlug = params.chapterSlug.toLowerCase();
    const body = await request.json();
    const parseResult = QuizSubmitSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Format payload jawaban tidak valid", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { quizId, userId, answers, timeSpentSeconds } = parseResult.data;

    // Get authoritative question bank for this chapter
    const questions = masterQuizQuestions[chapterSlug] || masterQuizQuestions.litosfer;
    const totalQuestions = questions.length;
    let correctCount = 0;

    const diagnostics = questions.map((q) => {
      const userAnswerKey = answers[q.id] || "";
      const isCorrect = userAnswerKey.toLowerCase() === q.correct_option_key.toLowerCase();
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        order: q.order,
        cognitive_level: q.cognitive_level,
        question_text: q.question_text,
        userAnswer: userAnswerKey,
        correctAnswer: q.correct_option_key,
        isCorrect,
        explanation: q.explanation_feedback,
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 75;

    // Persist attempt into Prisma DB if connected
    try {
      const chapter = await prisma.chapter.findUnique({
        where: { slug: chapterSlug },
        include: { quiz: true },
      });

      if (chapter && chapter.quiz) {
        const dbQuizId = chapter.quiz.id;
        await prisma.quizAttempt.create({
          data: {
            quizId: dbQuizId,
            userId,
            score,
            answersJson: answers,
            diagnosticsJson: diagnostics,
            timeSpentSeconds,
            isPassed: passed,
            submittedAt: new Date(),
          },
        });
      }
    } catch (dbError) {
      // Prisma offline: log and proceed with JSON response
      console.warn("Prisma offline: proceeding with calculated result response");
    }

    return NextResponse.json({
      success: true,
      quizId,
      chapterSlug,
      userId,
      score,
      totalQuestions,
      correctCount,
      passed,
      timeSpentSeconds,
      submittedAt: new Date().toISOString(),
      diagnostics,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
