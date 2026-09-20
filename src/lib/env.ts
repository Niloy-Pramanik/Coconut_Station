import { z } from 'zod';

const serverSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  ADMIN_SESSION_SECRET: z.string().min(32).optional(),
  RESEND_API_KEY: z.string().optional(),
  ORDER_ALERT_EMAIL_FROM: z.string().email().optional(),
  ORDER_ALERT_EMAIL_TO: z.string().email().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  PAYMENTS_ENABLED_METHODS: z.string().default('cod'),
  SSLCOMMERZ_STORE_ID: z.string().optional(),
  SSLCOMMERZ_STORE_PASSWORD: z.string().optional(),
  SSLCOMMERZ_SANDBOX: z.string().transform((s) => s === 'true').default('true'),
  SEED_DEMO_PRICES: z.string().transform((s) => s === '1').optional(),
  STRICT_LAUNCH: z.string().transform((s) => s === '1').optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
});

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ORDER_ALERT_EMAIL_FROM: process.env.ORDER_ALERT_EMAIL_FROM,
  ORDER_ALERT_EMAIL_TO: process.env.ORDER_ALERT_EMAIL_TO,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  PAYMENTS_ENABLED_METHODS: process.env.PAYMENTS_ENABLED_METHODS,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWORD: process.env.SSLCOMMERZ_STORE_PASSWORD,
  SSLCOMMERZ_SANDBOX: process.env.SSLCOMMERZ_SANDBOX,
  SEED_DEMO_PRICES: process.env.SEED_DEMO_PRICES,
  STRICT_LAUNCH: process.env.STRICT_LAUNCH,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};

const parsed = z.intersection(serverSchema, clientSchema).safeParse(processEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
