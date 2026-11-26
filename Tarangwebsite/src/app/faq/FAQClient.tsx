'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQ_DATA, FAQ } from '@/data/faqData';
import { RESORT_DATA } from '@/data/resortData';
import {
  ChevronDown,
  Search,
  Sparkles,
  Phone,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import styles from './FAQPage.module.scss';

export default function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = [
    'All',
    'Booking & Policies',
    'Facilities & Stay',
    'Dining & Food',
    'Location & Travel',
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.page}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContainer}>
          <div className={styles.tagBadge}>
            <Sparkles size={13} color="#F7D9C6" />
            <span>Help Center</span>
          </div>
          <h1 className={styles.bannerTitle}>Frequently Asked Questions</h1>
          <p className={styles.bannerSub}>
            Everything you need to know about staying at Tarangan Resort, our cottages, amenities, dining, and travel.
          </p>
        </div>
      </section>

      {/* FAQ Main Content */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          {/* Search Box */}
          <div className={styles.searchWrap}>
            <div className={styles.searchBox}>
              <Search size={20} color="#C59A78" />
              <input
                type="text"
                placeholder="Search by keywords (e.g. pool, pet, beach, check-in, seafood)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.tabBtn} ${
                  activeCategory === cat ? styles.activeTab : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className={styles.accordionList}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.questionBtn}
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className={styles.questionText}>{faq.question}</span>
                      <div className={styles.chevronWrap}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className={styles.answerBox}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={styles.noResults}>
                <HelpCircle size={36} color="#C59A78" />
                <h3>No matching answers found</h3>
                <p>Try a different keyword or contact our desk directly on WhatsApp.</p>
              </div>
            )}
          </div>

          {/* Helpdesk Strip */}
          <div className={styles.helpdeskStrip}>
            <div>
              <h3>Still have questions?</h3>
              <p>Our friendly front desk is always glad to assist you.</p>
            </div>
            <div className={styles.helpdeskBtns}>
              <a
                href={`https://wa.me/${RESORT_DATA.whatsapp}?text=${encodeURIComponent(
                  'Hi Tarangan Resort, I have a question regarding my upcoming booking!'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Desk</span>
              </a>
              <a href={`tel:${RESORT_DATA.phone}`} className={styles.callBtn}>
                <Phone size={16} />
                <span>Call {RESORT_DATA.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
