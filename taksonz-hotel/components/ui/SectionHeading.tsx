import { cloneElement, isValidElement, type ReactNode } from "react";
import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";
import styles from "./SectionHeading.module.scss";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  inverse?: boolean;
}

/** Animates plain-string titles (also when wrapped in a single <span id=…>) word by word. */
function renderTitle(title: ReactNode): ReactNode {
  if (typeof title === "string") return <AnimatedText text={title} />;
  if (isValidElement<{ children?: unknown }>(title) && typeof title.props.children === "string") {
    return cloneElement(title, undefined, <AnimatedText text={title.props.children} />);
  }
  return title;
}

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2", inverse }: Props) {
  return (
    <div className={[styles.wrap, align === "center" ? styles.center : "", inverse ? styles.inverse : ""].join(" ")}>
      {eyebrow && (
        <Reveal y={14}>
          <p className={styles.eyebrow}><span className={styles.rule} aria-hidden />{eyebrow}</p>
        </Reveal>
      )}
      <Tag className={styles.title}>{renderTitle(title)}</Tag>
      {intro && (
        <Reveal y={18} delay={0.25}>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
