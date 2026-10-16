import Link from 'next/link';

export default function HomeDining() {
  return (
    <section className="split-feature">
      <img src="/FOC00369.avif" alt="Fiesta all-day dining room at Hotel Krishna Palace" />
      <div className="split-feature-copy">
        <span className="eyebrow">Dining & Bar</span>
        <h2>Two distinct tables.<br />One welcoming address.</h2>
        <p>From all-day meals at Fiesta to refined spirits at Madira The Bar, taste Hosapete at your pace.</p>
        <Link className="text-link" href="/dining/">Explore dining & bar</Link>
      </div>
    </section>
  );
}
