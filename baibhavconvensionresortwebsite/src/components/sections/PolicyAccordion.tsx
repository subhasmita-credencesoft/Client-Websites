import styles from '@/styles/PolicyAccordion.module.scss';
import { PolicyItem } from '@/types';

export default function PolicyAccordion({ policies }: { policies: PolicyItem[] }) {
  return (
    <div className={styles.list} data-reveal>
      {policies.map((policy) => (
        <details key={policy.question} className={styles.details}>
          <summary className={styles.summary}>
            {policy.question}
            <iconify-icon icon="solar:alt-arrow-down-linear" className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{policy.answer}</p>
        </details>
      ))}
    </div>
  );
}
