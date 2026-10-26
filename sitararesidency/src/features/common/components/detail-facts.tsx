export function DetailFacts({ facts }: { facts: string[] }) {
  if (!facts.length) return null;

  return (
    <div className="room-detail-facts">
      <h3 className="room-detail-facts__title">Key details</h3>
      <ul className="room-detail-facts__list">
        {facts.map((fact) => (
          <li key={fact} className="room-detail-facts__item">
            <span className="room-detail-facts__bullet" />
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
