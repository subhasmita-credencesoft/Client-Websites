import SectionHead from '@/components/sections/shared/SectionHead';
import { madiraDetails } from '@/data/pages/madira';

export default function MadiraDetails() {
  return (
    <section className="section section--warm">
      <SectionHead
        eyebrow="At A Glance"
        title="Details & Service Information"
        body="Key information for your visit to Madira The Bar."
      />

      <div className="details-grid">
        {madiraDetails.map((detail) => (
          <div className="detail-item" key={detail.label}>
            <span className="detail-label">{detail.label}</span>
            <strong className="detail-val">{detail.value}</strong>
          </div>
        ))}
      </div>

      <div className="note" style={{ marginTop: 28 }}>
        <strong>Service note:</strong> Current beverage reserves, spirits and seasonal culinary dishes are presented directly at the venue. To enquire about specific selections or host a private gathering, please contact the hotel directly.
      </div>
    </section>
  );
}
