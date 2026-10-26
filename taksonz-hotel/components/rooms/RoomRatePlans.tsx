"use client";

import { Check, Coffee, Sparkles, Utensils, AlertCircle } from "lucide-react";
import { formatINR, type Room } from "@/data/rooms";
import { buildBookingUrl } from "@/data/site";
import styles from "./RoomRatePlans.module.scss";

interface Props {
  room: Room;
}

export function RoomRatePlans({ room }: Props) {
  const plans = room.ratePlans || [];
  const lowestPrice = room.fromRate;
  const isLimited = typeof room.availableRooms === "number" && room.availableRooms <= 3 && room.availableRooms > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Available Plans & Rates</h2>
          <p className={styles.sub}>Choose your preferred meal plan and rate option. All prices fetched live from the hotel system.</p>
        </div>

        {typeof room.availableRooms === "number" && (
          <div className={[styles.badge, isLimited ? styles.badgeUrgent : styles.badgeNormal].join(" ")}>
            {isLimited ? <AlertCircle size={16} /> : <Check size={16} />}
            <span>
              {isLimited
                ? `Only ${room.availableRooms} ${room.availableRooms === 1 ? "room" : "rooms"} left!`
                : `${room.availableRooms} rooms available`}
            </span>
          </div>
        )}
      </div>

      <div className={styles.plansGrid}>
        {plans.map((plan, idx) => {
          const isBestValue = plan.amount === lowestPrice;
          const isBreakfast = plan.isBreakfastIncluded || plan.name.toLowerCase().includes("breakfast");

          return (
            <div
              key={`${plan.code}-${idx}`}
              className={[styles.card, isBestValue ? styles.cardBest : ""].join(" ")}
            >
              {isBestValue && (
                <div className={styles.ribbon}>
                  <Sparkles size={12} /> Best Value
                </div>
              )}

              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.mealBadge}>
                    {isBreakfast ? (
                      <>
                        <Utensils size={14} />
                        <span>Breakfast Included</span>
                      </>
                    ) : (
                      <>
                        <Coffee size={14} />
                        <span>Room Only (EP)</span>
                      </>
                    )}
                  </div>
                </div>

                <div className={styles.priceBlock}>
                  <div className={styles.priceRow}>
                    <span className={styles.amount}>{formatINR(plan.amount)}</span>
                    <span className={styles.perNight}>/ night</span>
                  </div>
                  <span className={styles.taxNote}>+ applicable taxes</span>
                </div>
              </div>

              <ul className={styles.features}>
                <li>
                  <Check size={14} className={styles.checkIcon} />
                  <span>{isBreakfast ? "Complimentary daily morning breakfast" : "Comfortable room accommodation"}</span>
                </li>
                <li>
                  <Check size={14} className={styles.checkIcon} />
                  <span>High-speed Wi-Fi access included</span>
                </li>
                <li>
                  <Check size={14} className={styles.checkIcon} />
                  <span>24-Hour room service support</span>
                </li>
                {typeof plan.extraChargePerPerson === "number" && plan.extraChargePerPerson > 0 && (
                  <li className={styles.extraNote}>
                    <span>Extra guest charge: {formatINR(plan.extraChargePerPerson)} / night</span>
                  </li>
                )}
              </ul>

              <div className={styles.act}>
                <a
                  href={buildBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[styles.bookBtn, isBestValue ? styles.bookBtnPrimary : styles.bookBtnSecondary].join(" ")}
                >
                  Book this plan →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
