import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { fontFira, fontMarck, fontHind } from '@/lib/fonts';
import "../globals.css";
import { CookieBanner } from '@/components/ui/cookie-banner';
import { AnalyticsScripts } from '@/features/analytics/scripts';

export const metadata: Metadata = {
  title: "Coconut Station",
  description: "Fresh coconuts daily",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontFira.variable} ${fontMarck.variable} ${fontHind.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
