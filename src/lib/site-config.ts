export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://graveseasonsguide.wiki";
export const SITE_NAME = "Grave Seasons Guide Wiki";
export const SITE_DESCRIPTION = "An independent, source-led Grave Seasons guide wiki covering the Fall 2026 release window, platforms, characters, romance, killer system, gameplay, and confirmed pre-launch information.";
export const DEFAULT_IMAGE = "/og.png";
export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
export const resolveAssetUrl = (path?: string) => {
  const value = path || DEFAULT_IMAGE;
  if (value.startsWith("http")) return value;
  return absoluteUrl(value.startsWith("/") ? value : `/${value}`);
};
