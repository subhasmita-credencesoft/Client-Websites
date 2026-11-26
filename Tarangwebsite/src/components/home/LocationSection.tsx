'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Car, Ship, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './LocationSection.module.scss';

export default function LocationSection() {
  const distances = [
    { name: 'Nagaon Beach (Water Sports Hub)', dist: '4.1 km', time: '8 mins' },
    { name: 'Akshi Beach (Quiet Bird Sanctuary)', dist: '5.0 km', time: '10 mins' },
    { name: 'Alibaug City & Kolaba Sea Fort', dist: '8.7 km', time: '18 mins' },
    { name: 'Revdanda Beach & Portuguese Fort', dist: '11.5 km', time: '20 mins' },
    { name: 'Mandwa Jetty (Ro-Ro Car Ferry from Mumbai)', dist: '38.0 km', time: '50 mins' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#C59A78" />
            <span>Prime Coastal Location</span>
          </div>
          <h2 className={styles.title}>Conveniently Situated on Sahan Bypass Road</h2>
          <p className={styles.subtitle}>
            Peacefully positioned away from crowded tourist thoroughfares while placing all of Nagaon and Alibaug top coastal attractions within effortless reach.
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Left Details & Distance Matrix */}
          <div className={styles.infoCol}>
            <div className={styles.addressCard}>
              <div className={styles.addressHeader}>
                <div className={styles.pinIcon}>
                  <MapPin size={22} color="#C59A78" />
                </div>
                <div>
                  <h3 className={styles.resortTitle}>{RESORT_DATA.name}</h3>
                  <p className={styles.fullAddress}>{RESORT_DATA.address.full}</p>
                </div>
              </div>

              <div className={styles.actionsRow}>
                <a
                  href={RESORT_DATA.address.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapDirectBtn}
                >
                  <Navigation size={15} />
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={14} />
                </a>

                <a href={`tel:${RESORT_DATA.phone}`} className={styles.phoneDirectBtn}>
                  <Phone size={15} />
                  <span>{RESORT_DATA.phone}</span>
                </a>
              </div>
            </div>

            {/* Travel Modes */}
            <div className={styles.travelModes}>
              <div className={styles.modeCard}>
                <div className={styles.modeIcon}>
                  <Ship size={20} color="#175A67" />
                </div>
                <div>
                  <h4 className={styles.modeTitle}>From Mumbai (Fastest: Ro-Ro Ferry)</h4>
                  <p className={styles.modeText}>
                    Board M2M Ro-Ro ferry with your car from Bhaucha Dhakka, Mumbai to Mandwa (60 mins). Then drive 38 km south along the Alibag-Revdanda bypass to Palhe, Nagaon.
                  </p>
                </div>
              </div>

              <div className={styles.modeCard}>
                <div className={styles.modeIcon}>
                  <Car size={20} color="#C59A78" />
                </div>
                <div>
                  <h4 className={styles.modeTitle}>From Pune (via Expressway)</h4>
                  <p className={styles.modeText}>
                    Drive via Mumbai-Pune Expressway → Khopoli exit → Pen → Wadkhal Naka → Alibaug bypass road to Sahan Bypass Road, Palhe (approx. 3.5 hrs / 140 km).
                  </p>
                </div>
              </div>
            </div>

            {/* Distance Matrix Table */}
            <div className={styles.matrixBox}>
              <h4 className={styles.matrixTitle}>Nearby Landmarks & Travel Times</h4>
              <div className={styles.matrixList}>
                {distances.map((item, idx) => (
                  <div key={idx} className={styles.matrixItem}>
                    <span className={styles.landmarkName}>{item.name}</span>
                    <div className={styles.distData}>
                      <span className={styles.kmBadge}>{item.dist}</span>
                      <span className={styles.timeBadge}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Google Maps Embed */}
          <div className={styles.mapCol}>
            <div className={styles.mapFrameWrapper}>
              <iframe
                title="Tarangan Resort Location Map"
                src="https://maps.google.com/maps?q=Tarangan+Resort+Sahan+Bypass+Road+Palhe+Nagaon+Alibag&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className={styles.mapOverlayPill}>
                <span className={styles.greenDot} />
                <span>Tarangan Resort • Palhe, Nagaon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
