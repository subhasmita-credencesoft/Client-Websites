import type { NextPageContext } from 'next';
import Link from 'next/link';
import styles from '@/styles/ErrorPage.module.scss';

interface ErrorPageProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const code = statusCode ?? 500;
  const isNotFound = code === 404;

  return (
    <div className="container">
      <div className={styles.wrap} data-reveal>
        <p className={styles.code} aria-hidden="true">
          {code}
        </p>
        <h1 className={styles.title}>{isNotFound ? 'Page not found' : 'Something went wrong'}</h1>
        <p className={styles.text}>
          {isNotFound
            ? 'The page you requested could not be found.'
            : 'An unexpected error occurred. Please try again in a moment.'}
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          {!isNotFound && (
            <button type="button" className="btn btn-outline" onClick={() => window.location.reload()}>
              Try Again
            </button>
          )}
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default ErrorPage;
