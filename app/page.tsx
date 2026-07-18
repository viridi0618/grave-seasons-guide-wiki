import type { Metadata } from "next";
import { GuidePage } from "@/src/components/GuidePage";
import { getGuide } from "@/src/data/guides";
import { absoluteUrl } from "@/src/lib/site-config";

const guide = getGuide("");

export const metadata: Metadata = {
  title: { absolute: guide.title },
  description: guide.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: guide.title, description: guide.description, url: absoluteUrl("/"), type: "website" },
};

export default function Home() {
  return <GuidePage guide={guide} />;
}
