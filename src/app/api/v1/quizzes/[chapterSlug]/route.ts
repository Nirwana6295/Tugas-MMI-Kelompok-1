import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// Client-safe Question Bank for all 6 Geosphere Chapters
// STRICT INVARIANT: Zero-Answer-Key Leakage. NEVER include correct_option_key or explanation_feedback.
const clientQuestionBank: Record<
  string,
  {
    id: string;
    order: number;
    cognitive_level: string;
    stimulus_type: "CASE_STUDY" | "THEMATIC_MAP" | "SATELLITE_CROP" | "DIAGRAM";
    stimulus_url: string;
    stimulus_text: string;
    question_text: string;
    options: { key: "a" | "b" | "c" | "d"; text: string }[];
  }[]
> = {
  litosfer: [
    {
      id: "lit-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_pesisir_selatan.png",
      stimulus_text:
        "Di wilayah pesisir selatan Jawa Timur tercatat peningkatan aktivitas seismik secara periodik dan kemunduran garis pantai rata-rata 0.8 meter per tahun akibat penurunan elevasi daratan lokal (subsidence). Data seismometer BMKG mencatat hiposentrum dangkal-menengah pada kedalaman 15-45 km.",
      question_text:
        "Berdasarkan analisis fenomena geologi tersebut, proses endogen manakah yang menjadi faktor pemicu utama subsidensi dan gempa di zona selatan Jawa?",
      options: [
        { key: "a", text: "Pengangkatan lempeng (orogenesis) akibat tumbukan antar-benua" },
        { key: "b", text: "Subduksi lempeng Samudra Indo-Australia yang menunjam ke bawah lempeng Benua Eurasia" },
        { key: "c", text: "Vulkanisme akibat intrusi magma dangkal pada palung samudra" },
        { key: "d", text: "Pelapukan kimiawi batuan gamping dan abrasi gelombang laut" },
      ],
    },
    {
      id: "lit-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_patahan_wilis.png",
      stimulus_text:
        "Perhatikan peta tematik kelerengan lereng dan sesar aktif lereng Gunung Wilis. Wilayah bagian timur Mejayan didominasi batuan vulkanik muda bertekstur lepas dengan kelerengan >35% yang mengalami alih fungsi dari hutan lindung menjadi kebun semusim.",
      question_text:
        "Jika terjadi curah hujan intensitas tinggi (>100 mm/hari) berturut-turut, kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah (longsor) massal?",
      options: [
        { key: "a", text: "Lapisan batuan kompak yang mengalami peningkatan gaya kohesi" },
        { key: "b", text: "Tekanan air pori meningkat drastis pada bidang gelincir batuan akibat hilangnya akar pengikat vegetasi dalam" },
        { key: "c", text: "Pengurangan sudut gesek dalam tanah oleh vegetasi kebun semusim" },
        { key: "d", text: "Peningkatan daya infiltrasi tanah yang mempercepat pembentukan horizon O" },
      ],
    },
    {
      id: "lit-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_satelit_tekstur.png",
      stimulus_text:
        "Citra satelit resolusi tinggi di koridor lembah sesar menunjukkan perbedaan: di sisi barat tampak rona hijau gelap bertekstur kasar bertingkat, sedangkan di sisi timur tampak rona cerah bertekstur halus berpola terputus-putus.",
      question_text:
        "Berdasarkan 9 unsur interpretasi citra penginderaan jauh, kesimpulan analitis manakah yang paling tepat mengenai kondisi tutupan lahan di kedua sisi lembah sesar?",
      options: [
        { key: "a", text: "Sisi barat merupakan lahan kritis sedangkan sisi timur hutan primer" },
        { key: "b", text: "Sisi barat mencerminkan tutupan pohon lebat kanopi rapat sedangkan sisi timur lahan terbuka/permukiman" },
        { key: "c", text: "Sisi barat adalah perairan tergenang sedangkan sisi timur batuan kapur karst" },
        { key: "d", text: "Kedua sisi memiliki laju erosi identik karena terletak pada formasi geologi sama" },
      ],
    },
    {
      id: "lit-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_mitigasi_gempa.png",
      stimulus_text:
        "Sebuah gedung sekolah berlantai dua di Kabupaten Madiun terletak 15 km dari jalur sesar aktif dan didirikan di atas tanah endapan aluvium lunak Bengawan Madiun tanpa perkuatan kolom struktur tahan gempa.",
      question_text:
        "Dari perspektif geologi teknik, mengapa endapan aluvium lunak memperbesar risiko kerusakan bangunan saat terjadi getaran gempa bumi?",
      options: [
        { key: "a", text: "Aluvium menyerap habis seluruh energi gelombang primer (P-wave)" },
        { key: "b", text: "Terjadi efek amplifikasi gelombang seismik permukaan (S-wave) dan potensi likuefaksi pada lapisan pasir jenuh air" },
        { key: "c", text: "Aluvium memiliki frekuensi resonansi alami yang selalu lebih tinggi dibanding struktur gedung" },
        { key: "d", text: "Aluvium mengubah getaran transversal mekanik menjadi gelombang elektromagnetik" },
      ],
    },
    {
      id: "lit-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_zonasi_vulkanik.png",
      stimulus_text:
        "Kawasan Rawan Bencana (KRB) vulkanik mencakup lembah sungai yang berhulu di gunung api aktif. Dataran limpasan Mejayan dan Caruban berada di hilir alur aliran debris piroklastik saat musim penghujan.",
      question_text:
        "Strategi mitigasi struktural dan non-struktural paling efektif untuk melindungi permukiman di dataran banjir lahar dingin adalah:",
      options: [
        { key: "a", text: "Membangun bendung penahan debris (Sabo Dam) di hulu dan mengintegrasikan sistem sensor debit EWS di bantaran sungai" },
        { key: "b", text: "Menguras seluruh material kawah gunung api dengan ekskavator berat" },
        { key: "c", text: "Memindahkan seluruh pusat pemerintahan dan penduduk ke pulau lain" },
        { key: "d", text: "Membiarkan endapan lahar menumpuk secara alami untuk kesuburan instan" },
      ],
    },
  ],

  pedosfer: [
    {
      id: "ped-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "DIAGRAM",
      stimulus_url: "/assets/images/stimulus/stimulus_horizon_tanah.png",
      stimulus_text:
        "Profil tanah di lereng atas Gunung Wilis memperlihatkan lapisan horizon O tebal (15 cm), horizon A berwarna hitam kaya humus, horizon B lempung kemerahan, dan horizon C berupa lapukan batuan andesit. Di lereng bawah yang telah dibuka menjadi perkebunan intensif, horizon O dan A telah hilang tersapu air.",
      question_text:
        "Analisis dampak hilangnya horizon O dan A terhadap kapasitas infiltrasi dan produktivitas pertanian lereng bawah adalah:",
      options: [
        { key: "a", text: "Kapasitas infiltrasi meningkat karena pori makro batuan induk terbuka langsung" },
        { key: "b", text: "Kapasitas retensi air dan bahan organik anjlok drastis sehingga limpasan permukaan melipatgandakan laju erosi parit" },
        { key: "c", text: "Kadar keasaman tanah menjadi netral secara alami karena terpapar sinar matahari langsung" },
        { key: "d", text: "Struktur remah tanah berkembang lebih cepat menjadi struktur gumpal membulat" },
      ],
    },
    {
      id: "ped-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_konservasi_terasering.png",
      stimulus_text:
        "Petani di lereng curam Mejayan menerapkan teknik terasering bangku (bench terrace) dipadukan dengan penanaman rumput vetiver pada bibir teras dan saluran pembuangan air (SPA) berundak.",
      question_text:
        "Mengapa kombinasi metode mekanik terasering bangku dan vegetatif rumput vetiver sangat efektif mengendalikan erosi lembar (sheet erosion)?",
      options: [
        { key: "a", text: "Terasering memotong panjang lereng dan mereduksi kecepatan aliran permukaan, sementara akar vetiver mengikat agregat tanah hingga kedalaman 3 meter" },
        { key: "b", text: "Terasering menaikkan suhu lapisan tanah atas untuk membunuh mikroorganisme dekomposer" },
        { key: "c", text: "Rumput vetiver menyerap 100% air hujan sebelum menyentuh permukaan tanah" },
        { key: "d", text: "Terasering bangku mengubah tekstur tanah pasir menjadi tanah liat secara mekanis" },
      ],
    },
    {
      id: "ped-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_tanah_madiun.png",
      stimulus_text:
        "Peta jenis tanah Kabupaten Madiun memperlihatkan sebaran tanah Andosol di kawasan lereng Gunung Wilis dan tanah Aluvial/Grumusol di dataran rendah lembah Bengawan Madiun sekitar Mejayan.",
      question_text:
        "Berdasarkan faktor pembentuk tanah (clorpt), perbedaan dominan apakah yang menyebabkan variasi karakteristik kedua jenis tanah tersebut?",
      options: [
        { key: "a", text: "Andosol dipengaruhi batuan induk vulkanik dan iklim sejuk basah, sedangkan Aluvial dipengaruhi material endapan fluvial dan drainase buruk" },
        { key: "b", text: "Andosol terbentuk oleh pengaruh angin muson timur sedangkan Aluvial oleh angin fohn" },
        { key: "c", text: "Andosol tidak mengandung mineral liat sedangkan Aluvial murni tersusun atas kuarsa" },
        { key: "d", text: "Keduanya hanya dibedakan oleh intervensi pemupukan manusia tanpa pengaruh topografi" },
      ],
    },
    {
      id: "ped-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_citra_erosi.png",
      stimulus_text:
        "Pada citra satelit multispektral inframerah, area lahan terdegradasi akibat erosi lembar menunjukkan rona keputihan cerah dengan nilai pantulan spektral tanah kering yang tinggi (NDVI < 0.1), berbeda dengan area sawah berteras yang bernilai NDVI > 0.65.",
      question_text:
        "Unsur interpretasi citra manakah yang paling menentukan untuk mendelineasi batas zona lahan kritis tersebut?",
      options: [
        { key: "a", text: "Bayangan dan arah penyinaran matahari pagi" },
        { key: "b", text: "Rona kontras (cerah vs gelap), tekstur (kasar teratur vs halus), dan asosiasi dengan kontur kelerengan curam" },
        { key: "c", text: "Bentuk memanjang seperti jalan kereta api dan ukuran piksel citra" },
        { key: "d", text: "Asosiasi dengan jaringan kabel listrik tegangan tinggi" },
      ],
    },
    {
      id: "ped-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_biopori.png",
      stimulus_text:
        "Di lingkungan sekolah SMAN 1 Mejayan dilakukan pembuatan 50 lubang resapan biopori dengan pengisian sampah organik daun peneduh untuk mengatasi genangan air halaman saat hujan deras.",
      question_text:
        "Bagaimanakah mekanisme biologis dan hidrologis lubang biopori dalam memperbaiki struktur agregat tanah setempat?",
      options: [
        { key: "a", text: "Aktivitas fauna tanah (cacing) mendekomposisi bahan organik dan membentuk liang pori makro yang mempercepat laju perkolasi air ke akuifer" },
        { key: "b", text: "Biopori menguapkan air tanah ke atmosfer melalui proses kondensasi buatan" },
        { key: "c", text: "Sampah organik memadatkan pori mikro tanah agar air tidak merembes ke bawah" },
        { key: "d", text: "Biopori memicu pembentukan lempeng tektonik mikro yang menaikkan elevasi halaman sekolah" },
      ],
    },
  ],

  atmosfer: [
    {
      id: "atm-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_angin_muson.png",
      stimulus_text:
        "Pada bulan Oktober - April, kedudukan semu matahari berada di Belahan Bumi Selatan, menyebabkan tekanan udara di Benua Australia lebih rendah daripada Benua Asia. Terjadi aliran massa udara Angin Muson Barat melintasi Samudra Hindia menuju Indonesia.",
      question_text:
        "Analisis implikasi pola sirkulasi Angin Muson Barat terhadap kalender tanam dan neraca air pertanian padi di Kabupaten Madiun adalah:",
      options: [
        { key: "a", text: "Memicu musim kemarau ekstrem sehingga petani beralih ke tanaman palawija tahan kering" },
        { key: "b", text: "Membawa uap air jenuh yang memicu puncak musim penghujan, menjadi dasar penetapan Musim Tanam 1 (MT-1) padi sawah" },
        { key: "c", text: "Menurunkan kelembapan udara relatif di bawah 30% sehingga terjadi fenomena embun upas" },
        { key: "d", text: "Meningkatkan kecepatan evaporasi permukaan waduk hingga debit sungai menyusut drastis" },
      ],
    },
    {
      id: "atm-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "DIAGRAM",
      stimulus_url: "/assets/images/stimulus/stimulus_lapisan_atmosfer.png",
      stimulus_text:
        "Grafik gradien vertikal temperatur menunjukkan penurunan suhu rata-rata 0.6°C setiap kenaikan 100 meter di lapisan Troposfer (lapisan cuaca). Pada lapisan Stratosfer suhu berbalik naik karena adanya lapisan Ozon (O3).",
      question_text:
        "Mengapa fenomena cuaca seperti pembentukan awan konvektif Cumulonimbus, petir, dan presipitasi hujan hanya terkonsentrasi di lapisan Troposfer?",
      options: [
        { key: "a", text: "Hampir seluruh uap air dan dinamika konveksi turbulensi massa udara terkungkung di bawah bidang batas tropopause" },
        { key: "b", text: "Lapisan stratosfer memiliki gaya gravitasi nol sehingga gas tidak dapat berkondensasi" },
        { key: "c", text: "Gelombang radio di ionosfer memecah molekul awan sebelum terbentuk presipitasi" },
        { key: "d", text: "Tekanan udara di troposfer lebih tinggi daripada permukaan air laut" },
      ],
    },
    {
      id: "atm-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_el_nino.png",
      stimulus_text:
        "Saat terjadi anomali suhu muka laut di Samudra Pasifik bagian tengah dan timur (fenomena El Niño moderat-kuat), indeks SOI bernilai negatif. Wilayah Jawa Timur bagian barat termasuk Madiun mengalami kemunduran awal musim hujan hingga 4 dasarian.",
      question_text:
        "Berdasarkan analisis sirkulasi Walker, mengapa pemanasan di Pasifik timur menekan intensitas curah hujan di wilayah kepulauan Indonesia?",
      options: [
        { key: "a", text: "Sel konveksi Walker bergeser ke arah Pasifik timur sehingga cabang sel yang turun (subsidence) berada di atas Indonesia dan menekan pembentukan awan" },
        { key: "b", text: "Angin pasat tenggara bertiup lebih kencang mendorong seluruh uap air Indonesia ke Kutub Selatan" },
        { key: "c", text: "Lapisan ozon di atas Madiun menipis dan memanaskan awan hujan hingga menguap sempurna" },
        { key: "d", text: "Suhu air laut Indonesia naik di atas 35°C sehingga kondensasi terhambat" },
      ],
    },
    {
      id: "atm-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_citra_himawari.png",
      stimulus_text:
        "Pada citra satelit cuaca inframerah kanal IR1 (Himawari-9), terdeteksi sel awan dengan suhu puncak awan mencapai -75°C berbentuk gumpalan bulat masif di atas kawasan lereng barat Gunung Wilis menjelang sore hari.",
      question_text:
        "Berdasarkan data suhu puncak awan dan morfologi citra tersebut, fenomena cuaca ekstrem apakah yang harus diwaspadai di wilayah Mejayan dalam 1-2 jam ke depan?",
      options: [
        { key: "a", text: "Kabut radiasi tipis yang menghilang saat matahari terbenam" },
        { key: "b", text: "Awan Cumulonimbus matang dengan potensi hujan lebat lokal disertai petir dan angin kencang (microburst)" },
        { key: "c", text: "Hujan gerimis merata selama sepekan tanpa angin" },
        { key: "d", text: "Penurunan kelembapan drastis akibat hembusan angin fohn panas" },
      ],
    },
    {
      id: "atm-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_inversi_suhu.png",
      stimulus_text:
        "Pada pagi hari di musim kemarau, kawasan cekungan lembah Madiun sering kali diselimuti kabut asap tebal yang tertahan di dekat permukaan tanah dan baru buyar setelah pukul 09.00 WIB ketika matahari memanaskan bumi.",
      question_text:
        "Fenomena meteorologis apakah yang menyebabkan polutan dan uap air terjebak di dekat permukaan pada kondisi tersebut?",
      options: [
        { key: "a", text: "Inversi suhu radiasional, di mana permukaan tanah mendingin cepat pada malam hari sehingga udara dingin terperangkap di bawah lapisan udara hangat" },
        { key: "b", text: "Hembusan siklon tropis yang menekan udara ke pusat depresi" },
        { key: "c", text: "Efek rumah kaca yang menghalangi perambatan cahaya inframerah dari matahari" },
        { key: "d", text: "Tumbukan massa udara kutub dengan massa udara ekuatorial di garis khatulistiwa" },
      ],
    },
  ],

  hidrosfer: [
    {
      id: "hid-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_das_madiun.png",
      stimulus_text:
        "Peta batas hidrologis Wilayah Sungai (WS) Bengawan Solo memperlihatkan Sub-DAS Bengawan Madiun mencakup hulu di lereng Gunung Wilis dan Lawu, lalu menyempit di Kota Madiun sebelum bermuara di Ngawi. Alih fungsi lahan di hulu mencapai 42% dalam 10 tahun terakhir.",
      question_text:
        "Jika terjadi hujan dengan curah 80 mm di kawasan hulu, dampak perubahan koefisien limpasan (C) terhadap hidrograf banjir di hilir Caruban & Mejayan adalah:",
      options: [
        { key: "a", text: "Waktu konsentrasi air memanjang dan debit puncak (peak discharge) turun signifikan" },
        { key: "b", text: "Waktu mencapai debit puncak (time to peak) semakin singkat dan volume puncak banjir melonjak tajam" },
        { key: "c", text: "Debit aliran dasar (base flow) sungai meningkat stabil sepanjang tahun" },
        { key: "d", text: "Koefisien limpasan mendekati nol karena air terserap sempurna ke batuan beku" },
      ],
    },
    {
      id: "hid-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "DIAGRAM",
      stimulus_url: "/assets/images/stimulus/stimulus_siklus_hidrologi.png",
      stimulus_text:
        "Diagram neraca air memperlihatkan perbandingan antara presipitasi (P), evapotranspirasi (ET), infiltrasi (I), perkolasi ke akuifer dalam, dan limpasan permukaan (surface runoff).",
      question_text:
        "Pada daerah perkotaan Mejayan dengan penutupan aspal dan beton tinggi, komponen siklus hidrologi manakah yang mengalami lonjakan ekstrem dan komponen mana yang anjlok drastis?",
      options: [
        { key: "a", text: "Limpasan permukaan melonjak tajam, sementara infiltrasi dan pengisian air tanah (groundwater recharge) anjlok drastis" },
        { key: "b", text: "Evapotranspirasi melonjak tajam, sementara presipitasi menjadi nol" },
        { key: "c", text: "Perkolasi ke akuifer dalam melonjak, sementara limpasan permukaan menurun" },
        { key: "d", text: "Seluruh komponen siklus air berhenti total secara permanen" },
      ],
    },
    {
      id: "hid-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_intrusi_air.png",
      stimulus_text:
        "Pengambilan air tanah melalui sumur bor industri dan pemukiman tanpa kendali di dataran aluvium dapat memicu penurunan muka air tanah (piezometric head) dan amblesan tanah (land subsidence).",
      question_text:
        "Strategi konservasi hidrologis terpadu manakah yang paling mendesak diimplementasikan untuk memulihkan cadangan akuifer bebas (unconfined aquifer)?",
      options: [
        { key: "a", text: "Pembangunan sumur resapan komunal, embung retensi, dan penetapan zona perlindungan resapan air di kaki lereng perbukitan" },
        { key: "b", text: "Memperdalam seluruh sumur bor warga hingga menembus batuan metamorfik dasar" },
        { key: "c", text: "Menutup seluruh aliran sungai alami dan menggantinya dengan pipa besi tertutup" },
        { key: "d", text: "Menyuntikkan limbah cair domestik ke dalam sumur pantau" },
      ],
    },
    {
      id: "hid-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_zonasi_maritim.png",
      stimulus_text:
        "Berdasarkan UNCLOS 1982 dan Deklarasi Djuanda 1957, wilayah perairan laut Indonesia dibagi menjadi Laut Teritorial (12 mil laut), Zona Tambahan (24 mil laut), Zona Ekonomi Eksklusif (200 mil laut), dan Landas Kontinen.",
      question_text:
        "Analisis hak kedaulatan (sovereign rights) negara Indonesia di wilayah Zona Ekonomi Eksklusif (ZEE) adalah:",
      options: [
        { key: "a", text: "Memiliki hak penuh menolak hak lintas damai kapal dagang internasional tanpa izin" },
        { key: "b", text: "Memiliki hak berdaulat untuk eksplorasi, eksploitasi, konservasi, dan pengelolaan sumber daya alam hayati (ikan) dan non-hayati di kolom air dan dasar laut" },
        { key: "c", text: "Menyerahkan pengawasan seluruh sumber daya perikanan kepada otoritas maritim PBB" },
        { key: "d", text: "Hanya berwenang atas pengawasan karantina bea cukai tanpa hak atas perikanan" },
      ],
    },
    {
      id: "hid-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_pola_aliran.png",
      stimulus_text:
        "Citra radar Sentinel-1 mendeteksi geometri jaringan alur sungai di perbukitan timur Madiun. Terlihat anak-anak sungai bergabung ke sungai utama dengan sudut lancip menyerupai percabangan ranting pohon (pola dendritik).",
      question_text:
        "Karakteristik litologi batuan dan struktur geologi bawah permukaan apakah yang diindikasikan oleh berkembangnya pola pengaliran dendritik tersebut?",
      options: [
        { key: "a", text: "Struktur patahan sesar geser sejajar dengan resistensi batuan sangat keras" },
        { key: "b", text: "Litologi batuan induk yang relatif seragam (homogen) dengan kelerengan landai dan tanpa pengaruh struktur geologi dominan" },
        { key: "c", text: "Kubah antiklin terangkat yang memancarkan aliran ke segala arah (radial sentrifugal)" },
        { key: "d", text: "Cekungan depresi tertutup berbatuan gamping karst dengan drainase bawah tanah (radial sentripetal)" },
      ],
    },
  ],

  biosfer: [
    {
      id: "bio-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_garis_wallace.png",
      stimulus_text:
        "Peta persebaran fauna Indonesia memperlihatkan Garis Wallace memisahkan tipe Asiatis (Orientale) dengan Peralihan (Wallacea), serta Garis Weber memisahkan tipe Peralihan dengan tipe Australis.",
      question_text:
        "Mengapa fauna di bagian barat Indonesia (Sumatra, Jawa, Kalimantan) memiliki kesamaan taksonomi tinggi dengan benua Asia, sedangkan Papua berkarakteristik fauna Australia?",
      options: [
        { key: "a", text: "Pada zaman glasial pleistosen, wilayah barat menyatu dengan Paparan Sunda ke benua Asia, sedangkan Papua menyatu dengan Paparan Sahul ke Australia" },
        { key: "b", text: "Hewan mamalia besar berpindah secara aktif menyeberangi palung laut dalam Selat Makassar" },
        { key: "c", text: "Iklim di Kalimantan identik dengan gurun Australia sedangkan Papua beriklim subtropis" },
        { key: "d", text: "Terjadi campur tangan manusia purba yang mendistribusikan satwa endemik secara merata" },
      ],
    },
    {
      id: "bio-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_hutan_jati.png",
      stimulus_text:
        "Kawasan hutan Kabupaten Madiun terkenal sebagai sentra tegakan pohon Jati (Tectona grandis). Pada musim kemarau panjang, pohon jati meranggas (menggugurkan daunnya) secara serentak.",
      question_text:
        "Analisis bentuk adaptasi fisiologis pohon jati tersebut terhadap faktor klimatik dan ketersediaan lengas tanah adalah:",
      options: [
        { key: "a", text: "Menggugurkan daun untuk meminimalkan laju transpirasi air melalui stomata saat defisit air tanah kritis" },
        { key: "b", text: "Mempercepat proses fotosintesis pada batang kayu untuk mematangkan biji" },
        { key: "c", text: "Memicu kematian sel parenkim agar pohon dapat digantikan oleh anakan baru" },
        { key: "d", text: "Menyerap panas matahari berlebih untuk menaikkan keasaman getah kayu" },
      ],
    },
    {
      id: "bio-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_fragmentasi_habitat.png",
      stimulus_text:
        "Analisis citra multitemporal tutupan hutan lereng Wilis menunjukkan terputusnya koridor hutan primer menjadi pulau-pulau habitat kecil (fragmentasi habitat) akibat pembangunan akses jalan dan kebun sayur semusim.",
      question_text:
        "Dampak jangka panjang fragmentasi habitat terhadap populasi satwa langka endemik seperti Elang Jawa dan Macan Tutul adalah:",
      options: [
        { key: "a", text: "Peningkatan keanekaragaman genetik karena populasi terisolasi berkembang secara independen" },
        { key: "b", text: "Penyempitan daya jelajah (home range), penurunan keragaman genetik (inbreeding depression), dan peningkatan konflik satwa-manusia" },
        { key: "c", text: "Populasi satwa bertambah pesat karena ketersediaan mangsa ternak pemukiman melimpah" },
        { key: "d", text: "Satwa langka bermutasi menjadi spesies herbivora penghuni kebun semusim" },
      ],
    },
    {
      id: "bio-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_bioma_dunia.png",
      stimulus_text:
        "Berdasarkan klasifikasi Bioma Dunia, sebaran vegetasi dari wilayah ekuator hingga kutub meliputi: Hutan Hujan Tropis, Savana, Gurun, Padang Rumput (Stepa), Hutan Gugur (Deciduous), Taiga, dan Tundra.",
      question_text:
        "Faktor gradien makroklimat apakah yang paling menentukan perubahan zonasi bioma tersebut dari ekuator ke arah kutub?",
      options: [
        { key: "a", text: "Penurunan intensitas radiasi insolasi matahari tahunan dan penurunan temperatur rata-rata udara" },
        { key: "b", text: "Kadar oksigen yang semakin tipis di kawasan ekuator dibanding kutub" },
        { key: "c", text: "Perbedaan gaya Coriolis yang membelokkan arah perakaran tumbuhan" },
        { key: "d", text: "Ketebalan lapisan kerak bumi di samudra dibanding benua" },
      ],
    },
    {
      id: "bio-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_cagar_alam.png",
      stimulus_text:
        "Kawasan Suaka Margasatwa dan Cagar Alam ditetapkan dengan zonasi inti, zonasi pemanfaatan terbatas, dan zonasi penyangga untuk menjaga kelestarian plasma nutfah hayati nusantara.",
      question_text:
        "Berdasarkan regulasi konservasi, aktivitas manakah yang secara legal diperbolehkan di dalam Zona Inti kawasan Cagar Alam?",
      options: [
        { key: "a", text: "Kegiatan penelitian ilmiah murni, pendidikan, dan pemantauan ekosistem tanpa mengubah bentang alam" },
        { key: "b", text: "Pembangunan hotel resort ekowisata massal dan jalan raya provinsi" },
        { key: "c", text: "Penambangan pasir dan penebangan pohon kayu berskala industri" },
        { key: "d", text: "Pembukaan lahan sawah irigasi teknis untuk kelompok tani binaan" },
      ],
    },
  ],

  antroposfer: [
    {
      id: "ant-q1",
      order: 1,
      cognitive_level: "C4",
      stimulus_type: "DIAGRAM",
      stimulus_url: "/assets/images/stimulus/stimulus_piramida_penduduk.png",
      stimulus_text:
        "Piramida penduduk Kabupaten Madiun menunjukkan bentuk peralihan dari piramida ekspansif ke stasioner: proporsi kelompok usia muda (0-14 tahun) mulai menyusut, sementara kelompok usia produktif (15-64 tahun) mendominasi lebih dari 68% total populasi.",
      question_text:
        "Analisis potensi ekonomi dan tantangan pembangunan dari struktur demografi Kabupaten Madiun tersebut adalah:",
      options: [
        { key: "a", text: "Madiun menikmati jendela Bonus Demografi dengan rasio ketergantungan rendah, namun menuntut penciptaan lapangan kerja produktif dan peningkatan mutu pendidikan vokasi" },
        { key: "b", text: "Terjadi beban ketergantungan (dependency ratio) tertinggi sepanjang sejarah yang melumpuhkan anggaran daerah" },
        { key: "c", text: "Pemerintah daerah harus segera menutup seluruh sekolah dan membangun panti wreda massal" },
        { key: "d", text: "Angka pertumbuhan penduduk alami melonjak tak terkendali di atas 5% per tahun" },
      ],
    },
    {
      id: "ant-q2",
      order: 2,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_interaksi_ruang.png",
      stimulus_text:
        "Pembangunan Jalan Tol Trans-Jawa dengan Exit Tol Caruban-Mejayan memangkas waktu tempuh dari Mejayan ke Kota Surabaya dari 4.5 jam menjadi hanya 1.5 jam. Arus mobilitas komuter dan pengiriman hasil industri pangan meningkat tajam.",
      question_text:
        "Berdasarkan Model Gravitasi Keruangan (W.J. Reilly), faktor apakah yang melipatgandakan kekuatan interaksi spasial antara Mejayan dan Surabaya pasca-operasional tol?",
      options: [
        { key: "a", text: "Penurunan friksi jarak (jarak tempuh waktu dan biaya logistik menyusut drastis berbanding terbalik dengan kuadrat jarak)" },
        { key: "b", text: "Penyusutan jumlah penduduk di kedua kota secara bersamaan" },
        { key: "c", text: "Perubahan batas administratif wilayah Kabupaten Madiun menjadi bagian dari Surabaya" },
        { key: "d", text: "Penghapusan seluruh fungsi sentra pertanian di Jawa Timur" },
      ],
    },
    {
      id: "ant-q3",
      order: 3,
      cognitive_level: "C4",
      stimulus_type: "THEMATIC_MAP",
      stimulus_url: "/assets/images/stimulus/stimulus_tata_ruang_mejayan.png",
      stimulus_text:
        "Peta Rencana Tata Ruang Wilayah (RTRW) Kabupaten Madiun menetapkan Mejayan (Caruban) sebagai Pusat Kegiatan Wilayah (PKW) dan ibukota kabupaten. Terjadi konversi sawah irigasi teknis di sepanjang koridor Jalan Panglima Sudirman menjadi ruko dan perkantoran.",
      question_text:
        "Analisis dampak keruangan alih fungsi Lahan Pertanian Pangan Berkelanjutan (LP2B) terhadap ketahanan pangan daerah dan lingkungan hidrologi adalah:",
      options: [
        { key: "a", text: "Penurunan kapasitas produksi beras lokal serta peningkatan potensi genangan air permukaan akibat hilangnya fungsi retensi resapan sawah" },
        { key: "b", text: "Meningkatnya swasembada beras secara otomatis karena harga ruko lebih tinggi dari gabah" },
        { key: "c", text: "Pengurangan angka pengangguran petani secara instan menjadi pengusaha teknologi informasi" },
        { key: "d", text: "Kepadatan bangunan perkantoran menurunkan suhu mikro udara perkotaan" },
      ],
    },
    {
      id: "ant-q4",
      order: 4,
      cognitive_level: "C4",
      stimulus_type: "CASE_STUDY",
      stimulus_url: "/assets/images/stimulus/stimulus_migrasi_tenaga.png",
      stimulus_text:
        "Banyak pemuda produktif dari pedesaan di sekitar Madiun melakukan migrasi sirkuler (nglaju) ke kota-kota besar untuk bekerja di sektor informal, lalu mengirimkan remisi (uang kiriman) ke desa asal setiap bulan.",
      question_text:
        "Dampak positif dan negatif fenomena migrasi sirkuler tersebut terhadap dinamika pedesaan daerah asal adalah:",
      options: [
        { key: "a", text: "Positif: mendorong perbaikan ekonomi keluarga dan pembangunan rumah; Negatif: kekurangan tenaga kerja muda produktif untuk sektor pertanian pangan desa" },
        { key: "b", text: "Positif: menurunkan angka harapan hidup desa; Negatif: memicu ledakan kelahiran di perkotaan" },
        { key: "c", text: "Positif: menghapus total kepemilikan tanah adat; Negatif: menurunkan harga komoditas pangan" },
        { key: "d", text: "Tidak memberikan pengaruh ekonomi maupun sosial bagi daerah asal" },
      ],
    },
    {
      id: "ant-q5",
      order: 5,
      cognitive_level: "C4",
      stimulus_type: "SATELLITE_CROP",
      stimulus_url: "/assets/images/stimulus/stimulus_citra_urban_sprawl.png",
      stimulus_text:
        "Citra satelit Sentinel-2 tahun 2018 vs 2024 di sekitar simpang Caruban menunjukkan penjalaran fisik perkotaan (urban sprawl) berpola pita memanjang (ribbon development) mengikuti jalur jalan arteri nasional.",
      question_text:
        "Kelemahan tata ruang dari pola penjalaran perkotaan tipe ribbon development tersebut adalah:",
      options: [
        { key: "a", text: "Menimbulkan kemacetan lalu lintas akibat tingginya konflik tarikan pergerakan di jalan arteri serta inefisiensi penyediaan utilitas infrastruktur air dan listrik" },
        { key: "b", text: "Memperpendek jarak antar fasilitas pelayanan publik di pedalaman desa" },
        { key: "c", text: "Membatasi perluasan jaringan serat optik telekomunikasi" },
        { key: "d", text: "Membuat harga tanah di koridor jalan raya turun bebas" },
      ],
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { chapterSlug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "siswa-demo-mejayan";
    const chapterSlug = params.chapterSlug.toLowerCase();

    // Check Chapter Gating: verify that student has completed all submaterials
    let isUnlocked = true;
    try {
      const chapter = await prisma.chapter.findUnique({
        where: { slug: chapterSlug },
        include: { subMaterials: true },
      });

      if (chapter && chapter.subMaterials.length > 0) {
        const totalSubs = chapter.subMaterials.length;
        const subIds = chapter.subMaterials.map((s) => s.id);

        const completedCount = await prisma.studentProgress.count({
          where: {
            userId,
            subMaterialId: { in: subIds },
            isCompleted: true,
          },
        });

        isUnlocked = completedCount >= totalSubs;
      }
    } catch (e) {
      // Prisma offline: allow demo testing for student preview
      isUnlocked = true;
    }

    if (!isUnlocked) {
      return NextResponse.json(
        {
          error: "Akses kuis terkunci.",
          message:
            "Sesuai aturan Chapter Gating, Anda wajib menyelesaikan 100% submateri dalam bab ini sebelum dapat mengakses kuis sumatif C4.",
          isUnlocked: false,
        },
        { status: 403 }
      );
    }

    const rawQuestions = clientQuestionBank[chapterSlug] || clientQuestionBank.litosfer;
    const shouldShuffle = searchParams.get("shuffle") !== "false";

    // Fisher-Yates Shuffle for questions and options while preserving option keys
    const shuffleArray = <T>(array: T[]): T[] => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const questions = shouldShuffle
      ? shuffleArray(rawQuestions).map((q, idx) => ({
          ...q,
          order: idx + 1,
          options: shuffleArray(q.options),
        }))
      : rawQuestions;

    // Zero-Answer-Key Leakage: Never expose correct_option_key or explanation_feedback
    return NextResponse.json({
      quizId: `quiz-${chapterSlug}`,
      chapterSlug,
      title: `Asesmen Sumatif C4: Dinamika ${chapterSlug.toUpperCase()}`,
      timeLimitMinutes: 15,
      totalQuestions: questions.length,
      isShuffled: shouldShuffle,
      questions,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
