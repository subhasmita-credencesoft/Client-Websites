'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  Quote,
  MessageSquarePlus,
  ExternalLink,
  Sparkles,
  X,
} from 'lucide-react';
import { REVIEWS_DATA, REVIEWS_SUMMARY, Review } from '@/data/reviewsData';
import { RESORT_DATA } from '@/data/resortData';
import styles from './ReviewsPage.module.scss';

export default function ReviewsClient() {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const filteredReviews =
    filterRating === 'all'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.rating === filterRating);

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
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Real Traveler Feedback</span>
          </div>
          <h1 className={styles.bannerTitle}>Tarangan Resort Reviews</h1>
          <p className={styles.bannerSub}>
            Discover genuine experiences from over 161 verified travelers on Google, celebrating our cottage stays, sparkling pool, and coastal hospitality.
          </p>
        </div>
      </section>

      {/* Main Reviews Section */}
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          {/* Rating Overview Card */}
          <div className={styles.overviewCard}>
            <div className={styles.scoreBlock}>
              <div className={styles.scoreNumber}>{REVIEWS_SUMMARY.overallScore}</div>
              <div className={styles.starsLarge}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#F7C325" color="#F7C325" />
                ))}
              </div>
              <div className={styles.scoreCount}>
                Based on <strong>{REVIEWS_SUMMARY.totalReviews} Google Reviews</strong>
              </div>
              <a
                href={RESORT_DATA.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewOnGoogleBtn}
              >
                <span>View on Google</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className={styles.categoryRatings}>
              <h4 className={styles.catTitle}>Guest Satisfaction by Category</h4>
              <div className={styles.catGrid}>
                {Object.entries(REVIEWS_SUMMARY.categories).map(([key, val]) => {
                  const formatKey =
                    key === 'foodAndDining'
                      ? 'Food & Dining'
                      : key === 'swimmingPool'
                      ? 'Swimming Pool'
                      : key === 'valueForMoney'
                      ? 'Value for Money'
                      : key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <div key={key} className={styles.catRow}>
                      <span className={styles.catLabel}>{formatKey}</span>
                      <div className={styles.catBarWrapper}>
                        <div
                          className={styles.catBarFill}
                          style={{ width: `${(val / 5) * 100}%` }}
                        />
                      </div>
                      <span className={styles.catVal}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.actionBlock}>
              <h4 className={styles.actionTitle}>Stayed with us recently?</h4>
              <p className={styles.actionDesc}>
                Help fellow travelers by sharing your honest feedback about our cottages and food.
              </p>
              <button
                type="button"
                className={styles.writeBtn}
                onClick={() => setModalOpen(true)}
              >
                <MessageSquarePlus size={16} />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <span className={styles.filterLabel}>Filter by rating:</span>
            <div className={styles.filterPills}>
              <button
                type="button"
                className={`${styles.filterBtn} ${filterRating === 'all' ? styles.activeFilter : ''}`}
                onClick={() => setFilterRating('all')}
              >
                All Reviews ({REVIEWS_DATA.length})
              </button>
              <button
                type="button"
                className={`${styles.filterBtn} ${filterRating === 5 ? styles.activeFilter : ''}`}
                onClick={() => setFilterRating(5)}
              >
                5 Stars
              </button>
              <button
                type="button"
                className={`${styles.filterBtn} ${filterRating === 4 ? styles.activeFilter : ''}`}
                onClick={() => setFilterRating(4)}
              >
                4 Stars
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className={styles.reviewsGrid}>
            {filteredReviews.map((rev) => (
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
                    <h3 className={styles.authorName}>{rev.author}</h3>
                    <span className={styles.authorLocation}>{rev.location}</span>
                  </div>
                  <div className={styles.quoteIcon}>
                    <Quote size={24} color="#C59A78" />
                  </div>
                </div>

                <div className={styles.starsRow}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F7C325" color="#F7C325" />
                  ))}
                  <span className={styles.dateBadge}>{rev.date}</span>
                </div>

                <h4 className={styles.reviewHeading}>"{rev.title}"</h4>
                <p className={styles.commentBody}>{rev.comment}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.stayTypeBadge}>{rev.stayType}</span>
                  <span className={styles.verifiedBadge}>
                    <CheckCircle size={12} color="#10B981" /> Verified Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
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

            <h3 className={styles.modalTitle}>Share Your Review</h3>
            <p className={styles.modalSub}>
              We value your honest feedback to keep improving Tarangan Resort.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                <CheckCircle size={36} color="#10B981" />
                <h4>Thank You, {author}!</h4>
                <p>Your review has been successfully submitted for display.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadarshini Rao"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Rating</label>
                  <div className={styles.starSelect}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className={styles.starBtn}
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
                    placeholder="Tell us about your experience with our rooms, swimming pool, seafood, and staff hospitality..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitReviewBtn}>
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
