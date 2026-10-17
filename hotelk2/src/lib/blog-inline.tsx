import Link from 'next/link';
import type { ReactNode } from 'react';

const INLINE_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Renders the lightweight inline syntax used in article content:
 *   - `[label](/internal-path)`  → next/link (internal) or <a> (external)
 *   - `**bold**`                 → <strong>
 *
 * Content is authored in-repo and trusted, so nodes are built directly rather
 * than injected as HTML — no `dangerouslySetInnerHTML`, no XSS surface.
 */
export function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];
    const bold = match[3];

    if (label !== undefined && href !== undefined) {
      nodes.push(
        href.startsWith('/') ? (
          <Link key={`link-${key++}`} href={href}>
            {label}
          </Link>
        ) : (
          <a key={`link-${key++}`} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ),
      );
    } else if (bold !== undefined) {
      nodes.push(<strong key={`bold-${key++}`}>{bold}</strong>);
    }

    lastIndex = INLINE_PATTERN.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : text;
}
