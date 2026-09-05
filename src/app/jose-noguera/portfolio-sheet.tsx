"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { PortfolioItem } from "@/config/jose-noguera";
import styles from "./portfolio-sheet.module.css";

export function PortfolioSheet({ items, onClose }: { items: PortfolioItem[]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const safeIndex = items.length ? Math.min(index, items.length - 1) : 0;
  const current = items[safeIndex];

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
    if (!items.length) return;
    setIndex((safeIndex + direction + items.length) % items.length);
  }

  return (
    <dialog ref={dialog} className={styles.overlay} aria-labelledby="portfolio-sheet-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={styles.sheet}>
        <div className={styles.handle} aria-hidden="true" />
        <header className={styles.header}>
          <div><span>JOSÉ NOGUERA · ECOVERSE</span><h2 id="portfolio-sheet-title">Perfil y trayectoria</h2></div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Cerrar"><X aria-hidden="true" /></button>
        </header>
        {current && <>
          <div className={styles.media} onTouchStart={(event) => { const touch = event.touches[0]; start.current = { x: touch.clientX, y: touch.clientY }; }}
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
            <Image src={current.image} alt={current.title} width={720} height={960} priority={safeIndex === 0} />
          </div>
          <div className={styles.content} aria-live="polite" aria-atomic="true">
            <span className={styles.category}>{current.category}</span>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            {(current.location || current.date) && <small>{[current.location, current.date].filter(Boolean).join(" · ")}</small>}
          </div>
          <div className={styles.navigation}>
            <span aria-live="polite">{String(safeIndex + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span></span>
            <div><button type="button" disabled={items.length < 2} onClick={() => navigate(-1)} aria-label="Perfil anterior"><ArrowLeft aria-hidden="true" /></button><button type="button" disabled={items.length < 2} onClick={() => navigate(1)} aria-label="Siguiente perfil"><ArrowRight aria-hidden="true" /></button></div>
          </div>
        </>}
      </section>
    </dialog>
  );
}
