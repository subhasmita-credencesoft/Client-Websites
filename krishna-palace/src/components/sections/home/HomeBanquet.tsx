import Link from 'next/link';
import SectionHead from '@/components/sections/shared/SectionHead';

export default function HomeBanquet() {
  return (
    <section className="section section--warm">
      <SectionHead
        eyebrow="Gather here"
        title="Room for a reason."
        body="From business meets to celebrations, our banquet venue brings people together in Hosapete."
      />
      <div className="split-feature">
        <img src="/images/05-kp-hosapete-16.jpg" alt="Banquet hall arranged in theatre style at Hotel Krishna Palace" />
        <div className="split-feature-copy">
          <span className="eyebrow">The banquet</span>
          <h2>Make it a gathering to remember.</h2>
          <p>A versatile event venue for 300+ people, with free parking and catering listed among the facilities.</p>
          <Link className="text-link" href="/banquet/">Explore the venue</Link>
        </div>
      </div>
    </section>
  );
}
