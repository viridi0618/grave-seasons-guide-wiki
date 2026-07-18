# Grave Seasons Guide Wiki

Independent, source-led pre-launch guide for Grave Seasons. The MVP contains exactly 12 statically exported routes covering the release window, platforms, demo status, characters, romance, killer system, and gameplay.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run check:seo
npm run check:links
npm run check:data
node --test tests/site.test.mjs
```

Production canonicals and sitemap URLs use `https://graveseasonsguide.wiki`.
