import { Wallet } from "lucide-react";
import styles from "./ecoverse-financing.module.css";

export function EcoverseFinancing() {
  return (
    <section className={styles.section} aria-labelledby="financing-heading">
      <div className={styles.card}>
        <span className={styles.icon}><Wallet aria-hidden="true" /></span>
        <div className={styles.copy}>
          <h2 id="financing-heading">FINANCIAMIENTO DISPONIBLE</h2>
          <p>Desde <strong>$111</strong> dólares mensuales</p>
        </div>
      </div>
    </section>
  );
}
