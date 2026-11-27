'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ChevronLeft,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Room, getRoomBySlugOrId } from '@/data/roomsData';
import { RESORT_DATA } from '@/data/resortData';
import { useHotelRooms } from '@/hooks/useHotelRooms';
import {
  getTodayDateString,
  getTomorrowDateString,
  generateBookingEngineUrl,
} from '@/services/hotelApi';
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
  Clock: <Clock size={20} />,
  Sparkles: <Sparkles size={20} />,
};

interface Props {
  slug?: string;
  room?: Room;
  initialRoom?: Room;
  similarRooms?: Room[];
  initialSimilarRooms?: Room[];
}

export default function RoomDetailClient({
  slug = '',
  room: propRoom,
  initialRoom,
  similarRooms: propSimilarRooms,
  initialSimilarRooms = [],
}: Props) {
  const router = useRouter();
  const { rooms, loading } = useHotelRooms({
    initialRooms: initialRoom ? [initialRoom, ...initialSimilarRooms] : undefined,
  });

  const room =
    propRoom ||
    initialRoom ||
    (slug ? getRoomBySlugOrId(slug, rooms) : undefined);

  const similarRooms =
    propSimilarRooms && propSimilarRooms.length > 0
      ? propSimilarRooms
      : initialSimilarRooms && initialSimilarRooms.length > 0
      ? initialSimilarRooms
      : rooms.filter((r) => r.id !== room?.id).slice(0, 3);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    setCheckIn(getTodayDateString());
    setCheckOut(getTomorrowDateString());
  }, []);

  // Nights calculation
  const d1 = checkIn ? new Date(checkIn) : new Date();
  const d2 = checkOut ? new Date(checkOut) : new Date();
  const nights = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const roomPrice = room ? room.price : 0;
  const totalPrice = roomPrice * nights;

  const handleBookNow = () => {
    if (!room) return;
    setIsBooked(true);
    setTimeout(() => {
      router.push(`/booking?room=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`);
    }, 300);
  };

  const whatsappMessage = room
    ? encodeURIComponent(
        `Hello Tarangan Resort! I would like to book the *${room.title}* from ${checkIn} to ${checkOut} (${nights} nights) for ${guests} guests. Please confirm availability!`
      )
    : '';

  if (!room) {
    if (loading) {
      return (
        <div className={styles.page}>
          <div className={styles.topBand}>
            <div className={styles.container}>
              <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <ChevronRight size={13} />
                <Link href="/rooms">Accommodations</Link>
                <ChevronRight size={13} />
                <span>Loading Room...</span>
              </nav>
            </div>
          </div>
          <div className={styles.container} style={{ padding: '80px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Fetching live cottage details...</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.page}>
        <div className={styles.topBand}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <ChevronRight size={13} />
              <Link href="/rooms">Accommodations</Link>
            </nav>
          </div>
        </div>
        <div className={styles.container} style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#1B2D2A' }}>Room Not Found</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            We could not find the requested accommodation in our live inventory.
          </p>
          <Link
            href="/rooms"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              backgroundColor: '#C59A78',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Browse All Accommodations
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = room.images[activeImageIndex] || room.images[0] || '/images/hero/hero-drone-sunset.jpg';

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
            {/* Main Active Image Box with Prev/Next Controls */}
            <div className={styles.mainImageBox}>
              <img
                src={currentImage}
                alt={room.title}
                className={styles.mainImage}
                onError={(e) => {
                  e.currentTarget.src = '/images/facilities/pool-day.jpg';
                }}
              />

              {room.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.navArrow} ${styles.prevArrow}`}
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : room.images.length - 1
                      )
                    }
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className={`${styles.navArrow} ${styles.nextArrow}`}
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev < room.images.length - 1 ? prev + 1 : 0
                      )
                    }
                    aria-label="Next photo"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className={styles.photoCounter}>
                    {activeImageIndex + 1} / {room.images.length} Photos
                  </div>
                </>
              )}

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
              <div className={styles.imageBadge}>{room.category}</div>
            </div>

            {/* Thumbnail Row */}
            {room.images.length > 1 && (
              <div className={styles.thumbRow}>
                {room.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.thumbBtn} ${
                      idx === activeImageIndex ? styles.activeThumb : ''
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show photo ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${room.title} view ${idx + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/images/facilities/pool-day.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

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
              {room.fullDescription.includes('<p>') ? (
                <div
                  className={styles.fullDesc}
                  dangerouslySetInnerHTML={{ __html: room.fullDescription }}
                />
              ) : (
                <p className={styles.fullDesc}>{room.fullDescription}</p>
              )}
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
                      {am.imageUrl ? (
                        <img
                          src={am.imageUrl}
                          alt={am.label}
                          style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        amenityIcons[am.icon] || <Sparkles size={20} />
                      )}
                    </div>
                    <span className={styles.amenityLabel}>{am.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-In / Check-Out Policies */}
            <div className={styles.contentSection}>
              <h3 className={styles.subTitle}>Stay Policies</h3>
              <div className={styles.policyGrid}>
                <div className={styles.policyItem}>
                  <strong>Check-in:</strong> {RESORT_DATA.policies.checkInTime}
                </div>
                <div className={styles.policyItem}>
                  <strong>Check-out:</strong> {RESORT_DATA.policies.checkOutTime}
                </div>
                <div className={styles.policyItem}>
                  <strong>Pets:</strong> {RESORT_DATA.policies.petPolicy}
                </div>
                <div className={styles.policyItem}>
                  <strong>Cancellation:</strong> {RESORT_DATA.policies.cancellation}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className={styles.rightCol}>
            <div className={styles.bookingCard}>
              {/* Header Price */}
              <div className={styles.priceHeader}>
                <div>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{room.price.toLocaleString()}</span>
                  <span className={styles.perNight}> / night</span>
                </div>
                <div className={styles.ratingBadge}>
                  <Star size={14} fill="#F7C325" color="#F7C325" />
                  <span>{room.rating}</span>
                </div>
              </div>

              {/* Date Inputs */}
              <div className={styles.datePickerGrid}>
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
                    ₹{room.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}
                  </span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className={styles.calcRow}>
                  <span>Taxes & GST (12%)</span>
                  <span>₹{Math.round(totalPrice * 0.12).toLocaleString()}</span>
                </div>
                <div className={styles.calcTotal}>
                  <span>Total Estimated</span>
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
                <span>Reserve via WhatsApp</span>
              </a>

              {/* Direct Desk Call */}
              <a href={`tel:${RESORT_DATA.phone}`} className={styles.callDeskBtn}>
                <Phone size={14} />
                <span>Call Desk: {RESORT_DATA.formattedPhone}</span>
              </a>

              <p className={styles.noCardNeeded}>
                ✓ Zero hidden fees • Verified Direct Resort Rates • 24/7 Confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Similar Recommended Rooms */}
        {similarRooms.length > 0 && (
          <div className={styles.similarSection}>
            <h3 className={styles.similarHeading}>Other Recommended Cottages</h3>
            <div className={styles.similarGrid}>
              {similarRooms.map((simRoom) => (
                <RoomCard key={simRoom.id} room={simRoom} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
