import Image from 'next/image';
import { GALLERY_IMAGES } from '@/data/gallery';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Gallery.module.scss';

export function Gallery() {
  return (
    <section id="gallery" className={styles.section} aria-labelledby="gallery-heading">
      <div className={styles.container}>
        <Reveal className={styles.headingWrap}>
          <p className={styles.subtitle}>Our Gallery</p>
          <h2 id="gallery-heading" className={styles.heading}>
            Explore Our Gallery
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {GALLERY_IMAGES.map((image, index) => (
            <Reveal as="li" key={`${image.src}-${index}`} delay={(index % 4) * 90} className={styles.itemWrap}>
              <div className={styles.item}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className={styles.image}
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
