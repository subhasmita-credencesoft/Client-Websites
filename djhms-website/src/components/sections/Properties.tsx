'use client';

import { useCallback, useEffect, useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { BedDouble, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { properties } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Properties.module.scss';

interface PropertiesProps {
  layout?: 'slider' | 'grid';
}

export function Properties({ layout = 'slider' }: PropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = properties.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 4 seconds in slider mode
  useEffect(() => {
    if (layout !== 'slider' || isPaused || total <= 1) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [layout, isPaused, total, nextSlide]);

  const activeProp = properties[currentIndex] ?? properties[0]!;

  return (
    <section id="properties" className={styles.section} aria-labelledby="properties-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="properties-title"
            eyebrow="Our Properties"
            title="Managed Hotels & Hospitality Properties"
            subtitle="Explore our managed hospitality portfolio in Mumbai and Navi Mumbai, delivering exceptional guest comfort and professional hotel operations."
          />
        </Reveal>

        {layout === 'slider' ? (
          <div
            className={styles.sliderContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className={styles.sliderControls}>
              <div className={styles.tabs} role="tablist" aria-label="Properties selection">
                {properties.map((prop, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={prop.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                    >
                      <span className={styles.tabBadge}>{prop.location.split(',')[0]}</span>
                      <span className={styles.tabTitle}>{prop.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.arrows}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={prevSlide}
                  aria-label="Previous property"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className={styles.counter}>
                  {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={nextSlide}
                  aria-label="Next property"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <article key={activeProp.id} className={`${styles.card} ${styles.slideAnimated}`}>
              <div className={styles.media}>
                <SmartImage
                  src={activeProp.image}
                  fallback={activeProp.fallback}
                  alt={activeProp.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className={styles.img}
                />
                <span className={styles.badge}>{activeProp.location.split(',')[0]}</span>
              </div>
              <div className={styles.info}>
                <div className={styles.headerBlock}>
                  <h3>{activeProp.name}</h3>
                  <p className={styles.location}>
                    <Icon name="pin" size={16} /> {activeProp.location}
                  </p>
                </div>
                <p className={styles.desc}>{activeProp.description}</p>
                {activeProp.amenities && activeProp.amenities.length > 0 && (
                  <div className={styles.amenities}>
                    {activeProp.amenities.map((item) => (
                      <span key={item} className={styles.amenityTag}>
                        <CheckCircle2 size={13} className={styles.checkIcon} />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                <div className={styles.actions}>
                  <Button href={activeProp.website} external arrow>
                    Visit {activeProp.name}
                  </Button>
                  {activeProp.mapsLink && (
                    <Button href={activeProp.mapsLink} external variant="outline" className={styles.mapBtn}>
                      View Location
                    </Button>
                  )}
                </div>
              </div>
              <aside className={styles.rooms} aria-label={`${activeProp.name} room categories`}>
                <div className={styles.roomBox}>
                  <h4>Room Categories</h4>
                  <ul>
                    {activeProp.roomCategories.map((r) => (
                      <li key={r.name}>
                        <BedDouble size={18} strokeWidth={1.5} aria-hidden="true" />
                        <span>{r.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href={activeProp.website} external variant="navy">
                  Book Now (Official Site)
                </Button>
              </aside>
            </article>

            <div className={styles.footerAction}>
              <Button href="/properties" variant="outline" arrow>
                Explore All Managed Properties
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.list}>
            {properties.map((prop, index) => (
              <Reveal
                key={prop.id}
                as="article"
                variant="zoom"
                delay={100 + index * 120}
                className={styles.card}
              >
                <div className={styles.media}>
                  <SmartImage
                    src={prop.image}
                    fallback={prop.fallback}
                    alt={prop.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className={styles.img}
                  />
                  <span className={styles.badge}>{prop.location.split(',')[0]}</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.headerBlock}>
                    <h3>{prop.name}</h3>
                    <p className={styles.location}>
                      <Icon name="pin" size={16} /> {prop.location}
                    </p>
                  </div>
                  <p className={styles.desc}>{prop.description}</p>
                  {prop.amenities && prop.amenities.length > 0 && (
                    <div className={styles.amenities}>
                      {prop.amenities.map((item) => (
                        <span key={item} className={styles.amenityTag}>
                          <CheckCircle2 size={13} className={styles.checkIcon} />
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className={styles.actions}>
                    <Button href={prop.website} external arrow>
                      Visit {prop.name}
                    </Button>
                    {prop.mapsLink && (
                      <Button href={prop.mapsLink} external variant="outline" className={styles.mapBtn}>
                        View Location
                      </Button>
                    )}
                  </div>
                </div>
                <aside className={styles.rooms} aria-label={`${prop.name} room categories`}>
                  <div className={styles.roomBox}>
                    <h4>Room Categories</h4>
                    <ul>
                      {prop.roomCategories.map((r) => (
                        <li key={r.name}>
                          <BedDouble size={18} strokeWidth={1.5} aria-hidden="true" />
                          <span>{r.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button href={prop.website} external variant="navy">
                    Book Now (Official Site)
                  </Button>
                </aside>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
