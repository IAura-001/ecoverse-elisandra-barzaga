import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Droplets, Globe2, HeartPulse, Leaf, MapPin, Phone, ShieldCheck } from "lucide-react";
import { FaGoogle, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CardActions } from "@/components/card-actions";
import type { ContactConfig } from "@/config/contact";
import styles from "@/app/page.module.css";

export function BusinessCard({ contact, beforeFooter }: { contact: ContactConfig; beforeFooter?: ReactNode }) {
  const primaryActions = [
    { label: "Llamar ahora", subtitle: contact.phoneActionDisplay, href: `tel:${contact.phone}`, icon: Phone, external: false, tone: "call" },
    { label: "WhatsApp directo", subtitle: "Escríbeme ahora", href: contact.whatsapp, icon: FaWhatsapp, external: true, tone: "whatsapp" },
  ];
  const discoveryLinks = [
    { ...contact.website, icon: Globe2, tone: "website" },
    { ...contact.instagramEcoverse, icon: FaInstagram, tone: "instagram" },
    { ...contact.instagramPersonal, icon: Droplets, tone: "water" },
    { ...contact.officeLocation, icon: MapPin, tone: "location" },
    { ...contact.reviews, icon: FaGoogle, tone: "google" },
  ];
  const featureIcons = [Droplets, ShieldCheck, HeartPulse, Leaf];

  return <main className={styles.page}><article className={`${styles.card} ${contact.features.length === 0 ? styles.cardWithoutFeatures : ""} ${beforeFooter ? styles.cardWithTechnology : ""}`} aria-labelledby="card-name">
    <section className={styles.hero}>
      <header className={styles.logoHeader}><Image src="/ecoverse/logo-full.png" alt="ECOVERSE - Finest Water Technology" width={310} height={57} priority /></header>
      <CardActions contact={contact} />
      <div className={`${styles.identity} ${!contact.jobTitle ? styles.identityWithoutTitle : ""}`}><h1 id="card-name">{contact.fullName}</h1>{contact.jobTitle && <h2>{contact.jobTitle}</h2>}<span className={styles.titleLine} aria-hidden="true" /></div>
      <div className={styles.heroVisual}><span className={styles.accentShape} aria-hidden="true" /><Image src="/ecoverse/product.png" alt="Sistema de purificación de agua ECOVERSE, vista frontal" width={510} height={2154} priority /></div>
      <div className={styles.primaryActions}>{primaryActions.map(({ label, subtitle, href, icon: Icon, external, tone }) =>
        <a className={styles.primaryRow} href={href} key={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${label}: ${subtitle}`}>
          <span className={`${styles.primaryIcon} ${styles[tone]}`}><Icon aria-hidden="true" /></span><span><strong>{label}</strong><small>{subtitle}</small></span><span className={styles.rowArrow}><ArrowUpRight aria-hidden="true" /></span>
        </a>)}</div>
    </section>
    <section className={styles.discovery} aria-labelledby="discover-heading">
      <div className={styles.sectionLabel}><span id="discover-heading">Conecta con ECOVERSE</span><span>02</span></div>
      <div className={styles.discoveryList}>{discoveryLinks.map(({ label, context, detail, url, icon: Icon, tone }) =>
        <a className={styles.discoveryRow} href={url} key={label} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${context} (abre en una pestaña nueva)`}>
          <span className={`${styles.discoveryIcon} ${styles[tone]}`}><Icon aria-hidden="true" /></span><span className={styles.discoveryCopy}><strong>{label}</strong><small>{context}</small>{detail && <small>{detail}</small>}</span><span className={styles.rowArrow}><ArrowUpRight aria-hidden="true" /></span>
        </a>)}</div>
    </section>
    {contact.features.length > 0 && <section className={styles.valueStrip} aria-label="Beneficios ECOVERSE">{contact.features.map((feature, index) => { const Icon = featureIcons[index]; return <div className={styles.valueItem} key={feature.title}><Icon aria-hidden="true" /><strong>{feature.title}</strong><span>{feature.subtitle}</span></div>; })}</section>}
    {beforeFooter}
    <footer className={styles.footer}><Image src="/ecoverse/logo-full.png" alt="ECOVERSE - Finest Water Technology" width={250} height={46} /><a href={contact.website.url} target="_blank" rel="noopener noreferrer">{contact.website.displayDomain}</a></footer>
  </article></main>;
}
