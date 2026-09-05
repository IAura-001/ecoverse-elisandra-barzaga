import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { PortfolioRoute } from "../portfolio-route";

export const metadata: Metadata = { title: `Perfil y trayectoria | ${contact.fullName} | ECOVERSE`, description: "Perfil profesional y trayectoria de José Noguera." };
export default async function JosePerfilPage({ searchParams }: { searchParams: Promise<{ slide?: string }> }) {
	const value = Number((await searchParams).slide ?? "1");
	return <PortfolioRoute items={contact.portfolio} index={Number.isFinite(value) ? value - 1 : 0} />;
}
