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
  text: 'Hi! I’m Baibhab Assistant. How can I help you today?',
};

const QUICK_REPLIES = [
  { label: 'Check availability', text: 'I’d like to check room availability' },
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
      text: 'We have bundled wedding & event packages plus seasonal stay deals. Take a look at what’s currently on offer.',
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
      text: 'We’re right on the NH-16 highway at Phulnakhara — the midpoint between Bhubaneswar and Cuttack, with parking for 200+ vehicles.',
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

const AIBotAvatar = ({ size = 30 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    {/* Outer Glow Halo */}
    <circle cx="18" cy="18" r="17" fill="url(#avatarHalo)" opacity="0.25" />
    <circle cx="18" cy="18" r="16" fill="url(#avatarBg)" stroke="url(#goldBorder)" strokeWidth="1.2" />

    {/* Antenna */}
    <path d="M18 6V9.5" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="4.5" r="2" fill="#F59E0B" />
    <circle cx="18" cy="4.5" r="1" fill="#FFF" />

    {/* Ear Nodes */}
    <rect x="4" y="14" width="2.5" height="6" rx="1.25" fill="url(#goldGradient)" />
    <rect x="29.5" y="14" width="2.5" height="6" rx="1.25" fill="url(#goldGradient)" />

    {/* Bot Head Body */}
    <rect x="6.5" y="9.5" width="23" height="15" rx="5.5" fill="url(#headBody)" stroke="url(#goldBorder)" strokeWidth="1.2" />

    {/* Visor Area */}
    <rect x="9.5" y="12" width="17" height="6" rx="3" fill="#0B132B" stroke="#1E293B" strokeWidth="1" />

    {/* Glowing Eyes */}
    <circle cx="13.5" cy="15" r="2" fill="#38BDF8" />
    <circle cx="22.5" cy="15" r="2" fill="#38BDF8" />
    <circle cx="14" cy="14.3" r="0.7" fill="#FFFFFF" />
    <circle cx="23" cy="14.3" r="0.7" fill="#FFFFFF" />

    {/* Smile Arc */}
    <path
      d="M14 19.5C15.2 20.8 20.8 20.8 22 19.5"
      stroke="url(#goldGradient)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Chest Indicator Spark */}
    <circle cx="18" cy="27" r="1.5" fill="#38BDF8" />

    {/* Gradients */}
    <defs>
      <radialGradient id="avatarHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="avatarBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="headBody" x1="6.5" y1="9.5" x2="29.5" y2="24.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0D1527" />
      </linearGradient>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="goldBorder" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
  </svg>
);

const AIBotLauncherIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M16 4V7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="3" r="1.5" fill="#FCD34D" />
    <rect x="4" y="7" width="24" height="17" rx="6" fill="#0F172A" stroke="url(#launcherGold)" strokeWidth="1.5" />
    <rect x="7.5" y="10" width="17" height="6.5" rx="3.25" fill="#1E293B" />
    <circle cx="12" cy="13.25" r="2" fill="#38BDF8" />
    <circle cx="20" cy="13.25" r="2" fill="#38BDF8" />
    <circle cx="12.5" cy="12.5" r="0.75" fill="#FFFFFF" />
    <circle cx="20.5" cy="12.5" r="0.75" fill="#FFFFFF" />
    <path d="M12 18.5C13.5 20 18.5 20 20 18.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="1" y="12.5" width="3" height="6" rx="1.5" fill="#F59E0B" />
    <rect x="28" y="12.5" width="3" height="6" rx="1.5" fill="#F59E0B" />
    <defs>
      <linearGradient id="launcherGold" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
        <AIBotLauncherIcon />
        <span className={styles.launcherText}>How can I help you?</span>
      </button>

      {open && (
        <div className={styles.panel} id="ai-assistant-panel" role="dialog" aria-label="AI assistant">
          <div className={styles.header}>
            <div className={styles.headerTitleWrap}>
              <div style={{ position: 'relative', display: 'flex' }}>
                <AIBotAvatar size={34} />
                <span className={styles.onlinePulseDot} />
              </div>
              <div>
                <p className={styles.headerTitle}>Baibhab Concierge AI</p>
                <p className={styles.headerSub}>✦ Instant 24/7 Resort Assistance</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <CloseIcon />
            </button>
          </div>

          <div className={styles.messages} ref={messagesRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubbleRow} ${styles[msg.from]}`}>
                {msg.from === 'bot' && <AIBotAvatar size={28} />}
                <div className={styles.bubble}>
                  <p className={styles.bubbleText}>{msg.text}</p>
                  {msg.href && (
                    <Link href={msg.href} className={styles.bubbleLink} onClick={() => setOpen(false)}>
                      {msg.hrefLabel}
                      <ArrowRightIcon />
                    </Link>
                  )}
                </div>
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
              placeholder="Type your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Ask the assistant"
            />
            <button type="submit" className={styles.sendButton} aria-label="Send message">
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
