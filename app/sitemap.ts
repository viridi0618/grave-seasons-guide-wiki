import type { MetadataRoute } from "next";
import { guides } from "@/src/data/guides";
import { absoluteUrl } from "@/src/lib/site-config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return guides.map((g) => ({ url: absoluteUrl(g.slug ? `/${g.slug}/` : "/"), lastModified: new Date("2026-07-18"), changeFrequency: "weekly", priority: g.slug ? .8 : 1 })); }
