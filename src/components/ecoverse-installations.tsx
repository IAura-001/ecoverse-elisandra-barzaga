"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { elisandraInstallations, type InstallationMedia } from "@/config/elisandra-installations";
import styles from "./ecoverse-installations.module.css";

export function EcoverseInstallations() {
  const [selected, setSelected] = useState<InstallationMedia | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section className={styles.section} aria-labelledby="installations-heading">
      <h2 id="installations-heading">INSTALACIONES ECOVERSE</h2>
      <p className={styles.subtitle}>Equipos instalados en hogares reales</p>
      <div className={styles.gallery}>
        {elisandraInstallations.map((media, index) => (
          <button
            key={media.src}
            className={styles.thumbnail}
            type="button"
            onClick={() => setSelected(media)}
            aria-label={`Abrir ${media.type === "image" ? "foto" : "video"} de instalación ${index + 1}`}
            aria-haspopup="dialog"
          >
            {media.type === "image" ? (
              <Image src={media.src} alt={`Instalación ECOVERSE ${index + 1}`} fill sizes="(max-width: 679px) 45vw, 190px" className={styles.photo} />
            ) : (
              <>
                <video src={media.src} preload="metadata" muted playsInline className={styles.preview} aria-hidden="true" tabIndex={-1} />
                <span className={styles.play}><Play aria-hidden="true" /><span>VIDEO</span></span>
              </>
            )}
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Instalación ECOVERSE"
        onCancel={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
      >
        <div className={styles.modal}>
          <button className={styles.close} type="button" onClick={() => setSelected(null)} aria-label="Cerrar instalación" autoFocus>
            <X aria-hidden="true" />
          </button>
          {selected?.type === "image" && (
            <div className={styles.fullImage}>
              <Image src={selected.src} alt="Instalación ECOVERSE ampliada" fill sizes="(max-width: 960px) 95vw, 960px" className={styles.contain} />
            </div>
          )}
          {selected?.type === "video" && (
            <video key={selected.src} src={selected.src} controls playsInline preload="metadata" className={styles.video} />
          )}
        </div>
      </dialog>
    </section>
  );
}
