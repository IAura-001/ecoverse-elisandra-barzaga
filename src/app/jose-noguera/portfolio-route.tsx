import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/config/jose-noguera";
import styles from "./experience-route.module.css";

export function PortfolioRoute({ items, index = 0 }: { items: PortfolioItem[]; index?: number }) {
  const safeIndex = items.length ? ((index % items.length) + items.length) % items.length : 0;
  const current = items[safeIndex];
  const previous = items.length ? ((safeIndex - 1 + items.length) % items.length) + 1 : 1;
  const next = items.length ? ((safeIndex + 1) % items.length) + 1 : 1;

  return <main className={styles.page}><section className={styles.sheet}>
    <div className={styles.handle} aria-hidden="true" />
    <header className={styles.header}><div><span>JOSÉ NOGUERA · ECOVERSE</span><h1>Perfil y trayectoria</h1></div><a className={styles.back} href="/jose-noguera" aria-label="Volver a la tarjeta de José Noguera" /></header>
    {current && <>
      <Image className={styles.media} src={current.image} alt={current.title} width={720} height={960} priority />
      <div className={styles.content}><span className={styles.category}>{current.category}</span><h2>{current.title}</h2><p>{current.description}</p>{(current.location || current.date) && <small>{[current.location, current.date].filter(Boolean).join(" · ")}</small>}</div>
      <div className={styles.navigation}><span>{String(safeIndex + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span></span><div><a className={styles.navigationLink} href={`/jose-noguera/perfil?slide=${previous}`} aria-label="Perfil anterior"><ArrowLeft aria-hidden="true" /></a><a className={styles.navigationLink} href={`/jose-noguera/perfil?slide=${next}`} aria-label="Siguiente perfil"><ArrowRight aria-hidden="true" /></a></div></div>
    </>}
  </section></main>;
}
