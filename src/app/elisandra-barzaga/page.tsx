import type { Metadata } from "next";
import { BusinessCard } from "@/components/business-card";
import { elisandraBarzagaContact as contact } from "@/config/elisandra-barzaga";

const title = `${contact.fullName} | ${contact.company}`;
const description = `Tarjeta digital de ${contact.fullName} | ${contact.company}`;
const previewImage = {
  url: new URL("/ecoverse/elisandra-social-preview.png", contact.productionUrl).href,
  width: 1200,
  height: 630,
  alt: `${contact.fullName} — EJECUTIVA DE VENTAS | ${contact.company}`,
};

export const metadata: Metadata = {
  metadataBase: new URL("/", contact.productionUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "profile",
    url: contact.productionUrl,
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
};

export default function ElisandraBarzagaPage() {
  return <BusinessCard contact={contact} />;
}
