import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Grave Seasons Wiki Guide: Release Date, Characters & Romance", template: "%s | Grave Seasons Guide Wiki" },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: SITE_NAME, type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Grave Seasons Guide Wiki" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
