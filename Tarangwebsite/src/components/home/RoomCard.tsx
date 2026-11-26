'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, Users, Maximize2, Waves, ArrowUpRight } from 'lucide-react';
import { Room } from '@/data/roomsData';
import styles from './RoomCard.module.scss';

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.card}>
      {/* Media Box */}
      <div className={styles.mediaBox}>
        <div
          className={styles.imageLayer}
          style={{ backgroundImage: `url(${room.images[0]})` }}
        />
        <div className={styles.imageOverlay} />

        {/* Top Badges */}
        <div className={styles.topRow}>
          <div className={styles.pricePill}>
            <span className={styles.priceAmount}>₹{room.price.toLocaleString()}</span>
            <span className={styles.pricePerNight}>/night</span>
            {room.originalPrice > room.price && (
              <span className={styles.originalPrice}>
                ₹{room.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`${styles.heartBtn} ${isLiked ? styles.activeHeart : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            aria-label={isLiked ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart size={16} fill={isLiked ? '#FF4D5E' : 'none'} color={isLiked ? '#FF4D5E' : '#FFFFFF'} />
          </button>
        </div>

        {/* Category Tag */}
        <div className={styles.categoryBadge}>{room.category}</div>
      </div>

      {/* Card Info Details */}
      <div className={styles.cardContent}>
        {/* Rating & Capacity Row */}
        <div className={styles.metaRow}>
          <div className={styles.ratingBadge}>
            <Star size={14} fill="#F7C325" color="#F7C325" />
            <span className={styles.score}>{room.rating}</span>
            <span className={styles.reviews}>({room.reviewsCount})</span>
          </div>

          <div className={styles.capacityBadge}>
            <Users size={14} />
            <span>Up to {room.maxGuests} guests</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={styles.title}>
          <Link href={`/rooms/${room.slug}`}>{room.title}</Link>
        </h3>

        {/* Subtitle / View */}
        <p className={styles.viewNote}>
          <Waves size={13} color="#C59A78" />
          <span>{room.view}</span>
        </p>

        <p className={styles.description}>{room.shortDescription}</p>

        {/* Key Features Chips */}
        <div className={styles.featuresChips}>
          <span className={styles.chip}>{room.bedType.split('+')[0]}</span>
          <span className={styles.chip}>{room.sizeSqFt} sq.ft</span>
          <span className={styles.chip}>Free Wi-Fi</span>
        </div>

        {/* Action Row */}
        <div className={styles.actionRow}>
          <Link href={`/rooms/${room.slug}`} className={styles.detailsBtn}>
            <span>View Details</span>
            <ArrowUpRight size={15} />
          </Link>
          <a
            href="https://bookone.io/Tarangan-Resort?bookingEngine=true"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            Reserve
          </a>
        </div>
      </div>
    </div>
  );
}
