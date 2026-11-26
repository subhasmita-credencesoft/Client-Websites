import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Utensils,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { DINING_DATA } from '@/data/diningData';
import { RESORT_DATA } from '@/data/resortData';
import styles from './DiningPage.module.scss';

export const metadata: Metadata = {
  title: 'Dining & Authentic Konkani Seafood | Tarangan Resort Nagaon-Alibag',
  description:
    'Savor authentic coastal Maharashtrian cuisine at Tarangan Resort in Nagaon, Alibag. Fresh daily catch Surmai fry, Pomfret masala, Prawns curry, Kombdi Vade, and chilled Solkadhi.',
};

export default function DiningPage() {
  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Coastal Gastronomy</span>
          </div>
          <h1 className={styles.bannerTitle}>Tarangan Coastal Dining</h1>
          <p className={styles.bannerSub}>
            Authentic Maharashtrian Konkani seafood thalis, fresh Arabian sea catch, and homestyle Malvani recipes.
          </p>
        </div>
      </section>

      {/* Culinary Introduction */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <h2 className={styles.introHeading}>The Essence of Alibaug Flavors</h2>
              <p className={styles.leadPara}>{DINING_DATA.description}</p>
              <p className={styles.bodyPara}>
                Our seafood is procured daily directly from local fishermen at nearby coastal harbors. Marinated with fresh Kokum (Amsul), stone-ground ginger garlic, and hand-roasted Malvani spices, each piece of Kingfish (Surmai) and Pomfret is coated in golden semolina (rava) and pan-fried on iron griddles to achieve the signature coastal crunch.
              </p>
              <p className={styles.bodyPara}>
                Vegetarian guests are treated to traditional delicacies like rustic Pithla Bhakri, Bharli Vangi (stuffed baby brinjals), and fragrant Dal Tadka, all complemented by freshly extracted pink Solkadhi.
              </p>

              {/* Meal Service Timings */}
              <div className={styles.timingCard}>
                <h4 className={styles.timingTitle}>
                  <Clock size={16} color="#C59A78" /> Restaurant & Room Service Timings
                </h4>
                <div className={styles.timingsGrid}>
                  <div className={styles.timingItem}>
                    <strong>Breakfast:</strong> {DINING_DATA.timings.breakfast}
                  </div>
                  <div className={styles.timingItem}>
                    <strong>Lunch:</strong> {DINING_DATA.timings.lunch}
                  </div>
                  <div className={styles.timingItem}>
                    <strong>Evening High Tea:</strong> {DINING_DATA.timings.eveningSnacks}
                  </div>
                  <div className={styles.timingItem}>
                    <strong>Dinner:</strong> {DINING_DATA.timings.dinner}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.introMedia}>
              <div className={styles.mainDishBox}>
                <img
                  src="/images/dining/surmai-rava-fry.jpg"
                  alt="Surmai Rava Fry Thali at Tarangan Resort"
                />
              </div>
              <div className={styles.secondaryDishBox}>
                <img
                  src="/images/dining/konkani-fish-thali-flatlay.jpg"
                  alt="Refreshing Chilled Solkadhi and Konkani Thali"
                />
                <span className={styles.dishPill}>Authentic Thali</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Grid */}
      <section className={styles.menuSection}>
        <div className={styles.container}>
          <div className={styles.menuHeader}>
            <span className={styles.menuTag}>Specialties</span>
            <h2 className={styles.menuTitle}>Chef’s Coastal Thali Selection</h2>
            <p className={styles.menuSub}>
              Prepared hot on order with your choice of steamed rice, hot rotis, or authentic rice/jowar Bhakris.
            </p>
          </div>

          <div className={styles.menuGrid}>
            {DINING_DATA.specialties.map((item, idx) => (
              <div key={idx} className={styles.menuCard}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {item.isSpecial && <span className={styles.specialPill}>Must Try</span>}
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.categoryBadge}>{item.category}</span>
                  <h3 className={styles.dishName}>{item.name}</h3>
                  <p className={styles.dishDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Food Order Notice */}
          <div className={styles.orderNotice}>
            <div className={styles.noticeText}>
              <h4>Planning a Group Feast or Special Seafood Request?</h4>
              <p>
                Pre-order whole crab curry, lobster specials, or custom Jain / vegetarian group thalis with our culinary desk.
              </p>
            </div>
            <a
              href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                'Hi Tarangan Kitchen! I would like to inquire about dinner menu and seafood orders.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.kitchenWhatsappBtn}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Kitchen Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
