import type { JsonLd } from '@/core/lib/seo';

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[];
};

/**
 * Renders one or more schema.org JSON-LD blocks in the document head.
 * Values are serialised with `<` escaped to keep the payload XSS-safe.
 */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
