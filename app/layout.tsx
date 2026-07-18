import type { Metadata } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Grave Seasons Wiki Guide: Release Date, Characters & Romance", template: "%s | Grave Seasons Guide Wiki" },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: SITE_NAME, type: "website", images: [{ url: SITE_URL + "/og.png", width: 1200, height: 630, alt: "Grave Seasons Guide Wiki" }] },
  twitter: { card: "summary_large_image", images: [SITE_URL + "/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
        <meta name="google-site-verification" content="rNep-Mx67PHaSLZXA8YhBlz5_lH2gZEu--B4Tiwoh3o" />
        <meta property="og:image" content="https://graveseasonsguide.wiki/og.png" />
        <meta name="twitter:image" content="https://graveseasonsguide.wiki/og.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J7FCYC72MM"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-J7FCYC72MM");`,
        }} />
      </head><body>{children}</body></html>;
}
