import type { Metadata } from "next";
import { BusinessCard } from "@/components/business-card";
import { elisandraBarzagaContact as contact } from "@/config/elisandra-barzaga";

const title = `${contact.fullName} | ${contact.company}`;
const description = `Tarjeta digital de ${contact.fullName} | ${contact.company}`;

export const metadata: Metadata = {
  metadataBase: new URL("/", contact.productionUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "profile",
    url: contact.productionUrl,
    images: [{ url: "/ecoverse/logo-full.png", alt: contact.company }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/ecoverse/logo-full.png"],
  },
};

export default function ElisandraBarzagaPage() {
  return <BusinessCard contact={contact} />;
}
