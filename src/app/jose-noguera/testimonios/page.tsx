import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { TestimonialsRoute } from "../testimonials-route";

export const metadata: Metadata = { title: `Experiencias | ${contact.fullName} | ECOVERSE`, description: "Experiencias de clientes de ECOVERSE." };
export default async function JoseTestimonialsPage({ searchParams }: { searchParams: Promise<{ slide?: string }> }) {
	const value = Number((await searchParams).slide ?? "1");
	return <TestimonialsRoute items={contact.testimonials} index={Number.isFinite(value) ? value - 1 : 0} />;
}
