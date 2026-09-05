import Image from "next/image";
import { ArrowUpRight, Droplets, Globe2, HeartPulse, Leaf, MapPin, Phone, Quote, ShieldCheck } from "lucide-react";
import { FaGoogle, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CardActions } from "@/components/card-actions";
import { joseOfficeDisplay, joseOfficeMapUrl, type JoseContact } from "@/config/jose-noguera";
import cardStyles from "../page.module.css";
import styles from "./page.module.css";

const featureItems = [
  { title: "Agua alcalina", subtitle: "pH 10.5", icon: Droplets },
  { title: "Tecnología", subtitle: "De calidad", icon: ShieldCheck },
  { title: "Salud y bienestar", subtitle: "Para tu hogar", icon: HeartPulse },
  { title: "Sostenible", subtitle: "Y ecológico", icon: Leaf },
];

export function JoseCard({ contact }: { contact: JoseContact }) {
  const primaryActions = [
    { label: "Llamar ahora", subtitle: contact.phoneActionDisplay || contact.phone || "Número pendiente", icon: Phone, tone: "call", kind: "contact" as const, href: contact.phone ? `tel:${contact.phone}` : "" },
    { label: "WhatsApp directo", subtitle: contact.whatsapp ? "Escríbeme ahora" : "Disponible próximamente", icon: FaWhatsapp, tone: "whatsapp", kind: "contact" as const, href: contact.whatsapp },
  ];
  const discoveryLinks = [
    { label: contact.website.label, context: contact.website.context, url: contact.website.url, icon: Globe2, tone: "website", external: true },
    { label: contact.instagramEcoverse.label, context: contact.instagramEcoverse.context, url: contact.instagramEcoverse.url, icon: FaInstagram, tone: "instagram", external: true },
    { label: contact.instagramPersonal.label, context: contact.instagramPersonal.context, url: contact.instagramPersonal.url, icon: FaInstagram, tone: "instagram", external: true },
    { label: "Oficina Illinois", context: joseOfficeDisplay, url: joseOfficeMapUrl, icon: MapPin, tone: "location", external: true },
    { label: "Testimonios", context: "Experiencias de nuestros clientes", url: "", reviewUrl: contact.reviews.url, icon: Quote, tone: "google", external: false },
  ];

  return (
    <main className={cardStyles.page}>
      <article className={cardStyles.card} aria-labelledby="jose-name">
        <section className={cardStyles.hero}>
          <header className={cardStyles.logoHeader}><Image src="/ecoverse/logo-full.png" alt="ECOVERSE - Finest Water Technology" width={310} height={57} priority /></header>
          <CardActions contact={contact} />
          <a className={`${cardStyles.identity} ${styles.identityTrigger}`} href="/jose-noguera/perfil" aria-label={`${contact.fullName}, ${contact.jobTitle}. Abrir perfil y trayectoria`}>
            <h1 id="jose-name">{contact.fullName}</h1><h2>{contact.jobTitle}</h2><span className={cardStyles.titleLine} aria-hidden="true" /><span className={styles.portfolioCta} aria-hidden="true">Ver perfil y trayectoria ↗</span>
          </a>
          <div className={`${cardStyles.heroVisual} ${styles.heroVisual}`}><span className={cardStyles.accentShape} aria-hidden="true" /><Image src="/ecoverse/product.png" alt="Sistema de purificación de agua ECOVERSE, vista frontal" width={510} height={2154} priority /></div>
          <div className={cardStyles.primaryActions}>{primaryActions.map(({ label, subtitle, icon: Icon, tone, href }) =>
            <a className={`${cardStyles.primaryRow} ${styles.placeholderAction} ${styles.interactivePrimary}`} href={href} key={label} target={label.startsWith("WhatsApp") ? "_blank" : undefined} rel={label.startsWith("WhatsApp") ? "noopener noreferrer" : undefined} aria-label={`${label}: ${subtitle}`}>
              <span className={`${cardStyles.primaryIcon} ${cardStyles[tone]}`}><Icon aria-hidden="true" /></span><span><strong>{label}</strong><small>{subtitle}</small></span><span className={cardStyles.rowArrow}><ArrowUpRight aria-hidden="true" /></span>
            </a>)}</div>
        </section>
        <section className={cardStyles.discovery} aria-labelledby="discover-heading">
          <div className={cardStyles.sectionLabel}><span id="discover-heading">Conecta con ECOVERSE</span><span>02</span></div>
          <div className={cardStyles.discoveryList}>{discoveryLinks.map(({ label, context, url, reviewUrl, icon: Icon, tone, external }) => {
            const row = <><span className={`${cardStyles.discoveryIcon} ${tone ? cardStyles[tone] : ""}`}><Icon aria-hidden="true" /></span><span className={cardStyles.discoveryCopy}><strong>{label}</strong><small>{context}</small></span><span className={cardStyles.rowArrow}><ArrowUpRight aria-hidden="true" /></span></>;
            if (label === "Testimonios") return <div className={`${cardStyles.discoveryRow} ${styles.testimonialRow}`} key={label}>
              <a className={styles.testimonialAction} href="/jose-noguera/testimonios" aria-label="Testimonios: Experiencias de nuestros clientes">
                <span className={styles.testimonialActionInner}><span className={`${cardStyles.discoveryIcon} ${cardStyles.google}`}><Quote aria-hidden="true" /></span><span className={cardStyles.discoveryCopy}><strong>Testimonios</strong><small>Experiencias de nuestros clientes</small></span></span>
              </a>
              <a className={styles.testimonialAction} href={reviewUrl} target="_blank" rel="noopener noreferrer" aria-label="Reseñas: Ver reseñas en Google">
                <span className={styles.testimonialActionInner}><span className={`${cardStyles.discoveryIcon} ${cardStyles.google}`}><FaGoogle aria-hidden="true" /></span><span className={cardStyles.discoveryCopy}><strong>Reseñas</strong><small>Ver reseñas en Google</small></span></span>
              </a>
            </div>;
            if (!url) return <a className={cardStyles.discoveryRow} href="/jose-noguera/contacto" key={label} aria-label={`${label}: ${context}`}>{row}</a>;
            return <a className={cardStyles.discoveryRow} href={url} key={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${label}: ${context}${external ? " (abre en una pestaña nueva)" : ""}`}>{row}</a>;
          })}</div>
        </section>
        <section className={cardStyles.valueStrip} aria-label="Beneficios ECOVERSE">{featureItems.map(({ title, subtitle, icon: Icon }) => <div className={cardStyles.valueItem} key={title}><Icon aria-hidden="true" /><strong>{title}</strong><span>{subtitle}</span></div>)}</section>
        <footer className={cardStyles.footer}><Image src="/ecoverse/logo-full.png" alt="ECOVERSE - Finest Water Technology" width={250} height={46} /><a href={contact.website.url} target="_blank" rel="noopener noreferrer">{contact.website.displayDomain}</a></footer>
      </article>
    </main>
  );
}
