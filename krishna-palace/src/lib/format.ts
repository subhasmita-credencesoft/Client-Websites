export function formatINR(value: number | null): string {
  if (value === null) return '';
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function formatStayDate(value: string | null): string | null {
  if (!value) return null;
  const parts = value.split('-');
  if (parts.length !== 3) return value;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[Number(parts[1]) - 1] ?? parts[1];
  return `${parts[2]} ${month} ${parts[0]}`;
}

export function isRoomId(value: string): boolean {
  return /^\d+$/.test(value);
}
