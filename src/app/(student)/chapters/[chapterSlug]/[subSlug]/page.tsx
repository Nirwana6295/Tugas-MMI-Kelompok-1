import { redirect } from "next/navigation";

interface SubMaterialRedirectProps {
  params: {
    chapterSlug: string;
    subSlug: string;
  };
}

export default function SubMaterialRedirectPage({ params }: SubMaterialRedirectProps) {
  redirect(`/learn/${params.chapterSlug}/${params.subSlug}`);
}
