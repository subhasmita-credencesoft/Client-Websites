import type { ReactNode } from "react";
import type { PageMeta } from "@/data/pages";
import { img } from "@/data/images";
import { Photo } from "./Photo";
import { Parallax } from "./Parallax";
import { SplitWords } from "./SplitWords";
import styles from "./PageHero.module.scss";

interface Props {
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}

/** Inner-page hero. The image is the LCP element, so it is eagerly loaded. */
export function PageHero({ title, subtitle, image, children }: Props) {
  return (
    <section className={styles.hero}>
      {image && <div className={styles.media}>
        <Parallax amount={4} scale={1.05}><Photo src={image} alt="" decorative priority sizes="100vw" /></Parallax>
      </div>}
      <div className={styles.shade} />
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}><SplitWords text={title} /></h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
        {children && <div className={styles.extra}>{children}</div>}
      </div>
    </section>
  );
}

/** Hero driven by an entry in data/pages.ts. */
export function HeroFor({ page, children }: { page: PageMeta; children?: ReactNode }) {
  return <PageHero title={page.heroTitle} subtitle={page.heroSubtitle} image={img(page.heroImage)}>{children}</PageHero>;
}
