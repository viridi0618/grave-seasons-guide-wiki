import fs from "node:fs";
import path from "node:path";

const mode = process.argv[2];
const root = process.cwd();
const guidesFile = fs.readFileSync(path.join(root, "src/data/guides.ts"), "utf8");
const routes = ["/","/release-date","/platforms","/switch","/ps5","/xbox","/game-pass","/demo","/characters","/romance","/killer-system","/gameplay"];
const slugs = [...guidesFile.matchAll(/\bslug:\s*"([^"]*)"/g)].map((m) => m[1]);
const internal = [...guidesFile.matchAll(/internalLinks:\s*\[([^\]]*)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
const readCode = (base) => fs.readdirSync(path.join(root,base), { recursive:true })
  .filter((f) => typeof f === "string" && /\.(tsx|ts)$/.test(f))
  .map((f) => fs.readFileSync(path.join(root,base,f),"utf8"));
const allText = [guidesFile, ...readCode("app"), ...readCode("src"), fs.readFileSync(path.join(root,"next.config.ts"),"utf8")].join("\n");
const fail = (message) => { console.error(`FAIL: ${message}`); process.exitCode = 1; };

if (slugs.length !== 12 || new Set(slugs).size !== 12) fail("Expected 12 unique guide slugs");
if (routes.some((route) => !slugs.includes(route === "/" ? "" : route.slice(1)))) fail("Route list does not match guide data");
if (internal.some((slug) => !slugs.includes(slug))) fail("Internal link points to a missing route");
if (/\/(download|android|apk|free|cracked|mobile-download|ios-download)(["'\/])/i.test(allText)) fail("Unsafe route found");
if (/Official Grave Seasons Wiki|official guide/i.test(allText)) fail("Affiliation wording found");
if ((allText.match(/"@type": "FAQPage"/g) || []).length !== 1) fail("FAQ schema implementation should exist once");
if (!allText.includes("https://graveseasonsguide.wiki")) fail("Canonical site URL missing");
if (!allText.includes("output: \"export\"")) fail("Static export is not configured");
if (!process.exitCode) console.log(`PASS ${mode || "all"}: 12 routes, valid links, cautious wording, canonical and schema checks`);
