import styles from './SectionHeading.module.scss';

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = 'center', as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
