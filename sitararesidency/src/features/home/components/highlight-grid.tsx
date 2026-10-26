export function HighlightGrid({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <section className="highlight-grid" aria-label="Hotel highlights">
      {items.map((highlight, i) => (
        <div key={highlight.title} className="highlight-grid__item">
          <span>0{i + 1}</span>
          <h3>{highlight.title}</h3>
          <p>{highlight.description}</p>
        </div>
      ))}
    </section>
  );
}