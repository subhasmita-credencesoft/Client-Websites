"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./Tabs.module.scss";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/** Accessible tabs (WAI-ARIA pattern): arrow keys, Home/End, roving tabindex. */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const uid = useId();
  const [active, setActive] = useState(items[0]?.id ?? "");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKey(e: React.KeyboardEvent, index: number) {
    const last = items.length - 1;
    const next = e.key === "ArrowRight" ? (index + 1) % items.length : e.key === "ArrowLeft" ? (index - 1 + items.length) % items.length : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    const id = items[next]!.id;
    setActive(id);
    refs.current[id]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.list}>
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[t.id] = el; }}
            role="tab"
            id={`${uid}-t-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${uid}-p-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t) => (
        <div key={t.id} role="tabpanel" id={`${uid}-p-${t.id}`} aria-labelledby={`${uid}-t-${t.id}`} hidden={active !== t.id} className={styles.panel} tabIndex={0}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
