"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Lightbox.module.scss";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface Props {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/** Native <dialog>: focus trapping, Escape-to-close and inert background come from the browser. */
export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index! + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onIndex]);

  const img = open ? images[index!] : undefined;

  return (
    <dialog ref={ref} className={styles.dialog} aria-label="Image viewer" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      {img && (
        <div className={styles.stage}>
          <div className={styles.frame}>
            <Image key={img.src} src={img.src} alt={img.alt} fill sizes="100vw" style={{ objectFit: "contain" }} className={styles.img} />
          </div>
          <p className={styles.caption} aria-live="polite">{img.alt} · {index! + 1} / {images.length}</p>
          <button className={`${styles.btn} ${styles.close}`} onClick={onClose} aria-label="Close viewer"><X size={22} /></button>
          {images.length > 1 && (
            <>
              <button className={`${styles.btn} ${styles.prev}`} onClick={() => onIndex((index! - 1 + images.length) % images.length)} aria-label="Previous image"><ChevronLeft size={26} /></button>
              <button className={`${styles.btn} ${styles.next}`} onClick={() => onIndex((index! + 1) % images.length)} aria-label="Next image"><ChevronRight size={26} /></button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
