import { z } from 'zod';

import { business } from '@/core/config/business';

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')}`,
  );
}

export const env = {
  siteUrl: parsed.data.NEXT_PUBLIC_SITE_URL ?? business.website,
} as const;