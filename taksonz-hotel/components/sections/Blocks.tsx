import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Parallax } from "@/components/ui/Parallax";
import { CountUp } from "@/components/ui/CountUp";
import type { IconName } from "@/data/content";
import styles from "./Blocks.module.scss";

/** Image + copy two-column section. */
export function Split({ image, reverse, eyebrow, title, children }: { image: string; reverse?: boolean; eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <div className={[styles.split, reverse ? styles.reverse : ""].join(" ")}>
      <Reveal variant="clip" className={styles.splitMedia}>
        <Parallax><Photo src={image} alt="" decorative sizes="(min-width: 1024px) 50vw, 100vw" /></Parallax>
      </Reveal>
      <Reveal delay={0.12} className={styles.splitCopy}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2><AnimatedText text={title} /></h2>
        <div className={styles.stack}>{children}</div>
      </Reveal>
    </div>
  );
}

export interface Feature {
  icon: IconName;
  title: string;
  text?: string;
}

export function FeatureGrid({ items, cols = 4 }: { items: readonly Feature[]; cols?: 3 | 4 }) {
  return (
    <ul className={[styles.features, cols === 3 ? styles.cols3 : styles.cols4].join(" ")}>
      {items.map((f, i) => (
        <Reveal as="li" key={f.title} delay={i * 0.07} className={styles.feature}>
          <span className={styles.icon}><Icon name={f.icon} /></span>
          <h3>{f.title}</h3>
          {f.text && <p>{f.text}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

export function Stats({ items }: { items: readonly { value: number; suffix?: string; label: string }[] }) {
  return (
    <ul className={styles.stats}>
      {items.map((s) => (
        <li key={s.label}>
          <strong><CountUp to={s.value} suffix={s.suffix} /></strong>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function TileLink({ href, image, title, text }: { href: string; image: string; title: string; text: string }) {
  return (
    <Link href={href} className={styles.tile}>
      <div className={styles.tileMedia}><Photo src={image} alt="" decorative sizes="(min-width: 768px) 50vw, 100vw" /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </Link>
  );
}
