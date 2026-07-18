/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Guide } from "@/src/data/guides";
import { getGuide } from "@/src/data/guides";
import { navigation } from "@/src/data/navigation";
import { absoluteUrl, resolveAssetUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/lib/site-config";

const sources = [
  { label: "Steam store", href: "https://store.steampowered.com/app/3255110/Grave_Seasons/" },
  { label: "Blumhouse Games", href: "https://www.blumhouse.com/games/grave-seasons" },
  { label: "Perfect Garbage", href: "https://www.perfectgarbage.com/grave-seasons" },
  { label: "PlayStation Store — Grave Seasons", href: "https://store.playstation.com/en-us/concept/10014259" },
  { label: "Xbox Store — Grave Seasons", href: "https://www.xbox.com/en-us/games/store/grave-seasons/9n36kgdxkm0s" },
  { label: "Nintendo — Grave Seasons Announcement Trailer", href: "https://www.youtube.com/watch?v=V6q7nLZ5Bbs" },
];

function Schema({ guide }: { guide: Guide }) {
  const path = guide.slug ? `/${guide.slug}` : "/";
  const graph: object[] = [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guide", item: absoluteUrl("/") },
      ...(guide.slug ? [{ "@type": "ListItem", position: 2, name: guide.h1, item: absoluteUrl(path) }] : []),
    ] },
    { "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];
  if (guide.slug) graph.unshift({ "@type": "Article", headline: guide.h1, description: guide.description, image: resolveAssetUrl(guide.image), dateModified: "2026-07-18", mainEntityOfPage: absoluteUrl(path), author: { "@type": "Organization", name: SITE_NAME } });
  else graph.unshift({ "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

function Header() {
  return <header className="site-header"><div className="shell brand-row">
    <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span>✦</span></span><span>Grave Seasons<br/>Guide Wiki</span></Link>
    <nav className="nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
  </div></header>;
}

function GuideCards({ guide }: { guide: Guide }) {
  const ids = guide.slug ? guide.internalLinks.slice(0, 4) : guide.internalLinks;
  return <div className="guide-grid">{ids.map((slug) => {
    const item = getGuide(slug);
    return <Link className="card" href={`/${slug}`} key={slug}>
      <img src={item.cardImage || item.image} alt="" width="460" height="200" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      <div className="card-body"><h3>{item.h1}</h3><p>{item.description}</p></div>
    </Link>;
  })}</div>;
}

export function GuidePage({ guide }: { guide: Guide }) {
  return <>
    <a href="#content" className="skip">Skip to content</a>
    <Header />
    <main id="content">
      <section className="hero" style={{ backgroundImage: `url("${guide.image}")` }}>
        <div className="shell hero-inner"><div className="eyebrow">{guide.eyebrow}</div><h1>{guide.h1}</h1><p className="lede">{guide.intro}</p>
          <div className="status-row"><span className="status"><strong>Current:</strong> Fall 2026</span><span className="status">Exact date: TBA</span><span className="status">Source checked: Jul 18, 2026</span></div>
        </div>
      </section>
      <div className="shell layout">
        <article className="content">
          <section aria-labelledby="quick-facts"><span className="eyebrow">At a glance</span><h2 id="quick-facts">Quick facts</h2><dl className="fact-grid">{guide.facts.map((fact) => <div className="fact" key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></section>
          {guide.slug === "" && <section><span className="eyebrow">Explore the evidence</span><h2>Quick navigation</h2><GuideCards guide={guide} /></section>}
          {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <section className="faq"><span className="eyebrow">Common questions</span><h2>FAQ</h2>{guide.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
          {guide.slug !== "" && <section><span className="eyebrow">Continue exploring</span><h2>Related guides</h2><GuideCards guide={guide} /></section>}
          <section className="sources"><span className="eyebrow">Source ledger</span><h2>Sources and official channels</h2><p className="source-note">Current publisher and store pages take priority over older announcement wording. Store listings can change before launch.</p><ul>{sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a></li>)}</ul><p className="updated">Last reviewed July 18, 2026</p></section>
        </article>
        <aside className="sidebar" aria-label="Guide sidebar">
          <div className="side-box"><h2>On this page</h2><ul>{guide.sections.map((section) => <li key={section.heading}>{section.heading}</li>)}</ul></div>
          <div className="side-box"><h2>Evidence rule</h2><p>Confirmed facts use current first-party sources. Missing details stay marked TBA or not announced.</p></div>
        </aside>
      </div>
    </main>
    <footer className="footer"><div className="shell footer-row"><p>Grave Seasons Guide Wiki is an independent fan-made guide site and is not affiliated with Perfect Garbage or Blumhouse Games. Grave Seasons is a trademark of its respective owner.</p><p>Source-led. Spoiler-light. Updated before launch.</p></div></footer>
    <Schema guide={guide} />
  </>;
}
