import { PrismaClient, Role, StimulusType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting GeoSpatialX MMI Database Seeding...");

  // 1. Clean existing records (in reverse dependency order)
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.studentProgress.deleteMany();
  await prisma.subMaterial.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.geospatialLayer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.schoolClass.deleteMany();

  // 2. Seed School Classes (SMAN 1 Mejayan)
  const classX1 = await prisma.schoolClass.create({
    data: { name: "X-1", academicYear: "2026/2027" },
  });
  const classX2 = await prisma.schoolClass.create({
    data: { name: "X-2", academicYear: "2026/2027" },
  });
  const classX3 = await prisma.schoolClass.create({
    data: { name: "X-3", academicYear: "2026/2027" },
  });

  console.log("✅ Seeded School Classes: X-1, X-2, X-3");

  // 3. Seed Demo Users for all 4 RBAC Roles
  const passwordHash = await bcrypt.hash("geospatial2026", 10);

  const studentUser = await prisma.user.create({
    data: {
      name: "Ridwan Putra (Siswa X-1)",
      email: "siswa@sman1mejayan.sch.id",
      passwordHash,
      role: Role.STUDENT,
      schoolClassId: classX1.id,
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      name: "Budi Santoso, S.Pd. (Guru Geografi)",
      email: "guru@sman1mejayan.sch.id",
      passwordHash,
      role: Role.TEACHER,
    },
  });

  const validatorUser = await prisma.user.create({
    data: {
      name: "Dr. Ahmad Hidayat (Validator Spasial & Soal)",
      email: "validator@kemdikbud.go.id",
      passwordHash,
      role: Role.VALIDATOR,
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      name: "Administrator Sistem GeoSpatialX",
      email: "admin@geospatialx.id",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  console.log("✅ Seeded 4 RBAC Users (Student, Teacher, Validator, Admin)");

  // 4. Seed 6 Geosphere Modules & Sub-materials (from LAPORAN TUGAS MMI & Design UI)
  const chaptersData = [
    {
      slug: "litosfer",
      title: "Dinamika Litosfer",
      order: 1,
      description: "Mempelajari struktur, komposisi, dan proses pada litosfer serta dampaknya terhadap pembentukan relief dan mitigasi bencana geologis.",
      sphereName: "Dinamika Litosfer",
      themeColor: "#D9480F",
      videoUrl: "https://youtu.be/UFEtgNYnYGs",
      subMaterials: [
        {
          slug: "struktur-lapisan-bumi",
          order: 1,
          title: "Struktur Internal Lapisan Bumi",
          summary: "Kerak benua & samudra (0-70 km), mantel bumi (70-2.900 km), inti luar cair (2.900-5.150 km), dan inti dalam padat (5.150-6.371 km).",
          contentMarkdown: "Bumi tersusun atas kerak, mantel, inti luar, dan inti dalam. Kerak samudra lebih tipis dan padat (basaltik), sedangkan kerak benua lebih tebal dan ringan (granitik).",
          diagramUrl: "/assets/images/diagrams/litosfer-struktur.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 14,
        },
        {
          slug: "tenaga-endogen-eksogen",
          order: 2,
          title: "Tenaga Endogen & Eksogen Pembentuk Muka Bumi",
          summary: "Tektonisme (konvergen/divergen/transform), vulkanisme (magma, erupsi), seisme (gempa bumi), pelapukan dan erosi.",
          contentMarkdown: "Tenaga endogen membentuk relief kasar seperti pegunungan dan palung melalui tektonisme dan vulkanisme. Tenaga eksogen meratakan dan mengikisnya melalui pelapukan dan erosi.",
          diagramUrl: "/assets/images/diagrams/litosfer-tektonisme.png",
          latitude: -7.95,
          longitude: 111.85,
          zoomLevel: 11,
        },
        {
          slug: "mitigasi-bencana-geologis",
          order: 3,
          title: "Mitigasi Bencana Geologis Kontekstual",
          summary: "Kesiapsiagaan pra-bencana, respon saat bencana, dan rehabilitasi pasca-bencana gempa, tsunami pesisir selatan, dan erupsi Wilis.",
          contentMarkdown: "Langkah mitigasi gempa dan longsor di wilayah Kabupaten Madiun dan pesisir selatan Jawa: pembuatan peta zona rawan, jalur evakuasi resmi, dan konstruksi tahan gempa.",
          diagramUrl: "/assets/images/diagrams/litosfer-mitigasi.png",
          latitude: -8.2,
          longitude: 111.7,
          zoomLevel: 9,
        },
      ],
    },
    {
      slug: "pedosfer",
      title: "Dinamika Pedosfer",
      order: 2,
      description: "Proses pedogenesis, 5 faktor pembentuk tanah, profil horizon O-A-B-C-R, ragam tanah Indonesia, dan teknik konservasi terasering.",
      sphereName: "Dinamika Pedosfer",
      themeColor: "#D97706",
      videoUrl: "https://youtu.be/iAPOAQAunEg",
      subMaterials: [
        {
          slug: "proses-faktor-pembentuk-tanah",
          order: 1,
          title: "Pedogenesis & 5 Faktor Pembentuk Tanah",
          summary: "Pembentukan tanah dipengaruhi oleh interaksi iklim, organisme, bahan induk, relief/topografi, dan waktu.",
          contentMarkdown: "Tanah terbentuk dari pelapukan batuan induk. Iklim dan organisme merupakan faktor aktif, sedangkan bahan induk, topografi, dan waktu adalah faktor pasif.",
          diagramUrl: "/assets/images/diagrams/pedosfer-faktor.png",
          latitude: -7.55,
          longitude: 111.66,
          zoomLevel: 13,
        },
        {
          slug: "profil-horizon-jenis-tanah",
          order: 2,
          title: "Profil Horizon Tanah (O, A, B, C, R) & Jenis Tanah",
          summary: "Horizon organik O, topsoil A, subsoil B, regolit C, dan batuan induk R. Sebaran tanah aluvial di Madiun dan andosol di lereng Wilis.",
          contentMarkdown: "Profil vertikal tanah memperlihatkan lapisan horizon yang mencerminkan tingkat kematangan tanah. Tanah aluvial subur dijumpai di lembah Bengawan Madiun.",
          diagramUrl: "/assets/images/diagrams/pedosfer-horizon.png",
          latitude: -7.58,
          longitude: 111.75,
          zoomLevel: 12,
        },
        {
          slug: "kerusakan-lahan-konservasi",
          order: 3,
          title: "Kerusakan Tanah & Konservasi Lahan Terasering",
          summary: "Erosi air dan angin, alih fungsi lahan lereng, serta konservasi vegetatif (reboisasi) dan mekanik (terasering, guludan).",
          contentMarkdown: "Konservasi mekanik seperti terasering menahan laju aliran permukaan air dan mengurangi erosi tanah di lereng Gunung Wilis.",
          diagramUrl: "/assets/images/diagrams/pedosfer-konservasi.png",
          latitude: -7.7,
          longitude: 111.78,
          zoomLevel: 12,
        },
      ],
    },
    {
      slug: "atmosfer",
      title: "Dinamika Atmosfer",
      order: 3,
      description: "Lapisan troposfer hingga eksosfer, unsur cuaca/iklim, klasifikasi awan, angin muson barat-timur, dan dampak pemanasan global.",
      sphereName: "Dinamika Atmosfer",
      themeColor: "#38BDF8",
      videoUrl: "https://youtu.be/hm7N4uQV8Fw",
      subMaterials: [
        {
          slug: "lapisan-atmosfer-suhu",
          order: 1,
          title: "Lapisan Atmosfer & Dinamika Suhu/Tekanan",
          summary: "Troposfer (cuaca), stratosfer (ozon), mesosfer (meteor), termosfer (ionosfer), dan eksosfer.",
          contentMarkdown: "Troposfer adalah lapisan paling bawah tempat terjadinya seluruh fenomena cuaca seperti awan, hujan, dan angin.",
          diagramUrl: "/assets/images/diagrams/atmosfer-lapisan.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 8,
        },
        {
          slug: "unsur-cuaca-awan-bmkg",
          order: 2,
          title: "Unsur Cuaca, Klasifikasi Awan & Prakiraan BMKG",
          summary: "Suhu, tekanan, kelembapan, angin, curah hujan, serta identifikasi awan tinggi, menengah, dan rendah (cumulonimbus).",
          contentMarkdown: "BMKG menggunakan radar cuaca dan citra satelit Himawari untuk memetakan dinamika pembentukan awan konvektif penghasil hujan lebat.",
          diagramUrl: "/assets/images/diagrams/atmosfer-awan.png",
          latitude: -7.5,
          longitude: 111.6,
          zoomLevel: 10,
        },
        {
          slug: "angin-muson-perubahan-iklim",
          order: 3,
          title: "Angin Muson Barat-Timur & Pemanasan Global",
          summary: "Pergerakan angin muson akibat perbedaan tekanan Asia-Australia dan ancaman cuaca ekstrem hidrometeorologi.",
          contentMarkdown: "Angin Muson Barat membawa uap air dari Samudra Hindia dan Asia memicu musim hujan di Indonesia pada Oktober hingga April.",
          diagramUrl: "/assets/images/diagrams/atmosfer-muson.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 6,
        },
      ],
    },
    {
      slug: "hidrosfer",
      title: "Dinamika Hidrosfer",
      order: 4,
      description: "Siklus air, perairan darat (sungai DAS Madiun, danau, air tanah), zonasi laut kedalaman, dan batas maritim laut teritorial/ZEE.",
      sphereName: "Dinamika Hidrosfer",
      themeColor: "#0284C7",
      videoUrl: "https://youtu.be/kVdE-6l7_CA",
      subMaterials: [
        {
          slug: "siklus-hidrologi",
          order: 1,
          title: "Tahapan Siklus Hidrologi Pendek, Sedang, Panjang",
          summary: "Evaporasi, transpirasi, kondensasi, presipitasi, infiltrasi, perkolasi, dan limpasan permukaan (surface runoff).",
          contentMarkdown: "Siklus air menjaga ketersediaan air tawar di bumi. Infiltrasi di daerah resapan air hulu sangat krusial mencegah banjir hilir.",
          diagramUrl: "/assets/images/diagrams/hidrosfer-siklus.png",
          latitude: -7.6,
          longitude: 111.5,
          zoomLevel: 11,
        },
        {
          slug: "perairan-darat-das-madiun",
          order: 2,
          title: "Perairan Darat & Karakteristik DAS Bengawan Madiun",
          summary: "Hulu, tengah, dan hilir sungai, pola aliran dendritik, dan mitigasi limpasan banjir Bengawan Madiun.",
          contentMarkdown: "Bengawan Madiun merupakan anak sungai Bengawan Solo dengan peran vital bagi irigasi persawahan di Caruban dan Mejayan.",
          diagramUrl: "/assets/images/diagrams/hidrosfer-das.png",
          latitude: -7.53,
          longitude: 111.52,
          zoomLevel: 12,
        },
        {
          slug: "perairan-laut-batas-maritim",
          order: 3,
          title: "Perairan Laut Indonesia & Batas Ruang Maritim",
          summary: "Zonasi laut (litoral, neritik, batial, abisal) dan batas kedaulatan Laut Teritorial 12 mil, ZEE 200 mil, dan Landas Kontinen.",
          contentMarkdown: "Sebagai negara kepulauan terbesar, Deklarasi Djuanda 1957 menjadi tonggak hukum kedaulatan laut nusantara.",
          diagramUrl: "/assets/images/diagrams/hidrosfer-laut.png",
          latitude: -8.3,
          longitude: 111.5,
          zoomLevel: 7,
        },
      ],
    },
    {
      slug: "biosfer",
      title: "Dinamika Biosfer",
      order: 5,
      description: "Faktor persebaran flora/fauna, bioma dunia, garis biogeografi Wallace & Weber, flora-fauna endemik nusantara, dan konservasi.",
      sphereName: "Dinamika Biosfer",
      themeColor: "#10B981",
      videoUrl: "https://youtu.be/ZI3z9okAnrU",
      subMaterials: [
        {
          slug: "faktor-persebaran-bioma",
          order: 1,
          title: "Faktor Persebaran Makhluk Hidup & Bioma Dunia",
          summary: "Pengaruh iklim, tanah (edafik), relief (fisiografi), bioma hutan hujan tropis, sabana, stepa, taiga, tundra.",
          contentMarkdown: "Bioma hutan hujan tropis Indonesia memiliki kanopi berlapis dan keanekaragaman jenis hayati tertinggi kedua di dunia.",
          diagramUrl: "/assets/images/diagrams/biosfer-bioma.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 6,
        },
        {
          slug: "garis-wallace-weber-fauna",
          order: 2,
          title: "Garis Wallace & Weber: Sebaran Fauna Indonesia",
          summary: "Wilayah Asiatis (barat), Peralihan Wallacea (tengah), dan Australis (timur) dibatasi palung laut dalam.",
          contentMarkdown: "Garis Wallace memisahkan fauna barat mamalia besar dengan zona transisi Wallacea yang kaya satwa unik (Anoa, Babirusa, Komodo).",
          diagramUrl: "/assets/images/diagrams/biosfer-wallace.png",
          latitude: -2.5,
          longitude: 118.0,
          zoomLevel: 5,
        },
        {
          slug: "konservasi-flora-fauna-endemik",
          order: 3,
          title: "Konservasi Keanekaragaman Hayati Endemik",
          summary: "Taman nasional, cagar alam, suaka margasatwa, dan perlindungan spesies langka terancam punah.",
          contentMarkdown: "Upaya konservasi in-situ dan ex-situ melindungi kekayaan genetik Indonesia dari ancaman fragmentasi habitat dan perburuan.",
          diagramUrl: "/assets/images/diagrams/biosfer-konservasi.png",
          latitude: -7.8,
          longitude: 112.5,
          zoomLevel: 9,
        },
      ],
    },
    {
      slug: "antroposfer",
      title: "Dinamika Antroposfer",
      order: 6,
      description: "Piramida penduduk interaktif, natalitas, mortalitas, migrasi, interaksi desa-kota, dan tata ruang berkelanjutan.",
      sphereName: "Dinamika Antroposfer",
      themeColor: "#8B5CF6",
      videoUrl: "https://youtu.be/8GeRlzTmdHI",
      subMaterials: [
        {
          slug: "dinamika-kependudukan-piramida",
          order: 1,
          title: "Dinamika Kependudukan & Piramida Penduduk Interaktif",
          summary: "Struktur umur dan jenis kelamin: piramida ekspansif (muda), stasioner (dewasa), dan konstruktif (tua).",
          contentMarkdown: "Piramida penduduk Indonesia bergerak menuju bonus demografi dengan proporsi usia produktif terbesar.",
          diagramUrl: "/assets/images/diagrams/antroposfer-piramida.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 13,
        },
        {
          slug: "pemanfaatan-ruang-desa-kota",
          order: 2,
          title: "Pemanfaatan Ruang & Interaksi Spasial Desa-Kota",
          summary: "Alih fungsi lahan pertanian menjadi pemukiman di koridor Caruban-Madiun, urbanisasi, dan daya dukung lingkungan.",
          contentMarkdown: "Interaksi desa-kota menciptakan aliran barang, jasa, dan tenaga kerja yang membutuhkan perencanaan tata ruang terpadu.",
          diagramUrl: "/assets/images/diagrams/antroposfer-ruang.png",
          latitude: -7.54,
          longitude: 111.65,
          zoomLevel: 14,
        },
        {
          slug: "hubungan-timbal-balik-keberlanjutan",
          order: 3,
          title: "Hubungan Timbal Balik Manusia-Alam & Pembangunan Berkelanjutan",
          summary: "Dampak deforestasi, pencemaran, jejak karbon, dan kesadaran pembangunan ramah lingkungan generasi muda.",
          contentMarkdown: "Pembangunan berkelanjutan (SDGs) menyelaraskan pertumbuhan ekonomi dengan kelestarian ekosistem dan keadilan sosial.",
          diagramUrl: "/assets/images/diagrams/antroposfer-keberlanjutan.png",
          latitude: -7.5476,
          longitude: 111.6536,
          zoomLevel: 10,
        },
      ],
    },
  ];

  for (const c of chaptersData) {
    const chapter = await prisma.chapter.create({
      data: {
        slug: c.slug,
        title: c.title,
        order: c.order,
        description: c.description,
        sphereName: c.sphereName,
        themeColor: c.themeColor,
        videoUrl: c.videoUrl,
        subMaterials: {
          create: c.subMaterials.map((s) => ({
            slug: s.slug,
            order: s.order,
            title: s.title,
            summary: s.summary,
            contentMarkdown: s.contentMarkdown,
            diagramUrl: s.diagramUrl,
            latitude: s.latitude,
            longitude: s.longitude,
            zoomLevel: s.zoomLevel,
          })),
        },
      },
    });

    console.log(`✅ Seeded Chapter ${c.order}: ${c.title} with 3 sub-materials`);
  }

  // 5. Seed Student Initial Progress for Litosfer Submaterials
  const litosferSubs = await prisma.subMaterial.findMany({
    where: { chapter: { slug: "litosfer" } },
    orderBy: { order: "asc" },
  });

  for (const sub of litosferSubs) {
    await prisma.studentProgress.create({
      data: {
        userId: studentUser.id,
        subMaterialId: sub.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }
  console.log("✅ Seeded 100% Progress for student in Chapter Litosfer (Unlocking Quiz)");

  // 6. Seed Geospatial Layers with Rigorous Attribution Metadata
  const layersData = [
    {
      name: "Batas Lempeng Tektonik & Ring of Fire (Makro)",
      slug: "lempeng-tektonik-indonesia",
      level: 1,
      category: "tectonics",
      source_name: "Badan Informasi Geospasial (BIG) & USGS",
      license_type: "Open Government Data & CC-BY-4.0",
      attribution_text: "© Badan Informasi Geospasial (BIG) & USGS Tectonic Plate Boundaries 2024",
      is_verified: true,
      opacity_default: 0.85,
      stroke_color: "#D9480F",
      fill_color: "#D9480F33",
      geojson_simplified: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "Zona Subduksi Megathrust Jawa-Sumatra", type: "Subduction" },
            geometry: {
              type: "LineString",
              coordinates: [
                [95.0, 5.5],
                [98.0, 2.0],
                [102.0, -4.0],
                [106.0, -7.0],
                [111.0, -9.0],
                [115.0, -9.5],
                [120.0, -10.0],
              ],
            },
          },
        ],
      },
    },
    {
      name: "Daerah Aliran Sungai (DAS) Bengawan Madiun (Meso)",
      slug: "das-bengawan-madiun",
      level: 2,
      category: "watershed",
      source_name: "Balai Besar Wilayah Sungai (BBWS) Bengawan Solo",
      license_type: "Open Government Data RI",
      attribution_text: "© BBWS Bengawan Solo & Dinas PUPR Prov. Jatim 2024",
      is_verified: true,
      opacity_default: 0.75,
      stroke_color: "#0284C7",
      fill_color: "#0284C722",
      geojson_simplified: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "Sub-DAS Madiun & Kali Catur", luas_km2: 1450.5 },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [111.45, -7.45],
                  [111.75, -7.45],
                  [111.85, -7.75],
                  [111.6, -7.85],
                  [111.4, -7.65],
                  [111.45, -7.45],
                ],
              ],
            },
          },
        ],
      },
    },
    {
      name: "Zona Kerawanan Longsor Lereng Wilis (Meso)",
      slug: "kerawanan-longsor-wilis",
      level: 2,
      category: "hazard",
      source_name: "Badan Nasional Penanggulangan Bencana (BNPB)",
      license_type: "InaRISK Open Data / CC-BY-4.0",
      attribution_text: "© InaRISK BNPB - Peta Bahaya Tanah Longsor Kab. Madiun 2024",
      is_verified: true,
      opacity_default: 0.7,
      stroke_color: "#DC2626",
      fill_color: "#DC262633",
      geojson_simplified: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { name: "Zona Kerentanan Gerakan Tanah Tinggi Wilis", tingkat: "Tinggi" },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [111.7, -7.7],
                  [111.82, -7.72],
                  [111.85, -7.85],
                  [111.72, -7.82],
                  [111.7, -7.7],
                ],
              ],
            },
          },
        ],
      },
    },
    {
      name: "Lingkungan Kontekstual SMAN 1 Mejayan (Mikro)",
      slug: "sman1-mejayan-mikro",
      level: 3,
      category: "remote_sensing",
      source_name: "Google Maps Platform & ESRI World Imagery",
      license_type: "Google Maps Platform Standard License",
      attribution_text: "Map data ©2026 Google / Imagery ©2026 CNES / Airbus, Maxar Technologies",
      is_verified: true,
      opacity_default: 0.9,
      stroke_color: "#00D2EE",
      fill_color: "#00D2EE33",
      geojson_simplified: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "Kompleks SMAN 1 Mejayan",
              address: "Jl. Panglima Sudirman No. 82, Mejayan, Madiun",
              category: "Fasilitas Pendidikan",
              interpretasi: {
                rona: "Cerah keputihan (atap seng/genteng modern)",
                warna: "Abu-abu muda dan merah bata",
                bentuk: "Persegi panjang modular letter-U",
                ukuran: "Luas kompleks ± 2.2 hektar",
                tekstur: "Kasar seragam (atap kelas)",
                pola: "Teratur berjejer menghadap lapangan upacara",
                bayangan: "Tampak jatuh ke arah barat (orientasi pagi)",
                situs: "Terletak di tepi koridor jalan arteri primer",
                asosiasi: "Bersebelahan dengan pemukiman dan persawahan irigasi",
              },
            },
            geometry: {
              type: "Point",
              coordinates: [111.6536, -7.5476],
            },
          },
        ],
      },
    },
  ];

  for (const layer of layersData) {
    await prisma.geospatialLayer.create({ data: layer });
  }

  console.log("✅ Seeded 4 Geospatial Layers (Level 1, 2, 3 with attribution & 9-element RS interpretation)");

  // 7. Seed C4 Summative Quiz for Litosfer (Pages 83-92 Design UI UX)
  const litosferChapter = await prisma.chapter.findUnique({ where: { slug: "litosfer" } });
  if (litosferChapter) {
    const quiz = await prisma.quiz.create({
      data: {
        chapterId: litosferChapter.id,
        title: "Asesmen Sumatif C4: Dinamika Litosfer & Kebencanaan",
        description: "Evaluasi kognitif tingkat menganalisis (C4) berbasis stimulus peta geologi, citra satelit patahan, dan studi kasus pesisir selatan Jawa.",
        timeLimitMinutes: 15,
        passingScore: 75.0,
        totalQuestions: 5,
      },
    });

    const c4Questions = [
      {
        order: 1,
        cognitive_level: "C4",
        stimulus_type: StimulusType.CASE_STUDY,
        stimulus_url: "/assets/images/stimulus/stimulus_pesisir_selatan.png",
        stimulus_text: "Di wilayah pesisir selatan Jawa terjadi peningkatan aktivitas seismik secara periodik dan tercatat mundurnya garis pantai rata-rata 0.8 meter per tahun akibat penurunan elevasi daratan lokal (subsidence). Data kegempaan BMKG menunjukkan kedalaman hiposentrum berkisar antara 15-45 km di zona laut lepas.",
        question_text: "Berdasarkan analisis fenomena geologi tersebut, proses endogen manakah yang paling mungkin menjadi penyebab utama penurunan muka tanah dan peningkatan seismisitas di wilayah tersebut?",
        option_a: "Pengangkatan lempeng (orogenesis) akibat tumbukan benua",
        option_b: "Subduksi lempeng Samudra Indo-Australia yang menunjam ke bawah lempeng Benua Eurasia",
        option_c: "Vulkanisme akibat erupsi intrusi magma dangkal dasar samudra",
        option_d: "Pelapukan kimiawi batuan gamping dan erosi gelombang air laut (abrasi)",
        correct_option_key: "b",
        explanation_feedback: "Zona selatan Jawa merupakan busur subduksi aktif di mana Lempeng Samudra Indo-Australia menunjam ke bawah Lempeng Benua Eurasia. Gaya kompresi ini menyebabkan akumulasi tegangan geser (shear stress) yang memicu aktivitas gempa dangkal-menengah serta deformasi elastis kerak bumi.",
      },
      {
        order: 2,
        cognitive_level: "C4",
        stimulus_type: StimulusType.THEMATIC_MAP,
        stimulus_url: "/assets/images/stimulus/stimulus_patahan_wilis.png",
        stimulus_text: "Perhatikan peta tematik kemiringan lereng dan jalur patahan sesar aktif di sekitar lereng Gunung Wilis Kabupaten Madiun. Wilayah bagian timur Mejayan didominasi batuan vulkanik muda bertekstur lepas dengan kelerengan >35% yang mengalami alih fungsi dari hutan lindung menjadi kebun semusim.",
        question_text: "Jika terjadi curah hujan intensitas tinggi (>100 mm/hari) selama 3 hari berturut-turut, kombinasi faktor apakah yang paling berisiko memicu bencana gerakan tanah (longsor) massal di kawasan tersebut?",
        option_a: "Lapisan batuan induk kompak yang mengalami peningkatan gaya kohesi",
        option_b: "Tekanan pori air tanah meningkat pada bidang gelincir batuan akibat hilangnya akar pengikat vegetasi dalam",
        option_c: "Pengurangan sudut gesek dalam tanah oleh vegetasi kebun semusim",
        option_d: "Peningkatan daya infiltrasi tanah yang mempercepat pembentukan horizon O",
        correct_option_key: "b",
        explanation_feedback: "Alih fungsi vegetasi hutan berakar dalam menghilangkan fungsi penahan tanah. Saat hujan lebat, air meresap cepat ke regolit lepas hingga mencapai lapisan batuan kedap air (bidang gelincir). Tekanan air pori yang melonjak drastis menurunkan kuat geser tanah, sehingga gaya pendorong melampaui gaya penahan dan memicu longsoran luncuran.",
      },
      {
        order: 3,
        cognitive_level: "C4",
        stimulus_type: StimulusType.SATELLITE_CROP,
        stimulus_url: "/assets/images/stimulus/stimulus_satelit_tekstur.png",
        stimulus_text: "Kajian citra satelit resolusi tinggi di koridor lembah sesar menunjukkan perbedaan rona dan tekstur: di sisi barat tampak pola vegetasi rapat berwarna hijau gelap dengan tekstur kasar bertingkat, sedangkan di sisi timur tampak rona cerah bertekstur halus berpola terputus-putus.",
        question_text: "Berdasarkan 9 unsur interpretasi citra penginderaan jauh, kesimpulan analitis manakah yang paling tepat mengenai kondisi lahan di kedua sisi lembah sesar tersebut?",
        option_a: "Sisi barat merupakan lahan kritis yang belum terehabilitasi sedangkan sisi timur hutan primer",
        option_b: "Sisi barat merupakan kawasan konservasi dengan tutupan pohon bertajuk lebat sedangkan sisi timur adalah lahan terbuka/pemukiman",
        option_c: "Sisi barat mencerminkan perairan tergenang sedangkan sisi timur batuan kapur",
        option_d: "Kedua sisi memiliki tingkat erosi yang identik karena berada pada formasi geologi sama",
        correct_option_key: "b",
        explanation_feedback: "Rona gelap pada band inframerah/pancar ditambah tekstur kasar tidak teratur adalah ciri khas kanopi hutan lebat (vegetasi tinggi). Sebaliknya, rona cerah dengan tekstur halus berasosiasi dengan lahan terbuka, tanah gundul, atau atap seng pemukiman.",
      },
      {
        order: 4,
        cognitive_level: "C4",
        stimulus_type: StimulusType.CASE_STUDY,
        stimulus_url: "/assets/images/stimulus/stimulus_mitigasi_gempa.png",
        stimulus_text: "Sebuah gedung sekolah berlantai dua di Kabupaten Madiun terletak 15 km dari jalur sesar aktif. Berdasarkan inspeksi struktur, bangunan didirikan di atas tanah endapan aluvium lunak Bengawan Madiun tanpa perkuatan kolom struktur tahan gempa.",
        question_text: "Dari perspektif rekayasa mitigasi geologis, mengapa tanah lunak aluvium memperbesar risiko kerusakan bangunan saat terjadi getaran gempa bumi (seisme)?",
        option_a: "Tanah aluvium meredam energi gelombang gempa primer (P-wave)",
        option_b: "Terjadi efek amplifikasi gelombang seismik permukaan (S-wave) dan potensi likuefaksi pada lapisan jenuh air",
        option_c: "Tanah aluvium memiliki frekuensi resonansi alami yang selalu lebih tinggi dari getaran bangunan",
        option_d: "Tanah aluvium mengubah gelombang transversal menjadi gelombang elektromagnetik",
        correct_option_key: "b",
        explanation_feedback: "Lapisan sedimen aluvium yang tebal dan gembur menyebabkan fenomena amplifikasi gelombang seismik (penguatan amplitudo getaran). Jika lapisan pasir jenuh air di bawahnya terguncang, ikatan antar butir hilang dan tanah berubah sifat menjadi fluida cair (likuefaksi), meruntuhkan fondasi gedung.",
      },
      {
        order: 5,
        cognitive_level: "C4",
        stimulus_type: StimulusType.THEMATIC_MAP,
        stimulus_url: "/assets/images/stimulus/stimulus_zonasi_vulkanik.png",
        stimulus_text: "Kawasan Rawan Bencana (KRB) vulkanik dibagi menjadi KRB I, KRB II, dan KRB III. Kota Caruban dan Mejayan berada di radius aliran lahar hujan lembah sungai yang berhulu di gunung api aktif.",
        question_text: "Strategi mitigasi struktural dan non-struktural paling efektif untuk melindungi permukiman di dataran limpasan banjir lahar dingin adalah:",
        option_a: "Membangun tanggul penahan lahar (Sabo Dam) di alur sungai hulu dan memasang sistem peringatan dini berbasis sensor debit & curah hujan",
        option_b: "Mengeringkan seluruh danau kawah dan menimbun alur sungai dengan pasir",
        option_c: "Memindahkan seluruh penduduk Kabupaten Madiun ke luar pulau Jawa",
        option_d: "Membiarkan endapan lahar menumpuk secara alami untuk menyuburkan lahan pertanian seketika",
        correct_option_key: "a",
        explanation_feedback: "Sabo Dam berfungsi mengontrol dan memperlambat energi angkut material sedimen lahar dingin di lereng hulu, sementara Early Warning System (EWS) sensor debit memberikan jeda waktu evakuasi bagi warga bantaran di wilayah hilir Mejayan.",
      },
    ];

    for (const q of c4Questions) {
      await prisma.question.create({
        data: {
          quizId: quiz.id,
          order: q.order,
          cognitive_level: q.cognitive_level,
          stimulus_type: q.stimulus_type,
          stimulus_url: q.stimulus_url,
          stimulus_text: q.stimulus_text,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_option_key: q.correct_option_key,
          explanation_feedback: q.explanation_feedback,
        },
      });
    }

    console.log("✅ Seeded Chapter 1 (Litosfer) C4 Summative Quiz with 5 HOTS questions & stimulus");
  }

  console.log("🎉 GeoSpatialX MMI Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
