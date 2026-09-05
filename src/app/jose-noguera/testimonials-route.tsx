import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/config/jose-noguera";
import styles from "./experience-route.module.css";

export function TestimonialsRoute({ items, index = 0 }: { items: Testimonial[]; index?: number }) {
  const safeIndex = items.length ? ((index % items.length) + items.length) % items.length : 0;
  const current = items[safeIndex];
  const previous = items.length ? ((safeIndex - 1 + items.length) % items.length) + 1 : 1;
  const next = items.length ? ((safeIndex + 1) % items.length) + 1 : 1;

  return <main className={styles.page}><section className={styles.sheet}>
    <div className={styles.handle} aria-hidden="true" />
    <header className={styles.header}><div><span>JOSÉ NOGUERA · ECOVERSE</span><h1>Experiencias</h1></div><a className={styles.back} href="/jose-noguera" aria-label="Volver a la tarjeta de José Noguera" /></header>
    {current && <>
      <Image className={styles.testimonialImage} src={current.image} alt="Experiencia de cliente" width={720} height={480} priority />
      <span className={styles.testimonialLabel}>Experiencia de cliente</span>
      {current.quote && <blockquote className={styles.testimonial}>{current.quote}</blockquote>}
      <div className={styles.attribution}><span aria-hidden="true" /><div><strong>{current.name || "Cliente ECOVERSE"}</strong>{current.context && <small>{current.context}</small>}</div></div>
      <div className={styles.navigation}><span>{String(safeIndex + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span></span><div><a className={styles.navigationLink} href={`/jose-noguera/testimonios?slide=${previous}`} aria-label="Testimonio anterior"><ArrowLeft aria-hidden="true" /></a><a className={styles.navigationLink} href={`/jose-noguera/testimonios?slide=${next}`} aria-label="Siguiente testimonio"><ArrowRight aria-hidden="true" /></a></div></div>
    </>}
  </section></main>;
}
