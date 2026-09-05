"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Phone, Quote, Star, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { JoseContact } from "@/config/jose-noguera";
import styles from "./profile-sheet.module.css";

export function ProfileSheet({ kind, contact, onClose }: {
  kind: "contact" | "testimonials"; contact: JoseContact; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const testimonials = contact.testimonials;
  const safeIndex = testimonials.length ? Math.min(index, testimonials.length - 1) : 0;
  const current = testimonials[safeIndex];
  const rating = current?.rating == null ? null : Math.min(5, Math.max(0, current.rating));

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    closeButton.current?.focus();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  function navigate(direction: number) {
    if (!testimonials.length) return;
    setIndex((safeIndex + direction + testimonials.length) % testimonials.length);
  }

  return (
    <dialog ref={dialog} className={styles.overlay} aria-labelledby="profile-sheet-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={styles.sheet}>
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div><span>JOSÉ NOGUERA · ECOVERSE</span><h2 id="profile-sheet-title">{kind === "testimonials" ? "Experiencias" : "Contacto directo"}</h2></div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Cerrar"><X aria-hidden="true" /></button>
        </header>
        {kind === "testimonials" ? <>
          <div className={styles.testimonial}
            onTouchStart={(event) => { const touch = event.touches[0]; start.current = { x: touch.clientX, y: touch.clientY }; }}
            onTouchCancel={() => { start.current = null; }}
            onTouchEnd={(event) => {
              const touch = event.changedTouches[0];
              if (start.current) {
                const dx = touch.clientX - start.current.x;
                const dy = touch.clientY - start.current.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) navigate(dx < 0 ? 1 : -1);
              }
              start.current = null;
            }}>
            {current ? <>
              <Image className={styles.testimonialImage} src={current.image} alt="Experiencia de cliente" width={720} height={480} />
              <p className={styles.preview}>Experiencia de cliente</p>
              <div aria-live="polite" aria-atomic="true">
                {current.quote ? <blockquote>{current.quote}</blockquote> : <p className={styles.neutralCopy}>Información de la experiencia próximamente.</p>}
                {rating !== null && <div className={styles.rating} aria-label={`${rating} de 5 estrellas`}><Star size={14} fill="currentColor" aria-hidden="true" /><span>{rating} / 5</span></div>}
                {(current.name || current.context) && <div className={styles.attribution}><span aria-hidden="true" /><div>{current.name && <strong>{current.name}</strong>}{current.context && <small>{current.context}</small>}</div></div>}
              </div>
            </> : <>
              <Quote className={styles.quoteMark} aria-hidden="true" />
              <p className={styles.preview}>Experiencia de cliente</p>
              <p className={styles.neutralCopy}>La experiencia estará disponible próximamente.</p>
            </>}
          </div>
          <div className={styles.navigation}>
            <span aria-live="polite">{testimonials.length ? String(safeIndex + 1).padStart(2, "0") : "00"} <span>/ {String(testimonials.length).padStart(2, "0")}</span></span>
            <div><button type="button" disabled={testimonials.length < 2} onClick={() => navigate(-1)} aria-label="Testimonio anterior"><ArrowLeft aria-hidden="true" /></button><button type="button" disabled={testimonials.length < 2} onClick={() => navigate(1)} aria-label="Siguiente testimonio"><ArrowRight aria-hidden="true" /></button></div>
          </div>
          <p className={styles.note}>Solo se mostrarán experiencias e imágenes autorizadas.</p>
        </> : <>
          <p className={styles.intro}>{contact.biography || "Regional Manager · ECOVERSE. Biografía profesional próximamente."}</p>
          <div className={styles.contacts}>
            {[
              { label: "Teléfono", value: contact.phoneActionDisplay || contact.phoneDisplay || contact.phone, href: contact.phone ? `tel:${contact.phone}` : "", icon: Phone },
              { label: "WhatsApp", value: contact.whatsapp ? "Enviar mensaje" : "", href: contact.whatsapp, icon: FaWhatsapp },
              { label: "Correo electrónico", value: contact.email, href: contact.email ? `mailto:${contact.email}` : "", icon: Mail },
            ].map(({ label, value, href, icon: Icon }) => {
              const content = <><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{value || "Próximamente"}</small></span></>;
              return href ? <a key={label} href={href}>{content}</a> : <div key={label}>{content}</div>;
            })}
            {contact.socialLinks.length ? contact.socialLinks.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>) : <p className={styles.note}>Redes sociales · Próximamente</p>}
          </div>
          <p className={styles.note}>QR, compartir y guardar contacto están disponibles en el menú de la tarjeta.</p>
        </>}
      </section>
    </dialog>
  );
}
