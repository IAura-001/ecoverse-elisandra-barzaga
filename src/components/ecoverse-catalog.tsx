import { ArrowUpRight, BookOpen } from "lucide-react";
import styles from "./ecoverse-catalog.module.css";

export function EcoverseCatalog() {
  return (
    <section className={styles.section} aria-labelledby="catalog-heading">
      <div className={styles.card}>
        <BookOpen className={styles.icon} aria-hidden="true" />
        <h2 id="catalog-heading">CATÁLOGO ECOVERSE</h2>
        <p>Conoce nuestros sistemas, tecnología y soluciones para el tratamiento del agua.</p>
        <a className={styles.cta} href="/ecoverse/catalogo-ecoverse-elite-es.pdf" target="_blank" rel="noopener noreferrer">
          <span>VER CATÁLOGO COMPLETO</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
