import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  Navigation,
  Ship,
  Car,
  Compass,
  Phone,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './LocationPage.module.scss';

export const metadata: Metadata = {
  title: 'Location & How to Reach | Tarangan Resort Nagaon-Alibag',
  description:
    'Directions to Tarangan Resort on Sahan Bypass Road, Palhe, Nagaon, Alibag. Guide for Mandwa Ro-Ro car ferry, Mumbai-Goa highway, and travel distances to Nagaon Beach.',
};

export default function LocationPage() {
  const routes = [
    {
      title: 'From Mumbai: Mandwa Ro-Ro Car Ferry (Recommended)',
      icon: <Ship size={24} color="#175A67" />,
      time: 'Approx. 2 hours total',
      desc: 'Drive your vehicle directly onto the M2M Ro-Ro ferry at Bhaucha Dhakka (Ferry Wharf, Mazgaon, Mumbai). Enjoy a breezy 60-minute sea sail across Mumbai Harbor to Mandwa Jetty. From Mandwa, enjoy a smooth 38 km drive southward on the Alibag-Revdanda bypass directly to Palhe, Nagaon.',
      points: [
        'Vehicle + Passenger tickets can be booked online via M2M Ferries',
        'Air-conditioned lounges and open-air decks on board',
        'Scenic coastal drive from Mandwa to resort bypassing Alibaug town traffic',
      ],
    },
    {
      title: 'From Mumbai: Speedboat / Passenger Ferry (Foot Passengers)',
      icon: <Ship size={24} color="#175A67" />,
      time: 'Approx. 1.5 - 2 hours',
      desc: 'Board regular catamarans (PNP, Maldar, or Ajanta) from the Gateway of India to Mandwa Jetty (approx. 45-55 mins). Connecting buses take you to Alibaug bus depot, from where local auto-rickshaws reach Tarangan Resort in 15 minutes.',
      points: [
        'Frequent departures every hour from Gateway of India',
        'Local auto-rickshaw fare from Alibaug depot to Palhe is approx. ₹150 - ₹200',
      ],
    },
    {
      title: 'From Mumbai by Road (via NH 66)',
      icon: <Car size={24} color="#C59A78" />,
      time: 'Approx. 3 to 3.5 hours (100 km)',
      desc: 'Route: Mumbai → Navi Mumbai (Vashi / Atal Setu MTHL) → Panvel → Pen → Wadkhal Naka → Dharamtar Bridge → Alibaug Bypass → Sahan Bypass Road, Palhe.',
      points: [
        'New Atal Setu (MTHL) bridge cuts travel time from South & Central Mumbai by 45 mins',
        'Well-paved multi-lane highways up to Wadkhal',
      ],
    },
    {
      title: 'From Pune by Road (via Expressway)',
      icon: <Car size={24} color="#C59A78" />,
      time: 'Approx. 3.5 hours (140 km)',
      desc: 'Route: Pune → Mumbai-Pune Expressway → Khopoli Exit → Khalapur Toll → Pen → Poynad → Sahan Bypass Road, Palhe, Nagaon.',
      points: [
        'Scenic ghat descent through picturesque Konkani valleys',
        'Multiple restaurants and fuel pumps along the route',
      ],
    },
  ];

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Travel Guide</span>
          </div>
          <h1 className={styles.bannerTitle}>Location & Directions</h1>
          <p className={styles.bannerSub}>
            Find your way to Tarangan Resort on Sahan Bypass Road, Palhe, Nagaon, Alibag.
          </p>
        </div>
      </section>

      {/* Main Location Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {/* Top Address Card */}
          <div className={styles.addressBanner}>
            <div className={styles.addressInfo}>
              <div className={styles.mapPinCircle}>
                <MapPin size={28} color="#C59A78" />
              </div>
              <div>
                <span className={styles.resortLegal}>The Tarangan Resort</span>
                <h2 className={styles.resortAddressHeading}>{RESORT_DATA.address.full}</h2>
                <p className={styles.landmarkText}>
                  Landmark: Near Sahan Bypass Road & Palhe Post, 4.1 km from Nagaon Beach
                </p>
              </div>
            </div>

            <div className={styles.addressActions}>
              <a
                href={RESORT_DATA.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openMapsBtn}
              >
                <Navigation size={16} />
                <span>Open in Google Maps</span>
                <ArrowUpRight size={15} />
              </a>

              <a href={`tel:${RESORT_DATA.phone}`} className={styles.callHelpdeskBtn}>
                <Phone size={16} />
                <span>Call Desk: {RESORT_DATA.phone}</span>
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div className={styles.mapFrame}>
            <iframe
              title="Google Map Tarangan Resort"
              src="https://maps.google.com/maps?q=Tarangan+Resort+Sahan+Bypass+Road+Palhe+Nagaon+Alibag&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>

          {/* Travel Routes Grid */}
          <div className={styles.routesContainer}>
            <h2 className={styles.routesHeading}>How to Reach Tarangan Resort</h2>
            <div className={styles.routesGrid}>
              {routes.map((rt, i) => (
                <div key={i} className={styles.routeCard}>
                  <div className={styles.routeHeader}>
                    <div className={styles.routeIcon}>{rt.icon}</div>
                    <div>
                      <h3 className={styles.routeTitle}>{rt.title}</h3>
                      <span className={styles.routeTime}>{rt.time}</span>
                    </div>
                  </div>
                  <p className={styles.routeDesc}>{rt.desc}</p>
                  <ul className={styles.routePoints}>
                    {rt.points.map((pt, j) => (
                      <li key={j}>
                        <CheckCircle2 size={15} color="#C59A78" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
