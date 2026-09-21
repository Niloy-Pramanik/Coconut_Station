import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from "next";
import { fontFira, fontMarck, fontHind } from '@/lib/fonts';
import "../globals.css";
import { CookieBanner } from '@/components/ui/cookie-banner';
import { AnalyticsScripts } from '@/features/analytics/scripts';

import { siteConfig } from "@/content/site.config"
import { Header } from "@/components/shell/header"
import { Footer } from "@/components/shell/footer"
import { AnnouncementBar } from "@/components/shell/announcement-bar"
import { MobileBottomBar } from "@/components/shell/mobile-bottom-bar"
import { QuickContact } from "@/components/shell/quick-contact"
import { SkipLink } from "@/components/shell/skip-link"
import { Toaster } from "@/components/ui/sonner"
import { CartSheet } from "@/components/cart/cart-sheet"
import { CatalogProvider } from "@/components/catalog-provider"
import { getHydratedCatalog } from "@/features/catalog/resolve"
import { ConsentBanner } from "@/components/shell/consent-banner"

export const viewport: Viewport = {
  themeColor: "#052210", // leaf-900
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
  },
  description: "Bringing nature's finest coconut experience to your everyday life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
}

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
  const catalog = await getHydratedCatalog();

  return (
    <html lang={locale} className={`${fontFira.variable} ${fontMarck.variable} ${fontHind.variable} antialiased scroll-smooth`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-ink selection:bg-leaf-700 selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <CatalogProvider catalog={catalog}>
            <SkipLink />
            <AnnouncementBar />
            <Header />
            
            <main id="main-content" className="flex-1 outline-none relative z-0">
              {children}
            </main>

            <Footer />
            <MobileBottomBar />
            <QuickContact />
            <Toaster />
            <CartSheet />
            <ConsentBanner />
            <CookieBanner />
          </CatalogProvider>
        </NextIntlClientProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
