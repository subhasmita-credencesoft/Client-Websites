'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  Users,
  Waves,
  Wind,
  Wifi,
  Tv,
  Coffee,
  ShowerHead,
  ShieldCheck,
  Car,
  Trees,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Room } from '@/data/roomsData';
import { RESORT_DATA } from '@/data/resortData';
import RoomCard from '@/components/home/RoomCard';
import styles from './RoomDetailClient.module.scss';

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={20} />,
  Tv: <Tv size={20} />,
  Waves: <Waves size={20} />,
  Wind: <Wind size={20} />,
  Coffee: <Coffee size={20} />,
  ShowerHead: <ShowerHead size={20} />,
  ShieldCheck: <ShieldCheck size={20} />,
  Car: <Car size={20} />,
  Trees: <Trees size={20} />,
  Heart: <Heart size={20} />,
  Users: <Users size={20} />,
};

interface Props {
  room: Room;
  similarRooms: Room[];
}

export default function RoomDetailClient({ room, similarRooms }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState('2026-11-20');
  const [checkOut, setCheckOut] = useState('2026-11-22');
  const [guests, setGuests] = useState(2);
  const [isBooked, setIsBooked] = useState(false);

  // Nights calculation
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const totalPrice = room.price * nights;

  const handleBookNow = () => {
    setIsBooked(true);
    setTimeout(() => {
      window.location.href = 'https://bookone.io/Tarangan-Resort?bookingEngine=true';
    }, 400);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Tarangan Resort! I would like to book the *${room.title}* from ${checkIn} to ${checkOut} (${nights} nights) for ${guests} guests. Please confirm availability!`
  );

  return (
    <div className={styles.page}>
      {/* Top Peach Tone Band */}
      <div className={styles.topBand}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} />
            <Link href="/rooms">Accommodations</Link>
            <ChevronRight size={13} />
            <span className={styles.currentCrumb}>{room.title}</span>
          </nav>
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Two-Column Layout */}
        <div className={styles.detailGrid}>
          {/* Left Column: Photos & Room Narrative */}
          <div className={styles.leftCol}>
            {/* Main Active Image Box */}
            <div className={styles.mainImageBox}>
              <img
                src={room.images[activeImageIndex]}
                alt={room.title}
                className={styles.mainImage}
              />
              <button
                type="button"
                className={`${styles.heartBtn} ${isLiked ? styles.activeHeart : ''}`}
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  size={18}
                  fill={isLiked ? '#FF4D5E' : 'none'}
                  color={isLiked ? '#FF4D5E' : '#FFFFFF'}
                />
              </button>

              <div className={styles.categoryBadge}>{room.category}</div>
            </div>

            {/* Thumbnail Gallery Strip */}
            <div className={styles.thumbnailStrip}>
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.thumbBtn} ${
                    idx === activeImageIndex ? styles.activeThumb : ''
                  }`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`${room.title} photo ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Host & Management Badge */}
            <div className={styles.hostCard}>
              <div className={styles.hostAvatar}>🌴</div>
              <div>
                <span className={styles.hostedBy}>Hosted with Care by</span>
                <h4 className={styles.hostName}>Tarangan Resort Hospitality Team</h4>
                <p className={styles.hostNote}>
                  On-site management available 24/7 for room service, travel guidance, and Konkani dining requests.
                </p>
              </div>
            </div>

            {/* Full Room Description */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>About this Cottage</h2>
              <p className={styles.fullDesc}>{room.fullDescription}</p>
            </div>

            {/* Key Features Bullet List */}
            <div className={styles.contentSection}>
              <h3 className={styles.subTitle}>Highlights of this Space</h3>
              <div className={styles.featuresList}>
                {room.features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <CheckCircle2 size={18} color="#C59A78" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className={styles.contentSection}>
              <h3 className={styles.subTitle}>Included Amenities</h3>
              <div className={styles.amenitiesGrid}>
                {room.amenities.map((am, i) => (
                  <div key={i} className={styles.amenityCard}>
                    <div className={styles.amenityIcon}>
                      {amenityIcons[am.icon] || <CheckCircle2 size={20} />}
                    </div>
                    <span className={styles.amenityLabel}>{am.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Rules & Policies */}
            <div className={styles.contentSection}>
              <h3 className={styles.subTitle}>Stay Policies</h3>
              <div className={styles.policyBox}>
                <div className={styles.policyRow}>
                  <strong>Check-In Time:</strong>
                  <span>{RESORT_DATA.policies.checkInTime}</span>
                </div>
                <div className={styles.policyRow}>
                  <strong>Check-Out Time:</strong>
                  <span>{RESORT_DATA.policies.checkOutTime}</span>
                </div>
                <div className={styles.policyRow}>
                  <strong>Pet Policy:</strong>
                  <span>{RESORT_DATA.policies.petPolicy}</span>
                </div>
                <div className={styles.policyRow}>
                  <strong>Cancellation Policy:</strong>
                  <span>{RESORT_DATA.policies.cancellation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className={styles.rightCol}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <div>
                  <span className={styles.priceNumber}>₹{room.price.toLocaleString()}</span>
                  <span className={styles.perNight}> / night</span>
                  {room.originalPrice > room.price && (
                    <span className={styles.originalStrike}>
                      ₹{room.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className={styles.ratingBrief}>
                  <Star size={14} fill="#F7C325" color="#F7C325" />
                  <strong>{room.rating}</strong>
                  <span>({room.reviewsCount})</span>
                </div>
              </div>

              {/* Date & Guest Inputs */}
              <div className={styles.dateSelectorBox}>
                <div className={styles.dateField}>
                  <label>
                    <Calendar size={13} /> Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className={styles.dateField}>
                  <label>
                    <Calendar size={13} /> Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.guestSelector}>
                <label>
                  <Users size={14} /> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? 's' : ''} {n > room.maxGuests ? '(Extra charge)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Calculation Breakdown */}
              <div className={styles.calcBox}>
                <div className={styles.calcRow}>
                  <span>
                    ₹{room.price.toLocaleString()} × {nights} nights
                  </span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className={styles.calcRow}>
                  <span>Taxes & GST (12%)</span>
                  <span>₹{Math.round(totalPrice * 0.12).toLocaleString()}</span>
                </div>
                <div className={styles.calcTotal}>
                  <span>Total Amount</span>
                  <strong>
                    ₹{(totalPrice + Math.round(totalPrice * 0.12)).toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Book Button */}
              <button
                type="button"
                className={`${styles.bookNowBtn} ${isBooked ? styles.bookedSuccess : ''}`}
                onClick={handleBookNow}
              >
                {isBooked ? 'Proceeding to Reservation ✓' : 'Book Now Online'}
              </button>

              {/* WhatsApp Quick Direct Button */}
              <a
                href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappReserveBtn}
              >
                <MessageCircle size={16} />
                <span>Quick WhatsApp Reservation</span>
              </a>

              <div className={styles.bookingAssurance}>
                <div className={styles.assureItem}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>Free cancellation up to 72 hours</span>
                </div>
                <div className={styles.assureItem}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>Direct resort rate guarantee</span>
                </div>
              </div>

              <div className={styles.helpRow}>
                <span>Questions before booking?</span>
                <a href={`tel:${RESORT_DATA.phone}`}>
                  <Phone size={13} /> {RESORT_DATA.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Rooms Section */}
        <section className={styles.similarSection}>
          <div className={styles.similarHeader}>
            <h3 className={styles.similarTitle}>Similar Accommodations</h3>
            <Link href="/rooms" className={styles.viewAllRoomsLink}>
              <span>View All 12 Cottages</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className={styles.similarGrid}>
            {similarRooms.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
