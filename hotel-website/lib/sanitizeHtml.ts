const DISALLOWED_TAGS_RE = /<(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi;
const INLINE_EVENT_RE = /\son\w+=(["']).*?\1/gi;
const JS_PROTOCOL_RE = /\s(href|src)=(["'])\s*javascript:.*?\2/gi;

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(DISALLOWED_TAGS_RE, "")
    .replace(INLINE_EVENT_RE, "")
    .replace(JS_PROTOCOL_RE, " $1=\"#\"")
    .trim();
}

export function htmlToText(html: string | null | undefined): string {
  const safe = sanitizeHtml(html);
  return safe
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
