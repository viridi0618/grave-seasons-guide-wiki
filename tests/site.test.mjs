import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
const routes = ["index.html","release-date/index.html","platforms/index.html","switch/index.html","ps5/index.html","xbox/index.html","game-pass/index.html","demo/index.html","characters/index.html","romance/index.html","killer-system/index.html","gameplay/index.html"];
test("all 12 static routes are exported", () => { for (const route of routes) assert.ok(fs.existsSync(path.join(out,route)), route); });
test("sitemap and robots are exported", () => { assert.ok(fs.existsSync(path.join(out,"sitemap.xml"))); assert.ok(fs.existsSync(path.join(out,"robots.txt"))); });
