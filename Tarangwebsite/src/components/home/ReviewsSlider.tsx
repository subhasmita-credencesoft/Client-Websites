'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle,
  Quote,
  ArrowRight,
  MessageSquarePlus,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { REVIEWS_DATA, REVIEWS_SUMMARY } from '@/data/reviewsData';
import styles from './ReviewsSlider.module.scss';

export default function ReviewsSlider() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
      const card = scrollRef.current.firstElementChild as HTMLElement | null;
      const cardWidth = card ? card.offsetWidth + 16 : 300;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIdx(Math.min(Math.max(idx, 0), REVIEWS_DATA.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const card = scrollRef.current.firstElementChild as HTMLElement | null;
      const scrollStep = card ? card.offsetWidth + 16 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cards = scrollRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthor('');
      setComment('');
    }, 2500);
  };

  return (
    <section className={styles.section} id="reviews">
      <div className={styles.container}>
        {/* Header with Google Rating Badge */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.tagBadge}>
              <Star size={13} fill="#F7C325" color="#F7C325" />
              <span>Guest Experiences</span>
            </div>
            <h2 className={styles.title}>What Our Guests Say About Tarangan</h2>
            <p className={styles.subtitle}>
              Over 161 verified Google travelers celebrate our clean cottage rooms, sparkling pool, and delicious Konkani seafood.
            </p>
          </div>

          <div className={styles.ratingSummaryCard}>
            <div className={styles.bigScore}>{REVIEWS_SUMMARY.overallScore}</div>
            <div className={styles.scoreDetails}>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F7C325" color="#F7C325" />
                ))}
              </div>
              <span className={styles.totalReviews}>
                Based on <strong>{REVIEWS_SUMMARY.totalReviews} Google Reviews</strong>
              </span>
            </div>
            <button
              type="button"
              className={styles.writeReviewBtn}
              onClick={() => setModalOpen(true)}
            >
              <MessageSquarePlus size={14} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Horizontal Slider: One Line on Responsive (Scroll/Swipe to Show) */}
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack} ref={scrollRef}>
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className={styles.reviewCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.authorAvatar}>
                    {rev.avatar ? (
                      <img src={rev.avatar} alt={rev.author} />
                    ) : (
                      <span>{rev.author.charAt(0)}</span>
                    )}
                  </div>
                  <div className={styles.authorMeta}>
                    <h4 className={styles.authorName}>{rev.author}</h4>
                    <span className={styles.authorLocation}>{rev.location}</span>
                  </div>
                  <div className={styles.quoteIcon}>
                    <Quote size={22} color="#C59A78" />
                  </div>
                </div>

                <div className={styles.starsBar}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F7C325" color="#F7C325" />
                  ))}
                  <span className={styles.dateStamp}>{rev.date}</span>
                </div>

                <h5 className={styles.reviewTitle}>"{rev.title}"</h5>
                <p className={styles.commentText}>{rev.comment}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.stayType}>{rev.stayType}</span>
                  <span className={styles.verifiedTag}>
                    <CheckCircle size={12} color="#10B981" /> Verified Stay
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls: Arrows & Dot Indicators */}
          <div className={styles.sliderControls}>
            <button
              type="button"
              className={styles.sliderArrowBtn}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.dotsRow}>
              {REVIEWS_DATA.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${activeIdx === i ? styles.activeDot : ''}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.sliderArrowBtn}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Link href="/reviews" className={styles.seeAllBtn}>
            <span>Read All 161+ Google Reviews</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalDialog} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h3 className={styles.modalTitle}>Share Your Tarangan Experience</h3>
            <p className={styles.modalSub}>
              We value your honest feedback on our rooms, food, pool, and hospitality.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                <CheckCircle size={32} color="#10B981" />
                <h4>Thank you, {author || 'Guest'}!</h4>
                <p>Your review has been submitted for verification.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Star Rating</label>
                  <div className={styles.ratingSelect}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className={styles.starSelectBtn}
                      >
                        <Star
                          size={24}
                          fill={s <= rating ? '#F7C325' : 'none'}
                          color={s <= rating ? '#F7C325' : '#D6CBC1'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Your Review</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the cottage room, food, pool, and staff service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
