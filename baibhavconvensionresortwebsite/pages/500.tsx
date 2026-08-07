import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import styles from '@/styles/ErrorPage.module.scss';

const ServerErrorPage: NextPage = () => {
  return (
    <div className="container">
      <div className={styles.wrap} data-reveal>
        <p className={styles.code} aria-hidden="true">
          500
        </p>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.text}>
          An unexpected error occurred on our side. Please try again in a moment, or reach out and we&apos;ll be happy
          to help.
        </p>
        <div className={styles.actions}>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default ServerErrorPage;
