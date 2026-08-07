import Image from 'next/image';
import styles from '@/styles/ProductGallery.module.scss';
import { GalleryImage } from '@/types';

export default function ProductGallery({ images, totalCount = 24 }: { images: GalleryImage[]; totalCount?: number }) {
  const lastIndex = images.length - 1;

  return (
    <div className={styles.grid} data-reveal>
      {images.map((image, index) => (
        <div key={image.id} className={`${styles.item} ${image.span === 'main' ? styles.main : ''}`}>
          <Image
            src={image.src}
            alt={image.alt}
            className={styles.image}
            loading={index === 0 ? 'eager' : 'lazy'}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={index === 0}
          />
          {index === lastIndex && (
            <button type="button" className={styles.viewAll}>
              View all {totalCount} photos
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
