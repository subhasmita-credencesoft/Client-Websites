import type { NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import styles from '@/styles/ErrorPage.module.scss';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found at Baibhab Resorts & Conventions. Browse rooms, weddings and events on the Bhubaneswar–Cuttack corridor."
        path="/404"
        noIndex
      />
      <div className="container">
      <div className={styles.wrap} data-reveal>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the link is broken. Let&apos;s
          get you back to something useful.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/stay" className="btn btn-outline">
            Explore Stay
          </Link>
          <Link href="/events" className="btn btn-outline">
            Weddings &amp; Events
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default NotFoundPage;
