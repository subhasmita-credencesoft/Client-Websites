import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.body}>
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className={styles.link}>
        Return to the homepage
      </Link>
    </div>
  );
}
