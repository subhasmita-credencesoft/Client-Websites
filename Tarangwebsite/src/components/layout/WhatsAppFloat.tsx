'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';
import styles from './WhatsAppFloat.module.scss';

export default function WhatsAppFloat() {
  const [bubbleOpen, setBubbleOpen] = useState(true);

  return (
    <div className={styles.wrapper}>
      {bubbleOpen && (
        <div className={styles.chatBubble}>
          <button
            type="button"
            className={styles.closeBubbleBtn}
            onClick={() => setBubbleOpen(false)}
            aria-label="Dismiss message"
          >
            <X size={14} />
          </button>
          <div className={styles.bubbleHeader}>
            <span className={styles.onlineDot} />
            <span className={styles.sender}>Tarangan Resort Reception</span>
          </div>
          <p className={styles.bubbleText}>
            Planning a trip to Nagaon, Alibaug? Chat directly with us on WhatsApp for the best room rates & weekend packages!
          </p>
          <a
            href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
              'Hi Tarangan Resort, I am planning a trip to Alibaug and would like to check room availability!'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bubbleAction}
          >
            Chat Now
          </a>
        </div>
      )}

      <a
        href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
          RESORT_DATA.whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatBtn}
        aria-label="Contact Tarangan Resort on WhatsApp"
        title="Chat on WhatsApp (+91 77568 38900)"
      >
        <MessageCircle size={28} />
        <span className={styles.pulseRing} />
      </a>
    </div>
  );
}
