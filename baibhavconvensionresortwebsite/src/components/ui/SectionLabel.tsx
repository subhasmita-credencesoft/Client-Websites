import styles from './SectionLabel.module.scss';

export default function SectionLabel({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className={`caption ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 className="h2" style={{ marginTop: 8 }}>
        {title}
      </h2>
    </div>
  );
}
