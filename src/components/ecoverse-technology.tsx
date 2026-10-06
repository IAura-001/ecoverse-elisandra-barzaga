import { ChevronDown } from "lucide-react";
import styles from "./ecoverse-technology.module.css";

const eliteFeatures = [
  { name: "MICRO Z", description: "Filtración de partículas." },
  { name: "KDF 55", description: "Tratamiento de contaminantes mediante procesos de óxido-reducción." },
  { name: "RESINA IONIZADA", description: "Ayuda a reducir la dureza del agua." },
  { name: "CARBÓN CATALÍTICO", description: "Filtración y adsorción de diferentes contaminantes." },
  { name: "SISTEMA VORTECH", description: "Distribución optimizada del medio filtrante." },
];

const osmosisStages = [
  { name: "BLOQUE DE CARBÓN", description: "Filtro para eliminar cloro y compuestos orgánicos e inorgánicos." },
  { name: "MEMBRANA TFC", description: "Etapa principal de ósmosis reversa." },
  { name: "FILTRO DE CARBÓN", description: "Ayuda a reducir cloro, sabores y olores." },
  { name: "FILTRO DE SEDIMENTOS", description: "Filtración de partículas." },
  { name: "MEMBRANA ALCALINA", description: "Remineraliza el agua con calcio, magnesio, potasio y silicio." },
];

export function EcoverseTechnology() {
  return (
    <section className={styles.section} aria-labelledby="technology-heading">
      <h2 id="technology-heading" className={styles.heading}>TECNOLOGÍA ECOVERSE</h2>
      <div className={styles.cards}>
        <details className={styles.card}>
          <summary className={styles.summary}>
            <span className={styles.copy}>
              <span className={styles.name}>ELITE SERIES</span>
              <span className={styles.subtitle}>Sistema Dual para Agua de Ciudad</span>
            </span>
            <ChevronDown className={styles.indicator} aria-hidden="true" />
          </summary>
          <div className={styles.content}>
            <p className={styles.intro}>Filtración avanzada diseñada para tratar el agua de toda la casa.</p>
            <dl className={styles.features}>
              {eliteFeatures.map(({ name, description }) => (
                <div className={styles.feature} key={name}>
                  <dt>{name}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </details>
        <details className={styles.card}>
          <summary className={styles.summary}>
            <span className={styles.copy}>
              <span className={styles.name}>ÓSMOSIS REVERSA ALCALINA</span>
              <span className={styles.subtitle}>Sistema de purificación de 5 etapas.</span>
            </span>
            <ChevronDown className={styles.indicator} aria-hidden="true" />
          </summary>
          <div className={styles.content}>
            <ol className={styles.stages}>
              {osmosisStages.map(({ name, description }) => (
                <li className={styles.stage} key={name}>
                  <strong>{name}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </details>
      </div>
    </section>
  );
}
