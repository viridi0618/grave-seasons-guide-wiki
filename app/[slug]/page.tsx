import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/src/components/GuidePage";
import { getGuide, guides } from "@/src/data/guides";
import { absoluteUrl } from "@/src/lib/site-config";

export const dynamicParams = false;
export function generateStaticParams() { return guides.filter((g) => g.slug).map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  const url = absoluteUrl(`/${slug}`);
  return { title: { absolute: guide.title }, description: guide.description, alternates: { canonical: url }, openGraph: { title: guide.title, description: guide.description, url, type: "article" } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <GuidePage guide={getGuide(slug)} />;
}
