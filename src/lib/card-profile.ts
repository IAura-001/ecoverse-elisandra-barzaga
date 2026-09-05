import type { ContactConfig } from "../config/contact";

export type CardContact = Pick<ContactConfig,
  "fullName" | "company" | "jobTitle" | "phone" | "email" | "website" | "productionUrl"
> & { slug?: string; profileUrl?: string; address?: string };

export const LEGACY_CARD_URL = "https://ecoverse-francis-card.vercel.app";

// A legacy full-card URL supplies only the origin for a new profile.
// Always replace its path, query and hash so another person's route cannot leak.
export function resolveProfileUrl(path: string, ...candidates: (string | undefined)[]) {
  for (const candidate of [...candidates, LEGACY_CARD_URL]) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (!["https:", "http:"].includes(url.protocol) || !url.hostname.includes(".") || /TU-URL-PUBLICA-AQUI/i.test(url.hostname)) continue;
      return new URL(path, url.origin).href;
    } catch { /* Try the next configured origin. */ }
  }
  throw new Error("No valid card origin");
}

function escapeVCard(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}

export function makeVCard(contact: CardContact) {
  const parts = contact.fullName.trim().split(/\s+/);
  const family = parts.pop() ?? "";
  const lines = [
    "BEGIN:VCARD", "VERSION:3.0",
    `N:${escapeVCard(family)};${escapeVCard(parts.join(" "))};;;`,
    `FN:${escapeVCard(contact.fullName)}`,
    `ORG:${escapeVCard(contact.company)}`,
    `TITLE:${escapeVCard(contact.jobTitle)}`,
  ];
  if (contact.phone) lines.push(`TEL;TYPE=CELL,VOICE:${escapeVCard(contact.phone)}`);
  const url = contact.profileUrl || contact.website.url;
  if (url) lines.push(`URL:${escapeVCard(url)}`);
  if (contact.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(contact.email)}`);
  if (contact.address) lines.push(`ADR;TYPE=WORK:;;${escapeVCard(contact.address)};;;;`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}
