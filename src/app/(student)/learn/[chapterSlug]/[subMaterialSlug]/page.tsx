import React from "react";
import { notFound } from "next/navigation";
import { ContextualLessonViewer } from "@/components/learning/ContextualLessonViewer";

interface LessonPageProps {
  params: {
    chapterSlug: string;
    subMaterialSlug: string;
  };
}

// Complete 6 Geosphere Modules aligned directly with LAPORAN TUGAS MMI & Design UI UX.pdf
const allGeosphereLessons: Record<
  string,
  {
    id: string;
    slug: string;
    title: string;
    order: number;
    sphereName: string;
    themeColor: string;
    videoUrl?: string;
    subMaterials: {
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
    }[];
  }
> = {
  litosfer: {
    id: "chap-1",
    slug: "litosfer",
    title: "Dinamika Litosfer",
    order: 1,
    sphereName: "Dinamika Litosfer",
    themeColor: "#D9480F",
    videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
    subMaterials: [
      {
        id: "sub-1-1",
        slug: "struktur-lapisan-bumi",
        order: 1,
        title: "Struktur Internal Lapisan Bumi",
        summary:
          "Kerak benua & samudra (0-70 km), mantel bumi (70-2.900 km), inti luar cair (2.900-5.150 km), dan inti dalam padat (5.150-6.371 km).",
        contentMarkdown: `### 1. Struktur Internal Lapisan Bumi
Bumi tersusun atas beberapa lapisan yang berbeda berdasarkan komposisi, keadaan fisik, dan suhu di dalamnya. Secara umum, struktur internal Bumi terdiri dari kerak, mantel, inti luar, dan inti dalam:

- **Kerak Bumi (Crust):** Lapisan terluar dan paling tipis dari struktur Bumi dengan ketebalan 5–70 km. Terdiri atas:
  - **Kerak Benua:** Ketebalan 30–70 km, batuan utama granit, massa jenis lebih ringan (±2.7 g/cm³), kaya unsur Silisium dan Alumunium (SiAl).
  - **Kerak Samudra:** Ketebalan 5–10 km, batuan utama basalt, massa jenis lebih padat (±3.0 g/cm³), kaya unsur Silisium dan Magnesium (SiMa).
- **Mantel Bumi (Mantle):** Terletak pada kedalaman 70–2.900 km. Mengandung batuan peridotit kaya besi dan magnesium. Bagian atasnya (astenosfer) bersifat plastis/semi-cair dengan suhu 1.000–3.000°C yang memicu timbulnya arus konveksi mantel penggerak lempeng tektonik.
- **Inti Luar (Outer Core):** Kedalaman 2.900–5.150 km. Berwujud cair pekat dari paduan besi dan nikel dengan suhu 4.000–5.000°C. Perputaran fluida logam cair ini menghasilkan medan magnet bumi (geomagnetik) yang melindungi atmosfer dari radiasi angin matahari.
- **Inti Dalam (Inner Core):** Kedalaman 5.150–6.371 km. Berwujud padat murni besi dan nikel akibat tekanan kompresi ekstrem (mencapai 3.6 juta atmosfer) dengan suhu mencapai 5.500–6.000°C setara permukaan matahari.`,
        diagramUrl: "/assets/images/diagrams/litosfer-struktur.png",
        audioUrl: "/assets/audio/litosfer-penjelasan.mp3",
        videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 14,
      },
      {
        id: "sub-1-2",
        slug: "tenaga-endogen-eksogen",
        order: 2,
        title: "Tenaga Endogen & Eksogen Pembentuk Muka Bumi",
        summary:
          "Tektonisme (konvergen/divergen/transform), proses vulkanisme lahirnya gunung api, dan seisme (gempa bumi).",
        contentMarkdown: `### 2. Tenaga Endogen & Eksogen Pembentuk Muka Bumi
Muka bumi terus bertransformasi akibat interaksi dinamis antara gaya endogen dan eksogen:

1. **Tenaga Endogen (Membangun Relief):**
   - **Tektonisme:** Gerak orogenesa (pembentukan pegunungan lipatan dan patahan) dan epirogenesa (pengangkatan/penurunan daratan luas). Di selatan Jawa, penunjaman lempeng Indo-Australia menghasilkan palung laut Jawa dan rangkaian pegunungan vulkanik.
   - **Vulkanisme:** Penerobosan magma dari dapur magma ke permukaan bumi. Di wilayah Jawa Timur, deretan gunung api seperti Wilis, Kelud, dan Arjuno merupakan wujud nyata vulkanisme busur subduksi.
   - **Seisme (Gempa Bumi):** Guncangan permukaan akibat pelepasan gelombang seismik P-wave dan S-wave saat lempeng tektonik patah secara mendadak.
2. **Tenaga Eksogen (Meratakan & Mengikis):**
   - **Pelapukan Fisik, Kimiawi, dan Biologis:** Penghancuran batuan induk menjadi pecahan regolit.
   - **Erosi & Sedimentasi:** Pengikisan material oleh air hujan di lereng Gunung Wilis dan pengendapan sedimen aluvial di lembah aliran Bengawan Madiun.`,
        diagramUrl: "/assets/images/diagrams/litosfer-tektonisme.png",
        audioUrl: "/assets/audio/litosfer-tektonisme.mp3",
        videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
        latitude: -7.95,
        longitude: 111.85,
        zoomLevel: 11,
      },
      {
        id: "sub-1-3",
        slug: "mitigasi-bencana-geologis",
        order: 3,
        title: "Mitigasi Bencana Geologis Kontekstual Madiun",
        summary:
          "Kesiapsiagaan menghadapi gempa sesar aktif, bahaya gerakan tanah lereng Wilis, dan jalur evakuasi sekolah.",
        contentMarkdown: `### 3. Mitigasi Bencana Geologis Kontekstual di SMAN 1 Mejayan
Kawasan Kabupaten Madiun dan pesisir selatan Jawa memiliki ancaman bahaya gempa bumi tektonik dan tanah longsor:

- **Pra-Bencana (Kesiapsiagaan):**
  - Mengenali denah bangunan bertingkat sekolah dan letak tiang struktur penahan beban.
  - Mempelajari peta zona bahaya gempa dan rute evakuasi menuju titik kumpul terbuka di lapangan upacara SMAN 1 Mejayan.
- **Saat Bencana (Tanggap Darurat):**
  - Terapkan rumus 3B: *Berlutut, Berlindung, Bertahan* (*Drop, Cover, and Hold On*).
  - Jauhi dinding kaca laboratorium, proyektor gantung, dan lemari buku.
  - Jangan panik dan jangan menggunakan tangga saat guncangan hebat masih berlangsung.
- **Pasca-Bencana (Pemulihan):**
  - Keluar gedung secara berurutan dan tenang dengan melindungi kepala menggunakan tas sekolah.
  - Laporkan teman yang terluka kepada guru piket atau Palang Merah Remaja (PMR).`,
        diagramUrl: "/assets/images/diagrams/litosfer-mitigasi.png",
        audioUrl: "/assets/audio/litosfer-mitigasi.mp3",
        videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
        latitude: -8.2,
        longitude: 111.7,
        zoomLevel: 9,
      },
    ],
  },
  pedosfer: {
    id: "chap-2",
    slug: "pedosfer",
    title: "Dinamika Pedosfer",
    order: 2,
    sphereName: "Dinamika Pedosfer",
    themeColor: "#D97706",
    videoUrl: "https://www.youtube.com/embed/iAPOAQAunEg",
    subMaterials: [
      {
        id: "sub-2-1",
        slug: "proses-faktor-pembentuk-tanah",
        order: 1,
        title: "Pedogenesis & 5 Faktor Pembentuk Tanah",
        summary: "Proses pelapukan batuan induk yang dipengaruhi iklim, organisme, bahan induk, topografi, dan waktu.",
        contentMarkdown: `### 1. Pedogenesis & 5 Faktor Pembentuk Tanah
Tanah merupakan lapisan kerak bumi yang terbentuk melalui proses pelapukan fisik, kimia, dan biologi batuan induk yang berlangsung ratusan hingga ribuan tahun.

5 Faktor Utama Pembentuk Tanah:
1. **Iklim:** Suhu dan curah hujan mengontrol laju pelapukan batuan. Iklim tropis lembap di Indonesia memicu pelapukan kimiawi yang sangat intensif.
2. **Organisme:** Mikroorganisme, cacing tanah, dan akar tanaman menyumbang bahan organik serta membentuk struktur pori tanah.
3. **Bahan Induk (Parent Material):** Karakteristik batuan asal (vulkanik, sedimen kapur, atau aluvium) menentukan tekstur dan mineral hara tanah.
4. **Topografi / Relief:** Kemiringan lereng memengaruhi laju erosi dan infiltrasi air. Lereng terjal Wilis memiliki tanah tipis, sedangkan lembah Caruban memiliki tanah aluvial tebal.
5. **Waktu:** Menentukan kedewasaan horizon profil tanah.`,
        diagramUrl: "/assets/images/diagrams/pedosfer-faktor.png",
        latitude: -7.55,
        longitude: 111.66,
        zoomLevel: 13,
      },
      {
        id: "sub-2-2",
        slug: "profil-horizon-jenis-tanah",
        order: 2,
        title: "Profil Horizon Tanah (O, A, B, C, R)",
        summary: "Horizon organik O, topsoil A, subsoil B, regolit C, dan batuan induk R.",
        contentMarkdown: `### 2. Profil Horizon Tanah (O, A, B, C, R)
Irisan vertikal tanah memperlihatkan tingkatan lapisan yang berbeda:
- **Horizon O (Organik):** Lapisan serasah daun dan humus terdekomposisi paling atas.
- **Horizon A (Topsoil):** Lapisan tanah atas yang kaya bahan organik dan mineral hara, berwarna gelap, media utama akar tanaman pangan.
- **Horizon B (Subsoil):** Lapisan akumulasi mineral liat dan oksida besi hasil pencucian (iluviasi) dari horizon A.
- **Horizon C (Regolit):** Lapisan batuan induk yang telah mengalami pelapukan mekanis sebagian.
- **Horizon R (Bedrock):** Batuan induk dasar yang masih padat dan pejal.`,
        diagramUrl: "/assets/images/diagrams/pedosfer-horizon.png",
        latitude: -7.58,
        longitude: 111.75,
        zoomLevel: 12,
      },
      {
        id: "sub-2-3",
        slug: "kerusakan-lahan-konservasi",
        order: 3,
        title: "Konservasi Tanah & Terasering Lereng Wilis",
        summary: "Upaya vegetatif dan mekanik menanggulangi erosi lahan kritis lereng perbukitan.",
        contentMarkdown: `### 3. Upaya Konservasi Lahan Terasering
Erosi tanah di lereng perbukitan Madiun dapat menurunkan kesuburan lahan secara permanen. Metode konservasi terbagi atas:
- **Konservasi Vegetatif:** Penanaman tanaman penutup tanah (cover crops), reboisasi hutan lindung, dan sistem tumpangsari.
- **Konservasi Mekanik:** Pembuatan terasering (sengkedan) berundak untuk memotong panjang lereng dan memperlambat kecepatan limpasan air hujan, serta saluran pembuangan air (SPA) berdinding batu.`,
        diagramUrl: "/assets/images/diagrams/pedosfer-konservasi.png",
        latitude: -7.7,
        longitude: 111.78,
        zoomLevel: 12,
      },
    ],
  },
  atmosfer: {
    id: "chap-3",
    slug: "atmosfer",
    title: "Dinamika Atmosfer",
    order: 3,
    sphereName: "Dinamika Atmosfer",
    themeColor: "#38BDF8",
    videoUrl: "https://www.youtube.com/embed/hm7N4uQV8Fw",
    subMaterials: [
      {
        id: "sub-3-1",
        slug: "lapisan-atmosfer-suhu",
        order: 1,
        title: "Lapisan Atmosfer & Gradien Suhu Udara",
        summary: "Troposfer (0-12 km), Stratosfer (12-50 km ozon), Mesosfer (50-85 km), Termosfer (85-500 km), dan Eksosfer (>500 km).",
        contentMarkdown: `### 1. Lapisan-Lapisan Atmosfer Bumi
Atmosfer melindungi kehidupan bumi dari radiasi kosmik dan benda langit:
- **Troposfer (0–12 km):** Lapisan paling bawah tempat seluruh fenomena cuaca terjadi. Mengalami lapse rate gradien suhu: suhu turun 0.65°C setiap naik 100 meter.
- **Stratosfer (12–50 km):** Memuat lapisan ozon (O₃) yang menyerap sinar ultraviolet matahari. Suhu mengalami inversi (meningkat seiring ketinggian).
- **Mesosfer (50–85 km):** Lapisan terdingin (-90°C) yang membakar habis meteoroid sebelum mencapai permukaan bumi.
- **Termosfer / Ionosfer (85–500 km):** Molekul gas terionisasi menghasilkan aurora dan memantulkan gelombang radio.
- **Eksosfer (>500 km):** Lapisan terluar berbatasan langsung dengan ruang angkasa, tempat orbit satelit cuaca dan komunikasi.`,
        diagramUrl: "/assets/images/diagrams/atmosfer-lapisan.png",
        videoUrl: "https://www.youtube.com/embed/hm7N4uQV8Fw",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 8,
      },
      {
        id: "sub-3-2",
        slug: "unsur-cuaca-awan-bmkg",
        order: 2,
        title: "Unsur Cuaca, Klasifikasi Awan & Radar BMKG",
        summary: "Suhu, tekanan, kelembapan udara, dan klasifikasi awan tinggi, menengah, serta rendah cumulonimbus.",
        contentMarkdown: `### 2. Unsur Cuaca & Klasifikasi Awan BMKG
Cuaca mencerminkan keadaan fisik atmosfer jangka pendek pada wilayah sempit:
- **Suhu & Tekanan:** Udara mengalir dari daerah bertekanan maksimum ke daerah bertekanan minimum sebagai angin.
- **Klasifikasi Awan Berdasarkan Ketinggian:**
  - *Awan Tinggi (>6.000 m):* Cirrus, Cirrocumulus, Cirrostratus (tersusun atas kristal es).
  - *Awan Menengah (2.000–6.000 m):* Altocumulus, Altostratus.
  - *Awan Rendah (<2.000 m):* Stratus, Stratocumulus, Nimbostratus.
  - *Awan Perkembangan Vertikal:* Cumulonimbus (awan badai pemicu hujan deras, petir, angin puting beliung, dan hujan es).`,
        diagramUrl: "/assets/images/diagrams/atmosfer-awan.png",
        videoUrl: "https://www.youtube.com/embed/hm7N4uQV8Fw",
        latitude: -7.5,
        longitude: 111.6,
        zoomLevel: 10,
      },
      {
        id: "sub-3-3",
        slug: "angin-muson-perubahan-iklim",
        order: 3,
        title: "Angin Muson Barat-Timur & Pemanasan Global",
        summary: "Pergerakan angin muson akibat perbedaan tekanan Asia-Australia dan ancaman cuaca ekstrem hidrometeorologi.",
        contentMarkdown: `### 3. Angin Muson & Dampak Pemanasan Global
Indonesia dipengaruhi sirkulasi angin muson setengah tahunan:
- **Muson Barat (Oktober–April):** Matahari berada di belahan bumi selatan. Benua Australia bertekanan rendah sedangkan Benua Asia bertekanan tinggi. Angin basah bertiup melintasi Samudra Hindia memicu musim hujan di Indonesia.
- **Muson Timur (April–Oktober):** Matahari di belahan bumi utara. Angin kering bertiup dari gurun Australia menuju Asia menyebabkan musim kemarau.
- **Pemanasan Global (Global Warming):** Kenaikan konsentrasi gas rumah kaca (CO₂, CH₄) memicu anomali cuaca seperti El Niño (kekeringan panjang) dan La Niña (banjir ekstrem).`,
        diagramUrl: "/assets/images/diagrams/atmosfer-muson.png",
        videoUrl: "https://www.youtube.com/embed/hm7N4uQV8Fw",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 6,
      },
    ],
  },
  hidrosfer: {
    id: "chap-4",
    slug: "hidrosfer",
    title: "Dinamika Hidrosfer",
    order: 4,
    sphereName: "Dinamika Hidrosfer",
    themeColor: "#0284C7",
    videoUrl: "https://www.youtube.com/embed/kVdE-6l7_CA",
    subMaterials: [
      {
        id: "sub-4-1",
        slug: "siklus-hidrologi",
        order: 1,
        title: "Tahapan Siklus Hidrologi Pendek, Sedang, Panjang",
        summary: "Evaporasi, transpirasi, kondensasi, presipitasi, infiltrasi, dan perkolasi air tanah.",
        contentMarkdown: `### 1. Tahapan Siklus Hidrologi
Sirkulasi air di bumi terjadi secara berkesinambungan melalui tiga tipe siklus:
1. **Siklus Pendek:** Penguapan air laut (evaporasi) → pembentukan awan (kondensasi) → hujan langsung di atas laut (presipitasi).
2. **Siklus Sedang:** Penguapan air laut dan darat → uap air terbawa angin ke daratan (adveksi) → hujan di daratan → air meresap (infiltrasi) dan mengalir kembali ke laut lewat sungai (surface runoff).
3. **Siklus Panjang:** Uap air mengalami sublimasi membentuk awan kristal es/salju di pegunungan tinggi → membentuk gletser → mencair perlahan mengalir ke sungai dan kembali ke samudra.`,
        diagramUrl: "/assets/images/diagrams/hidrosfer-siklus.png",
        videoUrl: "https://www.youtube.com/embed/kVdE-6l7_CA",
        latitude: -7.6,
        longitude: 111.5,
        zoomLevel: 11,
      },
      {
        id: "sub-4-2",
        slug: "perairan-darat-das-madiun",
        order: 2,
        title: "Perairan Darat & Karakteristik DAS Bengawan Madiun",
        summary: "Profil sungai hulu, tengah, hilir, pola aliran dendritik, dan konservasi daerah tangkapan air.",
        contentMarkdown: `### 2. Perairan Darat & DAS Bengawan Madiun
Daerah Aliran Sungai (DAS) adalah kesatuan wilayah daratan yang menampung dan mengalirkan air hujan ke satu sungai utama:
- **DAS Bengawan Madiun:** Berhulu di lereng Gunung Wilis dan Pegunungan Kendeng, mengalir melalui Kota Madiun, Caruban, dan Mejayan sebelum bermuara ke Bengawan Solo di Ngawi.
- **Morfologi Sungai:**
  - *Hulu:* Erosi vertikal dominan, lembah sempit huruf V, air jernih berarus deras, banyak jeram/air terjun.
  - *Tengah:* Erosi lateral mulai bekerja, lembah melebar huruf U, kecepatan arus sedang.
  - *Hilir:* Sedimentasi dominan, terbentuk kelokan meander dan danau tapal kuda (oxbow lake).`,
        diagramUrl: "/assets/images/diagrams/hidrosfer-das.png",
        videoUrl: "https://www.youtube.com/embed/kVdE-6l7_CA",
        latitude: -7.53,
        longitude: 111.52,
        zoomLevel: 12,
      },
      {
        id: "sub-4-3",
        slug: "perairan-laut-batas-maritim",
        order: 3,
        title: "Zonasi Laut & Batas Ruang Maritim Indonesia",
        summary: "Zonasi kedalaman laut dan batas Laut Teritorial (12 mil), ZEE (200 mil), serta Landas Kontinen.",
        contentMarkdown: `### 3. Zonasi Laut & Batas Maritim Indonesia
- **Zonasi Laut Berdasarkan Kedalaman:**
  - *Zona Litoral:* Daerah pasang surut air laut.
  - *Zona Neritik (0–200 m):* Laut dangkal kaya sinar matahari dan plankton, pusat perikanan tangkap terbesar.
  - *Zona Batial (200–2.000 m):* Lereng benua curam, cahaya matahari mulai hilang.
  - *Zona Abisal (>2.000 m):* Palung laut dalam dengan suhu mendekati titik beku dan tekanan air luar biasa tinggi.
- **Batas Kedaulatan Ruang Laut Indonesia (UNCLOS 1982):**
  - **Laut Teritorial:** 12 mil laut dari garis pangkal kepulauan (kedaulatan penuh negara).
  - **Zona Ekonomi Eksklusif (ZEE):** 200 mil laut, hak berdaulat mengeksplorasi sumber daya hayati dan non-hayati.
  - **Landas Kontinen:** Dasar laut kelanjutan alamiah benua hingga kedalaman 200 meter atau lebih.`,
        diagramUrl: "/assets/images/diagrams/hidrosfer-laut.png",
        videoUrl: "https://www.youtube.com/embed/kVdE-6l7_CA",
        latitude: -8.3,
        longitude: 111.5,
        zoomLevel: 7,
      },
    ],
  },
  biosfer: {
    id: "chap-5",
    slug: "biosfer",
    title: "Dinamika Biosfer",
    order: 5,
    sphereName: "Dinamika Biosfer",
    themeColor: "#10B981",
    videoUrl: "https://www.youtube.com/embed/ZI3z9okAnrU",
    subMaterials: [
      {
        id: "sub-5-1",
        slug: "faktor-persebaran-bioma",
        order: 1,
        title: "Faktor Persebaran Makhluk Hidup & Bioma Dunia",
        summary: "Faktor klimatik, edafik, fisiografis, dan biotik; sebaran bioma hutan hujan tropis, sabana, taiga, tundra.",
        contentMarkdown: `### 1. Faktor Persebaran Flora-Fauna & Bioma Dunia
Persebaran makhluk hidup di muka bumi dipengaruhi oleh 4 faktor utama:
1. **Faktor Klimatik:** Suhu, kelembapan, angin, dan curah hujan.
2. **Faktor Edafik (Tanah):** Kesuburan, tekstur, struktur, dan pH tanah.
3. **Faktor Fisiografis (Relief):** Ketinggian tempat dan kemiringan lereng.
4. **Faktor Biotik:** Peran manusia, hewan, dan tumbuhan dalam persebaran benih.

**Bioma-Bioma Utama Dunia:**
- *Hutan Hujan Tropis:* Curah hujan >2.000 mm/tahun, kanopi berlapis, keanekaragaman tertinggi (Amazon, Indonesia, Kongo).
- *Sabana:* Padang rumput diselingi pohon-pohon besar (seperti di Nusa Tenggara).
- *Stepa:* Padang rumput luas tanpa pepohonan besar.
- *Gurun:* Curah hujan <250 mm/tahun, amplitudo suhu harian ekstrem, vegetasi xerofit (kaktus).
- *Taiga & Tundra:* Bioma iklim dingin bervegetasi konifer dan lumut.`,
        diagramUrl: "/assets/images/diagrams/biosfer-bioma.png",
        videoUrl: "https://www.youtube.com/embed/ZI3z9okAnrU",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 6,
      },
      {
        id: "sub-5-2",
        slug: "garis-wallace-weber-fauna",
        order: 2,
        title: "Garis Wallace & Weber: Sebaran Fauna Nusantara",
        summary: "Wilayah Asiatis (barat), Peralihan Wallacea (tengah), dan Australis (timur) dipisahkan palung laut dalam.",
        contentMarkdown: `### 2. Garis Wallace & Weber: Keunikan Fauna Indonesia
Indonesia memiliki kekayaan fauna yang terbagi ke dalam tiga zona biogeografi:
- **Fauna Asiatis / Sundais (Bagian Barat):** Meliputi Sumatra, Jawa, Kalimantan, dan Bali. Karakteristik: mamalia berukuran besar (Gajah Sumatra, Harimau, Badak Jawa, Orangutan), jenis kera banyak, ikan air tawar beragam.
- **Fauna Peralihan / Wallacea (Bagian Tengah):** Meliputi Sulawesi, Maluku, dan Nusa Tenggara. Terletak di antara Garis Wallace dan Garis Weber. Karakteristik: satwa endemik purba yang tidak dijumpai di Asia maupun Australia (Komodo, Anoa, Babirusa, Burung Maleo).
- **Fauna Australis / Sahul (Bagian Timur):** Meliputi Papua dan pulau-pulau sekitarnya. Karakteristik: mamalia berkantong (Kangguru pohon, Kuskus), burung berbulu indah (Cenderawasih, Kasuari), sedikit jenis kera.`,
        diagramUrl: "/assets/images/diagrams/biosfer-wallace.png",
        videoUrl: "https://www.youtube.com/embed/ZI3z9okAnrU",
        latitude: -2.5,
        longitude: 118.0,
        zoomLevel: 5,
      },
      {
        id: "sub-5-3",
        slug: "konservasi-flora-fauna-endemik",
        order: 3,
        title: "Perlindungan & Konservasi Keanekaragaman Hayati",
        summary: "Metode konservasi in-situ dan ex-situ, cagar alam, taman nasional, dan suaka margasatwa.",
        contentMarkdown: `### 3. Konservasi Flora & Fauna Endemik
Upaya pelestarian keanekaragaman hayati dilakukan melalui:
- **Konservasi In-Situ:** Pelestarian flora dan fauna di dalam habitat aslinya:
  - *Taman Nasional:* Kawasan pelestarian alam yang memiliki ekosistem asli dan dimanfaatkan untuk penelitian, pendidikan, dan rekreasi (contoh: TN Baluran, TN Ujung Kulon, TN Komodo).
  - *Cagar Alam:* Kawasan perlindungan flora dan ekosistem unik tanpa campur tangan manusia.
  - *Suaka Margasatwa:* Kawasan perlindungan khusus kelangsungan hidup satwa langka.
- **Konservasi Ex-Situ:** Pelestarian di luar habitat aslinya karena habitat aslinya telah rusak parah (contoh: Kebun Raya Bogor, Taman Safari, kebun binatang, bank plasma nutfah).`,
        diagramUrl: "/assets/images/diagrams/biosfer-konservasi.png",
        videoUrl: "https://www.youtube.com/embed/ZI3z9okAnrU",
        latitude: -7.8,
        longitude: 112.5,
        zoomLevel: 9,
      },
    ],
  },
  antroposfer: {
    id: "chap-6",
    slug: "antroposfer",
    title: "Dinamika Antroposfer",
    order: 6,
    sphereName: "Dinamika Antroposfer",
    themeColor: "#8B5CF6",
    videoUrl: "https://www.youtube.com/embed/8GeRlzTmdHI",
    subMaterials: [
      {
        id: "sub-6-1",
        slug: "dinamika-kependudukan-piramida",
        order: 1,
        title: "Dinamika Penduduk & Piramida Kependudukan",
        summary: "Faktor natalitas, mortalitas, migrasi, dan pembacaan bentuk piramida penduduk ekspansif, stasioner, konstruktif.",
        contentMarkdown: `### 1. Dinamika Penduduk & Analisis Piramida
Kependudukan dipengaruhi oleh tiga faktor demografis: kelahiran (natalitas), kematian (mortalitas), dan perpindahan penduduk (migrasi).

**3 Bentuk Utama Piramida Penduduk:**
1. **Piramida Ekspansif (Segitiga / Muda):** Angka kelahiran dan kematian tinggi, sebagian besar penduduk berusia muda (0–14 tahun). Dijumpai di negara berkembang.
2. **Piramida Stasioner (Granat / Dewasa):** Angka kelahiran dan kematian rendah seimbang, pertumbuhan penduduk mendekati nol.
3. **Piramida Konstruktif (Batu Nisan / Tua):** Angka kelahiran menurun tajam, kelompok usia tua mendominasi (contoh: Jepang dan negara Eropa Barat).

*Bonus Demografi Indonesia:* Periode emas di mana proporsi penduduk usia produktif (15–64 tahun) mencapai lebih dari 68%, menuntut penyiapan lapangan kerja berkualitas.`,
        diagramUrl: "/assets/images/diagrams/antroposfer-piramida.png",
        videoUrl: "https://www.youtube.com/embed/8GeRlzTmdHI",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 13,
      },
      {
        id: "sub-6-2",
        slug: "pemanfaatan-ruang-desa-kota",
        order: 2,
        title: "Pemanfaatan Ruang & Interaksi Spasial Desa-Kota",
        summary: "Pola pemukiman, daya dukung lahan, alih fungsi sawah irigasi di koridor Caruban-Madiun, dan urbanisasi.",
        contentMarkdown: `### 2. Pemanfaatan Ruang & Interaksi Desa-Kota
Aktivitas manusia menata dan mengubah wajah permukaan bumi:
- **Pola Pemukiman:** Memanjang mengikuti jalan (linier seperti di sepanjang Jl. Panglima Sudirman Mejayan), mengelompok (nukleated di persimpangan jalan), atau menyebar di perbukitan.
- **Interaksi Spasial Desa-Kota:**
  - *Desa:* Pemasok bahan pangan mentah, tenaga kerja, dan daerah resapan air.
  - *Kota:* Pusat fasilitas pendidikan, pelayanan kesehatan, industri, dan pasar konsumen.
- **Tantangan Alih Fungsi Lahan di Madiun:** Konversi lahan sawah teknis subur menjadi komplek ruko dan pemukiman menuntut penegakan peraturan Rencana Tata Ruang Wilayah (RTRW) Kabupaten Madiun yang berwawasan lingkungan.`,
        diagramUrl: "/assets/images/diagrams/antroposfer-ruang.png",
        videoUrl: "https://www.youtube.com/embed/8GeRlzTmdHI",
        latitude: -7.54,
        longitude: 111.65,
        zoomLevel: 14,
      },
      {
        id: "sub-6-3",
        slug: "hubungan-timbal-balik-keberlanjutan",
        order: 3,
        title: "Hubungan Timbal Balik Manusia-Alam & Pembangunan Berkelanjutan",
        summary: "Deforestasi, jejak karbon, pencemaran air/udara, dan paradigma pembangunan berkelanjutan (SDGs).",
        contentMarkdown: `### 3. Pembangunan Berkelanjutan (Sustainable Development)
Hubungan manusia dengan alam harus berlandaskan etika biosentrisme dan keberlanjutan:
- **Dampak Negatif Aktivitas Tanpa Perencanaan:** Deforestasi hulu memicu banjir bandang dan erosi tanah, pencemaran limbah rumah tangga menurunkan mutu air Bengawan Madiun, dan emisi gas buang mempercepat pemanasan global.
- **Prinsip Pembangunan Berkelanjutan (SDGs):** Pembangunan yang memenuhi kebutuhan generasi masa kini tanpa mengorbankan hak dan kemampuan generasi masa depan untuk memenuhi kebutuhan hidup mereka.
- **Pilar Pembangunan Berkelanjutan:**
  1. *Pilar Sosial:* Pemerataan pendidikan, kesehatan, dan keadilan gender.
  2. *Pilar Ekonomi:* Pertumbuhan ekonomi sirkular dan penciptaan lapangan kerja hijau.
  3. *Pilar Lingkungan:* Konservasi keanekaragaman hayati, mitigasi perubahan iklim, dan pengelolaan sumber daya alam terpadu.`,
        diagramUrl: "/assets/images/diagrams/antroposfer-keberlanjutan.png",
        videoUrl: "https://www.youtube.com/embed/8GeRlzTmdHI",
        latitude: -7.5476,
        longitude: 111.6536,
        zoomLevel: 10,
      },
    ],
  },
};

export default function StudentLessonPage({ params }: LessonPageProps) {
  const chapter = allGeosphereLessons[params.chapterSlug];
  if (!chapter) {
    notFound();
  }

  const subMaterial = chapter.subMaterials.find((s) => s.slug === params.subMaterialSlug);
  if (!subMaterial) {
    notFound();
  }

  return <ContextualLessonViewer chapter={chapter} subMaterial={subMaterial} />;
}
