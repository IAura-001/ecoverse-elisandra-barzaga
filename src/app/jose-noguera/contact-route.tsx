"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { FaAddressCard } from "react-icons/fa";
import QRCode from "qrcode";
import { LEGACY_CARD_URL, makeVCard } from "@/lib/card-profile";
import type { JoseContact } from "@/config/jose-noguera";
import styles from "./experience-route.module.css";

export function ContactRoute({ contact }: { contact: JoseContact }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copiar enlace");
  const cardUrl = contact.productionUrl || LEGACY_CARD_URL;
  const vCard = useMemo(() => makeVCard(contact), [contact]);
  useEffect(() => { QRCode.toDataURL(cardUrl, { width: 720, margin: 3, color: { dark: "#050607", light: "#ffffff" }, errorCorrectionLevel: "H" }).then(setQrDataUrl).catch(() => setQrDataUrl("")); }, [cardUrl]);
  function saveContact() { const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${contact.slug || "jose-noguera"}-ecoverse.vcf`; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 0); }
  async function copyUrl() { if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(cardUrl); setCopyLabel("Enlace copiado"); window.setTimeout(() => setCopyLabel("Copiar enlace"), 1800); }
  async function shareCard() { if (navigator.share) await navigator.share({ title: `${contact.fullName} | ${contact.company}`, text: `${contact.jobTitle} en ${contact.company}`, url: cardUrl }); else await copyUrl(); }

  return <main className={styles.page}><section className={styles.sheet}>
    <div className={styles.handle} aria-hidden="true" />
    <header className={styles.header}><div><span>JOSÉ NOGUERA · ECOVERSE</span><h1>Mi tarjeta digital</h1></div><a className={styles.back} href="/jose-noguera" aria-label="Volver a la tarjeta de José Noguera" /></header>
    <div className={styles.qr}>{qrDataUrl && <Image src={qrDataUrl} alt={`Código QR para la tarjeta de ${contact.fullName}`} width={182} height={182} unoptimized />}</div>
    <div className={styles.actions}>
      <button type="button" onClick={saveContact}><span className={styles.actionIcon}><FaAddressCard aria-hidden="true" /></span><span><strong>Guardar contacto</strong><small>Agregar a tus contactos</small></span></button>
      <button type="button" onClick={shareCard}><span className={styles.actionIcon}><Share2 aria-hidden="true" /></span><span><strong>Compartir tarjeta</strong><small>Enviar por WhatsApp y más</small></span></button>
      <button type="button" onClick={copyUrl}><span className={styles.actionIcon}>{copyLabel === "Enlace copiado" ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}</span><span><strong>{copyLabel}</strong><small>{cardUrl.replace("https://", "")}</small></span></button>
    </div>
  </section></main>;
}
