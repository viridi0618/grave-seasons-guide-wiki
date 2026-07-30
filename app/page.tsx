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
  return <>
    <GuidePage guide={guide} />
    {/* Directory badges — homepage only */}
    <section style={{ paddingTop: "24px", paddingBottom: "32px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "center" }}>
      <a href="https://artificin.com?utm_source=badge&utm_medium=referral&utm_campaign=featured_badge" target="_blank" rel="noopener"><img src="https://artificin.com/badges/Artificin-badge.png" alt="Featured on Artificin" style={{ border: "none", width: "175px", height: "50px" }} /></a>
      <a href="https://findly.tools/grave-seasons?utm_source=grave-seasons" target="_blank" rel="noopener noreferrer"><img src="https://findly.tools/badges/findly-tools-badge-light.svg" alt="Featured on Findly.tools" width="150" /></a>
      <a href="https://startupfa.me/s/grave-seasons?utm_source=graveseasonsguide.wiki" target="_blank" rel="noopener noreferrer"><img src="https://startupfa.me/badges/featured/default-small-rounded.webp" alt="Grave Seasons - Featured on Startup Fame" width="240" height="37" /></a>
    </section>
  </>;
}
