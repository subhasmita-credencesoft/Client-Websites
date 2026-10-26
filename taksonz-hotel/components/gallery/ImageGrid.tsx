"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Lightbox, type LightboxImage } from "./Lightbox";
import styles from "./ImageGrid.module.scss";

interface Props {
  images: (LightboxImage & { category?: string })[];
  variant?: "gallery" | "strip";
  categories?: string[];
}

/** Image grid with optional category filter and an accessible lightbox. */
export function ImageGrid({ images, variant = "gallery", categories }: Props) {
  const [cat, setCat] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const shown = cat === "All" ? images : images.filter((i) => i.category === cat);

  return (
    <div>
      {categories && (
        <div className={styles.filters} role="group" aria-label="Filter gallery by category">
          {categories.map((c) => (
            <button key={c} className={styles.chip} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      )}
      <p className="visually-hidden" role="status" aria-live="polite">{shown.length} images shown</p>
      <ul className={variant === "strip" ? styles.strip : styles.grid}>
        {shown.map((img, i) => (
          <li key={img.src + i}>
            <button className={styles.tile} onClick={() => setIndex(i)} aria-label={`Open image: ${img.alt}`}>
              <Photo src={img.src} alt="" decorative sizes={variant === "strip" ? "25vw" : "(min-width: 768px) 33vw, 50vw"} />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={shown} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </div>
  );
}
