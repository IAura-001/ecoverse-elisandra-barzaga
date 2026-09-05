import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { JoseCard } from "./jose-card";

export const metadata: Metadata = {
  title: `${contact.fullName} | ECOVERSE`,
  description: "José Noguera · Regional Manager en ECOVERSE",
  alternates: { canonical: contact.profileUrl },
  openGraph: {
    title: `${contact.fullName} | ECOVERSE`,
    description: "Regional Manager · ECOVERSE",
    type: "profile",
    url: contact.profileUrl,
    images: [contact.portrait],
  },
  twitter: {
    card: "summary",
    title: `${contact.fullName} | ECOVERSE`,
    description: "Regional Manager · ECOVERSE",
    images: [contact.portrait],
  },
};

export default function Home() {
  return <JoseCard contact={contact} />;
}
