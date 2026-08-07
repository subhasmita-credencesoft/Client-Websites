import { ReactNode } from 'react';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/UtilityPage.module.scss';

export interface PolicySection {
  heading: string;
  body: ReactNode;
}

interface PolicyPageProps {
  title: string;
  eyebrow: string;
  description: string;
  path: string;
  updated: string;
  sections: PolicySection[];
}

export default function PolicyPage({ title, eyebrow, description, path, updated, sections }: PolicyPageProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <div className="container" style={{ paddingTop: 96 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: title },
          ]}
        />
      </div>

      <div className="container">
        <PageHeader eyebrow={eyebrow} title={title} subtitle={`Last updated: ${updated}`} />
      </div>

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        <div className={styles.content} data-reveal>
          {sections.map((section) => (
            <div key={section.heading} className={styles.block}>
              <h2 className={styles.heading}>{section.heading}</h2>
              <div className={styles.body}>{section.body}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
