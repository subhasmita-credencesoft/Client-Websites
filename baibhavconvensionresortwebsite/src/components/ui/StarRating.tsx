interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 14 }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} aria-label={`Rated ${rating} out of 5`}>
      <div style={{ display: 'flex', gap: 1 }}>
        {stars.map((filled, i) => (
          <iconify-icon
            key={i}
            icon="solar:star-bold"
            width={size}
            style={{ color: filled ? '#111111' : '#e7e7e7' }}
            aria-hidden="true"
          />
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
        {rating.toFixed(1)}
        {typeof reviewCount === 'number' && ` (${reviewCount})`}
      </span>
    </div>
  );
}
