import type { Metadata, Viewport } from "next";
import { contact } from "@/config/contact";
import "./globals.css";

const productionUrl = process.env.NEXT_PUBLIC_CARD_URL;
const socialImage = productionUrl ? new URL("/og.png", productionUrl).toString() : undefined;

export const metadata: Metadata = {
  title: `${contact.fullName} | ${contact.company}`,
  description: `Tarjeta digital de ${contact.fullName}, ${contact.jobTitle} en ${contact.company}.`,
  applicationName: "ECOVERSE Card",
  openGraph: {
    title: `${contact.fullName} | ${contact.company}`,
    description: `Tarjeta digital de ${contact.fullName}, ${contact.jobTitle} en ${contact.company}.`,
    type: "profile",
    images: socialImage ? [{ url: socialImage, width: 1731, height: 909, alt: `${contact.fullName} — ${contact.company}` }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `${contact.fullName} | ${contact.company}`,
    description: `Tarjeta digital de ${contact.fullName}, ${contact.jobTitle} en ${contact.company}.`,
    images: socialImage ? [socialImage] : undefined,
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050607", colorScheme: "dark light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es"><body>{children}</body></html>;
}
