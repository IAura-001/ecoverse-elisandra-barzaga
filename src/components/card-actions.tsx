"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Link2, MoreHorizontal, Share2, X } from "lucide-react";
import { FaAddressCard } from "react-icons/fa";
import QRCode from "qrcode";
import { LEGACY_CARD_URL, makeVCard, type CardContact } from "@/lib/card-profile";
import styles from "./card-actions.module.css";

export function CardActions({ contact }: { contact: CardContact }) {
  const [open, setOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copiar enlace");
  const vCard = useMemo(() => makeVCard(contact), [contact]);
  const cardUrl = contact.productionUrl || LEGACY_CARD_URL;

  useEffect(() => {
    QRCode.toDataURL(cardUrl, {
      width: 720,
      margin: 3,
      color: { dark: "#050607", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [cardUrl]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function saveContact() {
    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contact.slug || "francis-lucena"}-ecoverse.vcf`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  async function copyUrl() {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(cardUrl);
    else {
      const field = document.createElement("textarea");
      field.value = cardUrl;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopyLabel("Enlace copiado");
    window.setTimeout(() => setCopyLabel("Copiar enlace"), 1800);
  }

  async function shareCard() {
    try {
      if (navigator.share) await navigator.share({ title: `${contact.fullName} | ${contact.company}`, text: `${contact.jobTitle} en ${contact.company}`, url: cardUrl });
      else await copyUrl();
    } catch { /* Dismissing the native share sheet is not an error. */ }
  }

  const sheet = open ? createPortal(
    <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="utility-title">
        <span className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div><span>ECOVERSE</span><h2 id="utility-title">Mi tarjeta digital</h2></div>
          <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X aria-hidden="true" /></button>
        </header>

        <div className={styles.qrSection}>
          <div className={styles.qrFrame}>{qrDataUrl && <Image src={qrDataUrl} alt={`Código QR para la tarjeta de ${contact.fullName}`} width={196} height={196} unoptimized />}</div>
          <strong>Escanea para abrir mi tarjeta</strong>
          <small>{contact.fullName} · {contact.company}</small>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={saveContact}><span className={styles.actionIcon}><FaAddressCard aria-hidden="true" /></span><span><strong>Guardar contacto</strong><small>Agregar a tus contactos</small></span></button>
          <button type="button" onClick={shareCard}><span className={styles.actionIcon}><Share2 aria-hidden="true" /></span><span><strong>Compartir tarjeta</strong><small>Enviar por WhatsApp y más</small></span></button>
          <button type="button" onClick={copyUrl}><span className={styles.actionIcon}>{copyLabel === "Enlace copiado" ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}</span><span><strong>{copyLabel}</strong><small>{cardUrl.replace("https://", "")}</small></span></button>
        </div>
      </section>
    </div>, document.body) : null;

  return <div className={styles.utility}>
    <button className={styles.trigger} type="button" onClick={() => setOpen(true)} aria-label="Abrir menú de tarjeta"><MoreHorizontal aria-hidden="true" /></button>
    {sheet}
  </div>;
}
