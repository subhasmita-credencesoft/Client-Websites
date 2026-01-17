export function toDateTime(date: string, time: string): Date {
  if (!date || !time) return new Date(NaN);

  const [h, m] = time.split(':');
  const hh = h.padStart(2, '0');
  const mm = m.padStart(2, '0');

  return new Date(`${date}T${hh}:${mm}:00`);
}

export function diffHours(start: Date, end: Date): number {
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return Math.max(0, diff);
}

export function diffDaysCeil(start: Date, end: Date): number {
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.ceil(diff));
}
