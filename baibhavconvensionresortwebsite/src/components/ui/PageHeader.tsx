import styles from '@/styles/PageHeader.module.scss';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function PageHeader({ eyebrow, title, subtitle, align = 'left' }: PageHeaderProps) {
  return (
    <header className={`${styles.header} ${align === 'center' ? styles.center : ''}`} data-reveal>
      {eyebrow && <p className="caption">{eyebrow}</p>}
      <h1 className={`${styles.title} ${eyebrow ? styles.withEyebrow : ''}`}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
