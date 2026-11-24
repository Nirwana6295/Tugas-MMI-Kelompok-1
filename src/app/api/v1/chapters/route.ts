import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// Fallback seed data in case database connection is not yet initialized
const defaultChapters = [
  {
    id: "chap-1",
    slug: "litosfer",
    title: "Dinamika Litosfer",
    order: 1,
    description: "Mempelajari struktur kerak bumi, tenaga endogen & eksogen, serta mitigasi bencana geologis di Jawa Timur.",
    sphereName: "Dinamika Litosfer",
    themeColor: "#D9480F",
    videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
    subMaterials: [
      {
        id: "sub-1-1",
        slug: "struktur-lapisan-bumi",
        order: 1,
        title: "Struktur Internal Lapisan Bumi",
        summary: "Kerak benua & samudra (0-70 km), mantel bumi (70-2.900 km), inti luar cair (2.900-5.150 km), dan inti dalam padat (5.150-6.371 km).",
        contentMarkdown: `### 1. Karakteristik Lapisan Bumi
Bumi tersusun atas tiga lapisan utama dengan sifat fisik dan kimia yang berbeda:
- **Kerak Bumi (Crust):** Lapisan terluar dan paling tipis (ketebalan 5–70 km). Terbagi atas **Kerak Benua** (didominasi batuan granit, densitas lebih rendah ±2.7 g/cm³) dan **Kerak Samudra** (didominasi batuan basalt, densitas lebih tinggi ±3.0 g/cm³).
- **Mantel Bumi (Mantle):** Lapisan terbesar yang mencapai kedalaman 2.900 km. Bagian atasnya (astenosfer) bersifat semi-cair dan mengalami **arus konveksi termal** yang menggerakkan lempeng-lempeng litosfer di atasnya.
- **Inti Bumi (Core):** Terdiri atas **Inti Luar** (cair, ketebalan 2.900–5.150 km) yang menghasilkan medan magnet bumi melalui efek dinamo, serta **Inti Dalam** (padat akibat tekanan gravitasi luar biasa tinggi, suhu mencapai 6.000°C).`,
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
        summary: "Pergerakan lempeng tektonik (konvergen/divergen/transform), proses vulkanisme lahirnya gunung api, dan seisme (gempa bumi).",
        contentMarkdown: `### 2. Tenaga Endogen & Eksogen
Muka bumi terus berubah bentuk karena adanya dua kekuatan geologi utama:
1. **Tenaga Endogen (Berasal dari Dalam):**
   - **Tektonisme:** Pergerakan lempeng konvergen (tumbukan), divergen (pemekaran), dan transform (sesar mendatar). Di selatan Jawa, penunjaman lempeng Indo-Australia menghasilkan palung laut Jawa dan rangkaian pegunungan vulkanik.
   - **Vulkanisme:** Aktivitas magma yang menerobos kerak bumi membentuk gunung api aktif (seperti Gunung Wilis, Kelud, dan Semeru).
   - **Seisme (Gempa Bumi):** Pelepasan energi regangan elastis batuan akibat gesekan antar lempeng tektonik.
2. **Tenaga Eksogen (Berasal dari Luar):**
   - **Pelapukan:** Penghancuran batuan oleh cuaca, air, dan akar tanaman.
   - **Erosi & Sedimentasi:** Pengikisan material oleh air hujan, angin, dan aliran sungai Bengawan Madiun yang mengendapkan tanah aluvial subur di dataran rendah Caruban.`,
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
        summary: "Kesiapsiagaan menghadapi gempa sesar aktif, bahaya gerakan tanah lereng Wilis, dan jalur evakuasi sekolah.",
        contentMarkdown: `### 3. Mitigasi Bencana Geologis di SMAN 1 Mejayan & Madiun
Kabupaten Madiun memiliki kerentanan geologis terhadap gempa bumi pesisir selatan dan gerakan tanah (tanah longsor) di lereng Gunung Wilis:
- **Tindakan Pra-Bencana:** Edukasi simulasi gempa berkala di sekolah, pemetaan rute jalur evakuasi ke lapangan terbuka, serta penegakan tata ruang zona rawan longsor (InaRISK BNPB).
- **Tindakan Saat Bencana:** Metode *Drop, Cover, and Hold On* (merunduk, berlindung di bawah meja kokoh, dan lindungi kepala), hindari jendela kaca dan panel listrik.
- **Tindakan Pasca-Bencana:** Menuju titik kumpul (*Assembly Point* di lapangan upacara SMAN 1 Mejayan), cek kelengkapan teman sekelas, dan ikuti instruksi tim tanggap darurat sekolah.`,
        diagramUrl: "/assets/images/diagrams/litosfer-mitigasi.png",
        audioUrl: "/assets/audio/litosfer-mitigasi.mp3",
        videoUrl: "https://www.youtube.com/embed/UFEtgNYnYGs",
        latitude: -8.2,
        longitude: 111.7,
        zoomLevel: 9,
      },
    ],
  },
  {
    id: "chap-2",
    slug: "pedosfer",
    title: "Dinamika Pedosfer",
    order: 2,
    description: "Pembentukan tanah, 5 faktor pedogenesis, profil horizon tanah, dan konservasi lahan terasering.",
    sphereName: "Dinamika Pedosfer",
    themeColor: "#D97706",
    videoUrl: "https://www.youtube.com/embed/iAPOAQAunEg",
    subMaterials: [
      {
        id: "sub-2-1",
        slug: "proses-faktor-pembentuk-tanah",
        order: 1,
        title: "Pedogenesis & 5 Faktor Pembentuk Tanah",
        summary: "Iklim, organisme, bahan induk, relief/topografi, dan waktu.",
        contentMarkdown: "Tanah terbentuk melalui pelapukan bahan induk yang dipengaruhi iklim, organisme, topografi, dan waktu...",
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
        summary: "Horizon O, A, B, C, R dan ragam jenis tanah Indonesia.",
        contentMarkdown: "Horizon tanah memperlihatkan profil vertikal tingkat kematangan tanah...",
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
        summary: "Upaya vegetatif dan mekanik menanggulangi erosi lahan.",
        contentMarkdown: "Konservasi mekanik seperti terasering memperpendek panjang lereng...",
        diagramUrl: "/assets/images/diagrams/pedosfer-konservasi.png",
        latitude: -7.7,
        longitude: 111.78,
        zoomLevel: 12,
      },
    ],
  },
  {
    id: "chap-3",
    slug: "atmosfer",
    title: "Dinamika Atmosfer",
    order: 3,
    description: "Lapisan atmosfer, cuaca, iklim, klasifikasi awan, dan angin muson.",
    sphereName: "Dinamika Atmosfer",
    themeColor: "#38BDF8",
    videoUrl: "https://www.youtube.com/embed/hm7N4uQV8Fw",
    subMaterials: [],
  },
  {
    id: "chap-4",
    slug: "hidrosfer",
    title: "Dinamika Hidrosfer",
    order: 4,
    description: "Siklus air, DAS Bengawan Madiun, dan hukum laut ZEE.",
    sphereName: "Dinamika Hidrosfer",
    themeColor: "#0284C7",
    videoUrl: "https://www.youtube.com/embed/kVdE-6l7_CA",
    subMaterials: [],
  },
  {
    id: "chap-5",
    slug: "biosfer",
    title: "Dinamika Biosfer",
    order: 5,
    description: "Garis Wallace-Weber, persebaran satwa endemik, dan konservasi bioma.",
    sphereName: "Dinamika Biosfer",
    themeColor: "#10B981",
    videoUrl: "https://www.youtube.com/embed/ZI3z9okAnrU",
    subMaterials: [],
  },
  {
    id: "chap-6",
    slug: "antroposfer",
    title: "Dinamika Antroposfer",
    order: 6,
    description: "Piramida penduduk interaktif, interaksi desa-kota, dan tata ruang.",
    sphereName: "Dinamika Antroposfer",
    themeColor: "#8B5CF6",
    videoUrl: "https://www.youtube.com/embed/8GeRlzTmdHI",
    subMaterials: [],
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterSlug = searchParams.get("slug");

    // Attempt to query database, fallback to structured data if DB is offline
    let chapters = defaultChapters;
    try {
      const dbChapters = await prisma.chapter.findMany({
        include: {
          subMaterials: {
            orderBy: { order: "asc" },
          },
          quiz: {
            select: { id: true, title: true, timeLimitMinutes: true, totalQuestions: true },
          },
        },
        orderBy: { order: "asc" },
      });

      if (dbChapters && dbChapters.length > 0) {
        chapters = dbChapters as any;
      }
    } catch (dbErr) {
      // Prisma offline: use default chapters seamlessly
      console.warn("Prisma offline, serving fallback chapters dataset");
    }

    if (chapterSlug) {
      const single = chapters.find((c) => c.slug === chapterSlug);
      if (!single) {
        return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
      }
      return NextResponse.json({ chapter: single });
    }

    return NextResponse.json({ chapters });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
