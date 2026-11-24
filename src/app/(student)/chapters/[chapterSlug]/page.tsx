import { redirect } from "next/navigation";

interface ChapterPageProps {
  params: {
    chapterSlug: string;
  };
}

export default function ChapterIndexPage({ params }: ChapterPageProps) {
  // Map chapter slug to its first sub-material default
  const defaultSubSlug: Record<string, string> = {
    litosfer: "struktur-lapisan-bumi",
    pedosfer: "proses-faktor-pembentuk-tanah",
    atmosfer: "lapisan-atmosfer-suhu",
    hidrosfer: "siklus-hidrologi",
    biosfer: "faktor-persebaran-bioma",
    antroposfer: "dinamika-kependudukan-piramida",
  };

  const targetSub = defaultSubSlug[params.chapterSlug] || "struktur-lapisan-bumi";
  redirect(`/learn/${params.chapterSlug}/${targetSub}`);
}
