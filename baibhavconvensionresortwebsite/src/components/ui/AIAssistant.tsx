'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/AIAssistant.module.scss';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  href?: string;
  hrefLabel?: string;
}

const GREETING: ChatMessage = {
  from: 'bot',
  text: 'Hi! I\u2019m Baibhab Assistant. How can I help you today?',
};

const QUICK_REPLIES = [
  { label: 'Check availability', text: 'I\u2019d like to check room availability' },
  { label: 'Plan an event', text: 'I want to plan a wedding or event' },
  { label: 'View offers', text: 'What offers do you have?' },
  { label: 'Contact us', text: 'How can I contact you?' },
];

const getReply = (input: string): ChatMessage => {
  const q = input.toLowerCase();
  if (/(availability|available|book|room|stay|vacancy|check|rate)/.test(q)) {
    return {
      from: 'bot',
      text: 'You can check live availability and rates on our Stay page. Pick your check-in, check-out and guests, or call us for personal help.',
      href: '/stay',
      hrefLabel: 'Check availability',
    };
  }
  if (/(wedding|event|mandap|reception|corporate|mice|banquet|lawn|sangeet|mehendi)/.test(q)) {
    return {
      from: 'bot',
      text: 'We host weddings and corporate events for up to 1,500+ guests. Share your event details and our team will send a tailored proposal within 24 hours.',
      href: '/contact?inquiry=Banquets+%2F+Events',
      hrefLabel: 'Request a proposal',
    };
  }
  if (/(offer|package|deal|discount|price|cost|bundl)/.test(q)) {
    return {
      from: 'bot',
      text: 'We have bundled wedding & event packages plus seasonal stay deals. Take a look at what\u2019s currently on offer.',
      href: '/offers',
      hrefLabel: 'View offers & packages',
    };
  }
  if (/(contact|phone|call|number|whatsapp|email|reach|talk)/.test(q)) {
    return {
      from: 'bot',
      text: 'Call our reservation desk, message us on WhatsApp, or use the contact form  our team responds 24/7.',
      href: '/contact',
      hrefLabel: 'Contact us',
    };
  }
  if (/(dining|restaurant|food|menu|veg|cater|breakfast)/.test(q)) {
    return {
      from: 'bot',
      text: 'Our in-house restaurant serves Odia, North & South Indian and Continental cuisine, with pure-veg banquet catering and live counters.',
      href: '/dining',
      hrefLabel: 'Explore dining',
    };
  }
  if (/(location|address|reach|map|distance|parking|where)/.test(q)) {
    return {
      from: 'bot',
      text: 'We\u2019re right on the NH-16 highway at Phulnakhara  the midpoint between Bhubaneswar and Cuttack, with parking for 200+ vehicles.',
      href: '/location',
      hrefLabel: 'See location & directions',
    };
  }
  if (/(amenit|pool|swim|wifi|internet|backup|security|gym|spa)/.test(q)) {
    return {
      from: 'bot',
      text: 'We offer a swimming pool, high-speed Wi-Fi, full power backup, 24/7 security and thoughtful amenities for every guest.',
      href: '/amenities',
      hrefLabel: 'View amenities',
    };
  }
  return {
    from: 'bot',
    text: 'I can help you with room availability, events, offers, dining, amenities, location and contact details. Try one of the quick options or rephrase your question.',
  };
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }, getReply(trimmed)]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const hasQuickReplies = messages.length <= 1;

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        aria-expanded={open}
        aria-controls="ai-assistant-panel"
      >
        <iconify-icon icon="solar:chat-round-dots-bold" width="20" aria-hidden="true" />
        <span className={styles.launcherText}>How can I help you?</span>
      </button>

      {open && (
        <div className={styles.panel} id="ai-assistant-panel" role="dialog" aria-label="AI assistant">
          <div className={styles.header}>
            <div className={styles.headerTitleWrap}>
              <iconify-icon icon="solar:chat-round-dots-bold" width="18" aria-hidden="true" />
              <div>
                <p className={styles.headerTitle}>Baibhab Assistant</p>
                <p className={styles.headerSub}>Online replies instantly</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <iconify-icon icon="solar:close-circle-bold" width="22" aria-hidden="true" />
            </button>
          </div>

          <div className={styles.messages} ref={messagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${styles[msg.from]}`}>
                <p className={styles.bubbleText}>{msg.text}</p>
                {msg.href && (
                  <Link href={msg.href} className={styles.bubbleLink} onClick={() => setOpen(false)}>
                    {msg.hrefLabel}
                    <iconify-icon icon="solar:arrow-right-linear" width="14" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {hasQuickReplies && (
            <div className={styles.quickReplies}>
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.label}
                  type="button"
                  className={styles.quickReply}
                  onClick={() => send(reply.text)}
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <form className={styles.inputRow} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Type your question\u2026"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask the assistant"
            />
            <button type="submit" className={styles.sendButton} aria-label="Send message">
              <iconify-icon icon="solar:plain-bold" width="18" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
