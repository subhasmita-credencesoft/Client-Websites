type JsonLdProps = {
  schema: Record<string, unknown> | null | undefined | Array<Record<string, unknown> | null | undefined>;
};

export default function JsonLd({ schema }: JsonLdProps) {
  const data = Array.isArray(schema) ? schema.filter((item): item is Record<string, unknown> => Boolean(item)) : schema;
  if (!data || (Array.isArray(data) && !data.length)) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
