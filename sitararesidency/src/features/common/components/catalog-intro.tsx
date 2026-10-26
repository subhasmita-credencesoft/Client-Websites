export function CatalogIntro({
  eyebrow,
  title,
  text,
  className = '',
}: {
  eyebrow: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <section className={`rooms-intro ${className}`.trim()}>
      <div className="rooms-intro__inner">
        <div className="rooms-intro__label">
          <span className="rooms-intro__eyebrow">{eyebrow}</span>
          <div className="rooms-intro__accent-line" />
        </div>
        <div className="rooms-intro__copy">
          <h2 className="rooms-intro__heading">{title}</h2>
          <p className="rooms-intro__text">{text}</p>
        </div>
      </div>
    </section>
  );
}
