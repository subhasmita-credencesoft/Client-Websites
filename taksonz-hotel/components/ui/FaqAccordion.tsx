"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import styles from "./FaqAccordion.module.scss";

export function FaqAccordion({ items }: { items: Pick<Faq, "q" | "a">[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={styles.list}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={styles.item}>
            <h3>
              <button id={`${uid}-b${i}`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`} onClick={() => setOpen(isOpen ? null : i)} className={styles.btn}>
                <span>{f.q}</span>
                <Plus size={20} aria-hidden className={isOpen ? styles.iconOpen : styles.icon} />
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} className={[styles.panel, isOpen ? styles.show : ""].join(" ")}>
              <div className={styles.inner}><p>{f.a}</p></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
