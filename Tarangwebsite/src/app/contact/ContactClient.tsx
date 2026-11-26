'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './ContactPage.module.scss';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiry = () => {
    const text = encodeURIComponent(
      `Hello Tarangan Resort! My name is ${name || 'Guest'}. Phone: ${phone}. ${message || 'I would like to inquire about cottage availability.'}`
    );
    return `https://wa.me/${RESORT_DATA.whatsapp}?text=${text}`;
  };

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>We are Here to Assist You</span>
          </div>
          <h1 className={styles.bannerTitle}>Contact Tarangan Resort</h1>
          <p className={styles.bannerSub}>
            Reach out directly for room reservations, weekend getaways, group event planning, or travel directions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Left: Interactive Inquiry Form */}
            <div className={styles.formCol}>
              <div className={styles.formBox}>
                <h2 className={styles.formTitle}>Send Us an Inquiry</h2>
                <p className={styles.formSub}>
                  Fill in your details below and our front desk will get back to you within 30 minutes.
                </p>

                {submitted ? (
                  <div className={styles.successBox}>
                    <CheckCircle2 size={36} color="#10B981" />
                    <h3>Thank you for reaching out, {name}!</h3>
                    <p>
                      We have received your message. You can also message us directly on WhatsApp for an immediate response.
                    </p>
                    <a
                      href={whatsappInquiry()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappDirectBtn}
                    >
                      <MessageCircle size={18} />
                      <span>Continue to WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Joshi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className={styles.rowInputs}>
                      <div className={styles.inputGroup}>
                        <label>Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 077568 38900"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. vikram@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>How Can We Help You? *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Inquire about dates, room rates, pet policy, group booking, or seafood menu..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <Send size={16} />
                      <span>Submit Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Contact Information Cards */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoHeading}>Direct Helpdesk</h3>

                <div className={styles.contactItem}>
                  <div className={styles.itemIcon}>
                    <Phone size={20} color="#C59A78" />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Call Resort Reception</span>
                    <a href={`tel:${RESORT_DATA.phone}`} className={styles.itemVal}>
                      {RESORT_DATA.formattedPhone}
                    </a>
                    <span className={styles.itemHint}>Available 07:00 AM – 11:00 PM</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.itemIcon}>
                    <MessageCircle size={20} color="#25D366" />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>WhatsApp Instant Chat</span>
                    <a
                      href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                        RESORT_DATA.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.itemVal}
                    >
                      +91 77568 38900
                    </a>
                    <span className={styles.itemHint}>Instant room availability & photos</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.itemIcon}>
                    <Mail size={20} color="#C59A78" />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Official Email</span>
                    <a href={`mailto:${RESORT_DATA.email}`} className={styles.itemVal}>
                      {RESORT_DATA.email}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.itemIcon}>
                    <MapPin size={20} color="#C59A78" />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Property Address</span>
                    <span className={styles.itemValText}>{RESORT_DATA.address.full}</span>
                    <span className={styles.itemHint}>
                      Near Sahan Bypass Road, Palhe, Nagaon
                    </span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.itemIcon}>
                    <Clock size={20} color="#C59A78" />
                  </div>
                  <div>
                    <span className={styles.itemLabel}>Check-In & Check-Out</span>
                    <span className={styles.itemValText}>
                      Check-In: 12:00 PM | Check-Out: 10:30 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Frame */}
          <div className={styles.mapSection}>
            <iframe
              title="Tarangan Resort Map"
              src="https://maps.google.com/maps?q=Tarangan+Resort+Sahan+Bypass+Road+Palhe+Nagaon+Alibag&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 20 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
