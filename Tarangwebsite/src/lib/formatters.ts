/**
 * Standardized data formatting utilities for the Tarangan Resort web application.
 */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateReadable(isoDateStr: string): string {
  try {
    const d = new Date(isoDateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoDateStr;
  }
}

export function formatPhoneNumber(phone: string): string {
  // Cleans and normalizes phone number
  return phone.replace(/[^\d+]/g, '');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
