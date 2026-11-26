'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Users,
  Check,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  Waves,
  Utensils,
  Flame,
  Heart,
  Clock,
} from 'lucide-react';
import { ROOMS_DATA, Room } from '@/data/roomsData';
import { RESORT_DATA } from '@/data/resortData';
import styles from './BookingEngine.module.scss';

export default function BookingEngine() {
  const searchParams = useSearchParams();

  const placeParam = searchParams.get('place');
  const initialRoomId = searchParams.get('room') || 'deluxe-pool-view-cottage';
  const initialCheckIn = searchParams.get('checkIn') || '2026-11-20';
  const initialCheckOut = searchParams.get('checkOut') || '2026-11-22';
  const initialAdults = parseInt(searchParams.get('adults') || '2', 10);
  const initialChildren = parseInt(searchParams.get('children') || '0', 10);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [checkInDate, setCheckInDate] = useState<string>(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<string>(initialCheckOut);
  const [adults, setAdults] = useState<number>(initialAdults);
  const [children, setChildren] = useState<number>(initialChildren);

  // Add-ons
  const [addDinner, setAddDinner] = useState(false);
  const [addBonfire, setAddBonfire] = useState(false);
  const [addEarlyCheckIn, setAddEarlyCheckIn] = useState(false);
  const [addPetCare, setAddPetCare] = useState(false);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestCity, setGuestCity] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  const currentRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();

  // Pricing calculations
  const baseRoomTotal = currentRoom.price * nights;
  const extraGuests = Math.max(0, adults - 2);
  const extraGuestFee = extraGuests * 800 * nights;

  const dinnerFee = addDinner ? adults * 450 * nights : 0;
  const bonfireFee = addBonfire ? 800 : 0;
  const earlyCheckInFee = addEarlyCheckIn ? 500 : 0;
  const petFee = addPetCare ? 400 : 0;

  const subTotal = baseRoomTotal + extraGuestFee + dinnerFee + bonfireFee + earlyCheckInFee + petFee;
  const gst = Math.round(subTotal * 0.12);
  const grandTotal = subTotal + gst;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else if (step === 2) {
      if (!guestName || !guestPhone) {
        alert('Please provide your name and contact phone number.');
        return;
      }
      const refId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(refId);
      setStep(3);
      window.scrollTo({ top: 200, behavior: 'smooth' });

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // graceful fallback if canvas blocked
      }
    }
  };

  const formatWhatsAppText = () => {
    const text = `*New Reservation Request - Tarangan Resort, Nagaon*
Reference: ${bookingRef}
Guest: ${guestName}
Phone: ${guestPhone}
Email: ${guestEmail || 'N/A'}
From City: ${guestCity || 'N/A'}

*Room:* ${currentRoom.title}
*Dates:* ${checkInDate} to ${checkOutDate} (${nights} Night${nights > 1 ? 's' : ''})
*Guests:* ${adults} Adults${children > 0 ? `, ${children} Children` : ''}

*Add-ons:*
${addDinner ? '• Authentic Seafood Dinner Thali\n' : ''}${addBonfire ? '• Evening Bonfire Setup\n' : ''}${addEarlyCheckIn ? '• Early Check-In Request\n' : ''}${addPetCare ? '• Pet Friendly Stay\n' : ''}
*Total Estimated Amount:* ₹${grandTotal.toLocaleString()} (incl. 12% GST)

*Special Request:* ${specialRequests || 'None'}

Please confirm availability and share bank/UPI payment details for confirmation.`;
    return encodeURIComponent(text);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div className={styles.engineWrapper}>
      {/* Progress Steps Header */}
      <div className={styles.stepsBar}>
        <div className={`${styles.stepItem} ${step >= 1 ? styles.activeStep : ''}`}>
          <span className={styles.stepNum}>1</span>
          <span className={styles.stepTitle}>Select Room & Dates</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.stepItem} ${step >= 2 ? styles.activeStep : ''}`}>
          <span className={styles.stepNum}>2</span>
          <span className={styles.stepTitle}>Guest Info & Add-ons</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.stepItem} ${step === 3 ? styles.activeStep : ''}`}>
          <span className={styles.stepNum}>3</span>
          <span className={styles.stepTitle}>Confirmation Voucher</span>
        </div>
      </div>

      <div className={styles.engineGrid}>
        {/* Left Column: Form Steps */}
        <div className={styles.formCol}>
          {step === 1 && (
            <div className={styles.stepBox}>
              {placeParam && (
                <div className={styles.placeNoticeBadge}>
                  <Sparkles size={14} color="#C59A78" />
                  <span>
                    Selected Destination / Place: <strong>{placeParam}</strong> (Tarangan Resort Nagaon)
                  </span>
                </div>
              )}
              <h3 className={styles.boxTitle}>1. Choose Accommodation</h3>
              <p className={styles.boxSub}>
                Select from our 12 air-conditioned cottages overlooking the pool and gardens.
              </p>

              {/* Room Cards Selector */}
              <div className={styles.roomSelectGrid}>
                {ROOMS_DATA.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  return (
                    <div
                      key={room.id}
                      className={`${styles.roomSelectItem} ${
                        isSelected ? styles.selectedRoom : ''
                      }`}
                      onClick={() => setSelectedRoomId(room.id)}
                    >
                      <div
                        className={styles.roomThumb}
                        style={{ backgroundImage: `url(${room.images[0]})` }}
                      />
                      <div className={styles.roomSelectInfo}>
                        <div className={styles.roomCategoryTag}>{room.category}</div>
                        <h4 className={styles.roomSelectName}>{room.title}</h4>
                        <div className={styles.roomSelectMeta}>
                          <span>Up to {room.maxGuests} guests</span> • <span>{room.sizeSqFt} sq.ft</span>
                        </div>
                        <div className={styles.roomSelectPrice}>
                          <strong>₹{room.price.toLocaleString()}</strong> / night
                        </div>
                      </div>
                      <div className={styles.checkCircle}>
                        {isSelected && <Check size={16} color="#FFFFFF" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Date & Guest Selectors */}
              <h3 className={styles.boxTitle} style={{ marginTop: 32 }}>
                2. Travel Dates & Guests
              </h3>

              <div className={styles.datesGrid}>
                <div className={styles.inputGroup}>
                  <label>
                    <Calendar size={15} /> Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                  <span className={styles.fieldHint}>Check-in starts at 12:00 PM</span>
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    <Calendar size={15} /> Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                  <span className={styles.fieldHint}>Check-out by 10:30 AM</span>
                </div>
              </div>

              <div className={styles.guestsGrid}>
                <div className={styles.inputGroup}>
                  <label>
                    <Users size={15} /> Adults (12+ yrs)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} Adult{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    <Users size={15} /> Children (0-11 yrs)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        {num} Child{num !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.primaryNextBtn}
                  onClick={handleNextStep}
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepBox}>
              <h3 className={styles.boxTitle}>Guest Information</h3>
              <p className={styles.boxSub}>
                Please provide primary guest contact details for reservation voucher.
              </p>

              <div className={styles.guestInputs}>
                <div className={styles.inputGroup}>
                  <label>Primary Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98200 12345"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@gmail.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>City of Residence</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune / Mumbai"
                    value={guestCity}
                    onChange={(e) => setGuestCity(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>Special Requests / Arrival Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Traveling with pet, poolside cottage preferred, Jain food requirement..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </div>

              {/* Optional Add-ons */}
              <h3 className={styles.boxTitle} style={{ marginTop: 32 }}>
                Custom Add-ons & Experiences
              </h3>

              <div className={styles.addonsList}>
                <label className={styles.addonCard}>
                  <input
                    type="checkbox"
                    checked={addDinner}
                    onChange={(e) => setAddDinner(e.target.checked)}
                  />
                  <div className={styles.addonIcon}>
                    <Utensils size={20} color="#C59A78" />
                  </div>
                  <div className={styles.addonContent}>
                    <div className={styles.addonTitleRow}>
                      <span className={styles.addonName}>
                        Authentic Konkani Seafood Dinner Thali
                      </span>
                      <span className={styles.addonPrice}>+₹450 / person / night</span>
                    </div>
                    <p className={styles.addonDesc}>
                      Includes choice of fresh Surmai fry or Pomfret masala thali with Solkadhi, chapatis, and rice.
                    </p>
                  </div>
                </label>

                <label className={styles.addonCard}>
                  <input
                    type="checkbox"
                    checked={addBonfire}
                    onChange={(e) => setAddBonfire(e.target.checked)}
                  />
                  <div className={styles.addonIcon}>
                    <Flame size={20} color="#E27D60" />
                  </div>
                  <div className={styles.addonContent}>
                    <div className={styles.addonTitleRow}>
                      <span className={styles.addonName}>Evening Private Lawn Bonfire</span>
                      <span className={styles.addonPrice}>+₹800 (One-time)</span>
                    </div>
                    <p className={styles.addonDesc}>
                      Exclusive campfire setup on our coconut lawn with evening music and seating.
                    </p>
                  </div>
                </label>

                <label className={styles.addonCard}>
                  <input
                    type="checkbox"
                    checked={addEarlyCheckIn}
                    onChange={(e) => setAddEarlyCheckIn(e.target.checked)}
                  />
                  <div className={styles.addonIcon}>
                    <Clock size={20} color="#175A67" />
                  </div>
                  <div className={styles.addonContent}>
                    <div className={styles.addonTitleRow}>
                      <span className={styles.addonName}>Early Check-In Priority (10:00 AM)</span>
                      <span className={styles.addonPrice}>+₹500</span>
                    </div>
                    <p className={styles.addonDesc}>
                      Subject to previous night room readiness; includes welcome tea.
                    </p>
                  </div>
                </label>

                <label className={styles.addonCard}>
                  <input
                    type="checkbox"
                    checked={addPetCare}
                    onChange={(e) => setAddPetCare(e.target.checked)}
                  />
                  <div className={styles.addonIcon}>
                    <Heart size={20} color="#10B981" />
                  </div>
                  <div className={styles.addonContent}>
                    <div className={styles.addonTitleRow}>
                      <span className={styles.addonName}>Pet Stay & Ground-Floor Cottage</span>
                      <span className={styles.addonPrice}>+₹400</span>
                    </div>
                    <p className={styles.addonDesc}>
                      Reserved ground floor unit with immediate lawn access and fresh boiled food bowls.
                    </p>
                  </div>
                </label>
              </div>

              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className={styles.primaryNextBtn}
                  onClick={handleNextStep}
                >
                  <span>Confirm & Generate Voucher</span>
                  <Check size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.voucherBox} id="booking-voucher">
              <div className={styles.voucherHeader}>
                <div className={styles.voucherBrand}>
                  <img
                    src="/logo.png"
                    alt="Tarangan Resort"
                    className={styles.voucherLogoImg}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h2 className={styles.voucherResortName}>TARANGAN RESORT</h2>
                    <span className={styles.voucherLoc}>Palhe, Nagaon-Alibag, Maharashtra</span>
                  </div>
                </div>

                <div className={styles.voucherBadge}>
                  <span className={styles.badgeLabel}>Booking Reference</span>
                  <strong className={styles.badgeVal}>{bookingRef}</strong>
                </div>
              </div>

              <div className={styles.voucherSuccessMsg}>
                <Sparkles size={20} color="#C59A78" />
                <span>
                  Reservation Voucher Generated Successfully for <strong>{guestName}</strong>!
                </span>
              </div>

              <div className={styles.voucherGrid}>
                <div className={styles.voucherItem}>
                  <span className={styles.vLabel}>Accommodation</span>
                  <span className={styles.vValue}>{currentRoom.title}</span>
                </div>
                <div className={styles.voucherItem}>
                  <span className={styles.vLabel}>Duration</span>
                  <span className={styles.vValue}>
                    {nights} Night{nights > 1 ? 's' : ''} ({checkInDate} to {checkOutDate})
                  </span>
                </div>
                <div className={styles.voucherItem}>
                  <span className={styles.vLabel}>Guests</span>
                  <span className={styles.vValue}>
                    {adults} Adults{children > 0 ? `, ${children} Children` : ''}
                  </span>
                </div>
                <div className={styles.voucherItem}>
                  <span className={styles.vLabel}>Contact Number</span>
                  <span className={styles.vValue}>{guestPhone}</span>
                </div>
              </div>

              {/* Add-ons summary */}
              {(addDinner || addBonfire || addEarlyCheckIn || addPetCare) && (
                <div className={styles.voucherAddons}>
                  <span className={styles.vLabel}>Included Add-ons:</span>
                  <ul>
                    {addDinner && <li>Authentic Coastal Seafood Dinner Thali</li>}
                    {addBonfire && <li>Evening Private Lawn Bonfire Setup</li>}
                    {addEarlyCheckIn && <li>Early Check-in Priority</li>}
                    {addPetCare && <li>Pet-Friendly Room Setup</li>}
                  </ul>
                </div>
              )}

              <div className={styles.voucherTotalRow}>
                <div>
                  <span className={styles.totalText}>Total Estimated Amount (incl. 12% GST)</span>
                  <span className={styles.totalHint}>Payable directly upon check-in or via advance UPI link</span>
                </div>
                <div className={styles.totalAmount}>₹{grandTotal.toLocaleString()}</div>
              </div>

              {/* Action Buttons for Step 3 */}
              <div className={styles.voucherActions}>
                <a
                  href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${formatWhatsAppText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappConfirmBtn}
                >
                  <MessageCircle size={18} />
                  <span>Send Confirmation to Resort on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrintVoucher}
                  className={styles.printBtn}
                >
                  <Download size={16} />
                  <span>Save / Print Voucher</span>
                </button>
              </div>

              <div className={styles.voucherFooterNotes}>
                <p>
                  <strong>Check-in:</strong> 12:00 PM | <strong>Check-out:</strong> 10:30 AM
                </p>
                <p>
                  Address: Sahan Bypass Road, Palhe, Nagaon, Alibag, Maharashtra 402204 • Helpdesk: {RESORT_DATA.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Booking Summary Card */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <div
              className={styles.summaryImg}
              style={{ backgroundImage: `url(${currentRoom.images[0]})` }}
            >
              <div className={styles.summaryPriceTag}>
                ₹{currentRoom.price.toLocaleString()} / night
              </div>
            </div>

            <div className={styles.summaryBody}>
              <span className={styles.summaryCategory}>{currentRoom.category}</span>
              <h4 className={styles.summaryTitle}>{currentRoom.title}</h4>
              <p className={styles.summaryView}>
                <Waves size={13} color="#C59A78" /> {currentRoom.view}
              </p>

              <div className={styles.summaryBreakdown}>
                <div className={styles.breakRow}>
                  <span>Check-in:</span>
                  <strong>{checkInDate}</strong>
                </div>
                <div className={styles.breakRow}>
                  <span>Check-out:</span>
                  <strong>{checkOutDate}</strong>
                </div>
                <div className={styles.breakRow}>
                  <span>Length of Stay:</span>
                  <strong>
                    {nights} Night{nights > 1 ? 's' : ''}
                  </strong>
                </div>
                <div className={styles.breakRow}>
                  <span>Guests:</span>
                  <strong>
                    {adults} Adults{children > 0 ? `, ${children} Kids` : ''}
                  </strong>
                </div>
              </div>

              <div className={styles.priceLines}>
                <div className={styles.priceLine}>
                  <span>
                    ₹{currentRoom.price.toLocaleString()} × {nights} nights
                  </span>
                  <span>₹{baseRoomTotal.toLocaleString()}</span>
                </div>

                {extraGuestFee > 0 && (
                  <div className={styles.priceLine}>
                    <span>Extra Guests ({extraGuests} person)</span>
                    <span>₹{extraGuestFee.toLocaleString()}</span>
                  </div>
                )}

                {dinnerFee > 0 && (
                  <div className={styles.priceLine}>
                    <span>Seafood Dinner Thalis</span>
                    <span>₹{dinnerFee.toLocaleString()}</span>
                  </div>
                )}

                {bonfireFee > 0 && (
                  <div className={styles.priceLine}>
                    <span>Evening Bonfire Setup</span>
                    <span>₹{bonfireFee.toLocaleString()}</span>
                  </div>
                )}

                {earlyCheckInFee > 0 && (
                  <div className={styles.priceLine}>
                    <span>Early Check-In</span>
                    <span>₹{earlyCheckInFee.toLocaleString()}</span>
                  </div>
                )}

                {petFee > 0 && (
                  <div className={styles.priceLine}>
                    <span>Pet Friendly Stay</span>
                    <span>₹{petFee.toLocaleString()}</span>
                  </div>
                )}

                <div className={styles.priceLine}>
                  <span>Taxes (12% GST)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>

                <div className={styles.totalRow}>
                  <span>Estimated Total</span>
                  <span className={styles.finalTotal}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.summaryGuarantees}>
                <div className={styles.guaranteeItem}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>Free Cancellation up to 72 hours prior</span>
                </div>
                <div className={styles.guaranteeItem}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>No payment required right now</span>
                </div>
              </div>

              <div className={styles.directHelpdesk}>
                <span>Need quick reservation assistance?</span>
                <a href={`tel:${RESORT_DATA.phone}`}>
                  <Phone size={14} /> Call {RESORT_DATA.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
