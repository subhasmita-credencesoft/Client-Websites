'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Phone, MessageSquare } from 'lucide-react';
import { business } from '@/core/config/business';

interface EventInquiryFormProps {
  defaultEventType?: string;
}

export function EventInquiryForm({ defaultEventType }: EventInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [userEventType, setUserEventType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guestCount: '25-50 guests',
    requirements: '',
  });

  const activeEventType = userEventType ?? defaultEventType ?? 'Ring Ceremony / Engagement (Sagai / Roka)';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hotel Sitara Residency Team,\n\nI would like to inquire about hosting an event at your property:\n- Name: ${formData.name || 'Organizer'}\n- Event Type: ${activeEventType}\n- Date: ${formData.date || 'To be decided'}\n- Estimated Guests: ${formData.guestCount}\n- Notes: ${formData.requirements || 'Standard banquet package'}\n\nPlease share hall availability and a quote proposal. Thank you!`,
  );

  return (
    <div id="event-inquiry" className="rounded-none border border-forest/20 bg-cream p-6 sm:p-10 shadow-sm scroll-mt-24">
      <div className="mb-8">
        <p className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
          Direct Event Inquiry
        </p>
        <h3 className="mt-2 font-serif text-2xl sm:text-3xl italic text-forest">
          Plan Your Event With Our Banqueting Team
        </h3>
        <p className="mt-2 text-sm text-sage-muted leading-relaxed">
          Tell us about your upcoming ring ceremony, birthday, corporate conference, or family celebration. We will confirm hall availability and provide a tailored proposal within 2 hours.
        </p>
      </div>

      {submitted ? (
        <div className="border border-terracotta/30 bg-parchment p-8 text-center sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
            <Check className="h-6 w-6 text-apricot" />
          </div>
          <h4 className="mt-4 font-serif text-2xl italic text-forest">Inquiry Received</h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-sage-muted leading-relaxed">
            Thank you, <strong className="text-forest">{formData.name}</strong>. Our banquet manager will review your date for{' '}
            <strong className="text-terracotta">{activeEventType}</strong> and reach out shortly at{' '}
            <strong className="text-forest">{formData.phone || formData.email}</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/917400432396?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-forest px-6 py-3.5 font-mono-label text-[11px] text-cream hover:bg-forest/90 transition-colors uppercase tracking-wider"
            >
              <MessageSquare className="h-4 w-4 text-apricot" /> Chat via WhatsApp
            </a>
            <a
              href={`tel:${business.phones.primary}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-forest px-6 py-3.5 font-mono-label text-[11px] text-forest hover:bg-forest hover:text-cream transition-colors uppercase tracking-wider"
            >
              <Phone className="h-4 w-4 text-terracotta" /> Call {business.phones.primaryDisplay}
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Your Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Mobile Number (Calling & WhatsApp) *
            </label>
            <input
              required
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Email Address *
            </label>
            <input
              required
              type="email"
              placeholder="e.g. event@family.com / corporate@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Function / Event Type *
            </label>
            <select
              value={activeEventType}
              onChange={(e) => setUserEventType(e.target.value)}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest focus:border-terracotta focus:outline-none font-medium"
            >
              <option value="Ring Ceremony / Engagement (Sagai / Roka)">Ring Ceremony / Engagement (Sagai / Roka)</option>
              <option value="Birthday Celebration (Kids / Milestone)">Birthday Celebration (Kids / Milestone)</option>
              <option value="Corporate Meeting, Seminar & Conference">Corporate Meeting, Seminar & Conference</option>
              <option value="Family Gathering, Reunion & Anniversary">Family Gathering, Reunion & Anniversary</option>
              <option value="Baby Shower (Godh Bharai / Dohale Jevan) & Naming Ceremony">Baby Shower (Godh Bharai) & Naming Ceremony</option>
              <option value="Haldi, Mehendi & Pre-Wedding Gathering">Haldi, Mehendi & Pre-Wedding Gathering</option>
              <option value="Executive Boardroom Meeting">Executive Boardroom Meeting</option>
              <option value="Residential Conference (Hall + Overnight Rooms)">Residential Conference (Hall + Overnight Rooms)</option>
              <option value="Other Private Social Function">Other Private Social Function</option>
            </select>
          </div>

          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Target Event Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Estimated Guest Count
            </label>
            <select
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
              className="mt-1.5 block w-full border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest focus:border-terracotta focus:outline-none"
            >
              <option value="Up to 15 delegates (Boardroom)">Up to 15 delegates (Boardroom)</option>
              <option value="15 to 30 guests">15 to 30 guests</option>
              <option value="30 to 50 guests">30 to 50 guests</option>
              <option value="50 to 75 guests (Grand Hall)">50 to 75 guests (Grand Hall)</option>
              <option value="75+ guests (Multi-hall layout)">75+ guests (Multi-hall layout)</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono-label text-[10px] uppercase tracking-wider text-forest/80">
              Specific Requirements (Decor, Stage, Catering, AV, Rooms)
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your celebration (e.g. stage floral decor for ring ceremony, cake table for birthday, projector for conference, pure veg catering, room stay requirements)..."
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="mt-1.5 block w-full resize-none border border-forest/20 bg-white px-3.5 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-terracotta focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 bg-forest px-8 py-4 font-mono-label text-xs uppercase tracking-widest text-cream hover:bg-forest/90 transition-colors shadow-sm"
            >
              Request Date & Quote Proposal <ArrowRight className="h-4 w-4 text-apricot" />
            </button>
            <p className="mt-3 text-center text-xs text-sage-muted">
              Immediate inquiry? Call our banqueting desk directly at{' '}
              <a href={`tel:${business.phones.primary}`} className="font-semibold text-terracotta underline hover:text-forest">
                {business.phones.primaryDisplay}
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
