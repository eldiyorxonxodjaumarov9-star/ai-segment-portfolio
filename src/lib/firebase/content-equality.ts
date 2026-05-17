import type { SiteContent } from "./types";

export function siteContentSignature(content: SiteContent): string {
  return JSON.stringify(content);
}

export function isSameSiteContent(a: SiteContent, b: SiteContent): boolean {
  return siteContentSignature(a) === siteContentSignature(b);
}
