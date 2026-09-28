import { z } from 'zod';

const serverSchema = z.object({
  STRICT_LAUNCH: z.string().transform((s) => s === '1').optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
});

const processEnv = {
  STRICT_LAUNCH: process.env.STRICT_LAUNCH,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

const parsed = z.intersection(serverSchema, clientSchema).safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
