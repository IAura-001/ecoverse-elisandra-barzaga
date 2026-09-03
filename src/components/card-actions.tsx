"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Download, MoreHorizontal, QrCode, Share2, X } from "lucide-react";
import { FaAddressCard } from "react-icons/fa";
import QRCode from "qrcode";
import type { ContactConfig } from "@/config/contact";
import styles from "./card-actions.module.css";

function escapeVCard(value: string) { return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
function makeVCard(contact: ContactConfig) {
  const parts = contact.fullName.trim().split(/\s+/); const family = parts.pop() ?? "";
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:${escapeVCard(family)};${escapeVCard(parts.join(" "))};;;`, `FN:${escapeVCard(contact.fullName)}`, `ORG:${escapeVCard(contact.company)}`];
  if (contact.jobTitle) lines.push(`TITLE:${escapeVCard(contact.jobTitle)}`);
  if (contact.phone) lines.push(`TEL;TYPE=CELL,VOICE:${escapeVCard(contact.phone)}`);
  if (contact.website) lines.push(`URL:${escapeVCard(contact.website.url)}`);
  lines.push("END:VCARD"); return lines.join("\r\n");
}

export function CardActions({ contact }: { contact: ContactConfig }) {
  const [open, setOpen] = useState(false); const [qrDataUrl, setQrDataUrl] = useState(""); const [shareLabel, setShareLabel] = useState("Compartir");
  const vCard = useMemo(() => makeVCard(contact), [contact]);
  useEffect(() => { const url = contact.productionUrl || window.location.href; QRCode.toDataURL(url, { width: 480, margin: 2, color: { dark: "#050607", light: "#ffffff" }, errorCorrectionLevel: "H" }).then(setQrDataUrl).catch(() => setQrDataUrl("")); }, [contact.productionUrl]);
  function saveContact() { const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "francis-lucena-ecoverse.vcf"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 0); }
  async function shareCard() { const url = contact.productionUrl || window.location.href; try { if (navigator.share) await navigator.share({ title: `${contact.fullName} | ${contact.company}`, url }); else { await navigator.clipboard.writeText(url); setShareLabel("Enlace copiado"); window.setTimeout(() => setShareLabel("Compartir"), 1800); } } catch { /* The native share sheet may be dismissed. */ } }
  return <div className={styles.utility}>
    <button className={styles.trigger} type="button" onClick={() => setOpen(true)} aria-label="Guardar o compartir tarjeta"><MoreHorizontal aria-hidden="true" /></button>
    {open && <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="utility-title">
        <header><div><span>Tarjeta digital</span><h2 id="utility-title">Guardar y compartir</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Cerrar"><X aria-hidden="true" /></button></header>
        <div className={styles.actions}><button type="button" onClick={saveContact}><FaAddressCard aria-hidden="true" /><span>Guardar contacto</span></button><button type="button" onClick={shareCard}><Share2 aria-hidden="true" /><span>{shareLabel}</span></button></div>
        {qrDataUrl && <div className={styles.qr}><Image src={qrDataUrl} alt={`Código QR para la tarjeta digital de ${contact.fullName}`} width={116} height={116} unoptimized /><div><QrCode aria-hidden="true" /><strong>Compartir por QR</strong><small>Escanea para abrir esta tarjeta.</small><a href={qrDataUrl} download="francis-lucena-ecoverse-qr.png"><Download aria-hidden="true" />Descargar QR</a></div></div>}
      </section>
    </div>}
  </div>;
}
