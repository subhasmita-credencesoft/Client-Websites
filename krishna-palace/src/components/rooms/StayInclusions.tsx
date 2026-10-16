'use client';

import { useEffect, useState } from 'react';
import { fetchAvailability } from '@/lib/api/hotel';

export default function StayInclusions() {
  const [items, setItems] = useState<string[]>([]);
  const [state, setState] = useState<'loading' | 'live' | 'failed'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    setState('loading');

    fetchAvailability(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setItems(data.property.amenities);
        setState('live');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
        setState('failed');
      });

    return () => controller.abort();
  }, []);

  const status =
    state === 'failed'
      ? 'Inclusions are temporarily unavailable. Please contact the hotel directly.'
      : state === 'live'
        ? 'Inclusions are confirmed by the hotel for your stay.'
        : 'Loading inclusions…';

  return (
    <section className="section section--warm section--narrow">
      <div className="section-head">
        <div>
          <span className="eyebrow">A few comforts</span>
          <h2>Included in the stay.</h2>
        </div>
        <p>Published room inclusions to make settling in that little bit easier.</p>
      </div>
      {items.length ? (
        <ul className="feature-list" data-inclusions-source={state}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="room-list__status" data-inclusions-source={state}>
          {status}
        </p>
      )}
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 25 }}>
        The published stay is 24 hours, from 12 pm to 12 pm. For details on your specific visit, please ask our team.
      </p>
    </section>
  );
}
