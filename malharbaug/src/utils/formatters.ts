const inrFormatter = new Intl.NumberFormat('en-IN');

export function formatPriceINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatPhone(raw: string): { e164: string; display: string } {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return { e164: `+${digits}`, display: `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` };
  }
  if (digits.length === 10) {
    return { e164: `+91${digits}`, display: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` };
  }
  if (digits.length > 0) {
    return { e164: raw.startsWith('+') ? raw : `+${digits}`, display: raw };
  }
  return { e164: '', display: '' };
}

export function formatDate(iso: string, locale = 'en-IN'): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
