import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Parallax } from "@/components/ui/Parallax";
import styles from "./CtaBanner.module.scss";

interface Props {
  title: string;
  text: string;
  image: string;
  children: ReactNode;
}

export function CtaBanner({ title, text, image, children }: Props) {
  return (
    <section className="section" aria-label={title}>
      <div className="container">
        <Reveal className={styles.banner}>
          <div className={styles.bg}><Parallax amount={6} scale={1.14}><Photo src={image} alt="" decorative sizes="1240px" /></Parallax></div>
          <div className={styles.shade} />
          <div className={styles.copy}>
            <h2><AnimatedText text={title} /></h2>
            <p>{text}</p>
            <div className={styles.actions}>{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
