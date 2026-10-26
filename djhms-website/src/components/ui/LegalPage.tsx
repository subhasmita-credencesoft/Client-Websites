import type { ReactNode } from 'react';
import { Container } from './Container';
import styles from './LegalPage.module.scss';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container as="article" className={styles.page}>
      <h1>{title}</h1>
      {children}
    </Container>
  );
}
