import type { Metadata } from "next";
import { joseContact as contact } from "@/config/jose-noguera";
import { ContactRoute } from "../contact-route";

export const metadata: Metadata = { title: `Contacto | ${contact.fullName} | ECOVERSE`, description: "Contacto y tarjeta digital de José Noguera." };
export default function JoseContactoPage() { return <ContactRoute contact={contact} />; }
