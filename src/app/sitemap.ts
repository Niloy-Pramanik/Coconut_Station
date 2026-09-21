import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coconutstation.com'
  
  // Public routes to include
  const routes = [
    '',
    '/menu',
    '/outlets',
    '/events',
    '/why-coconut',
    '/gallery',
    '/about',
    '/contact',
    '/blog',
  ]

  // Add locales for Next-Intl
  const locales = ['en', 'bn']

  const sitemapEntries: MetadataRoute.Sitemap = []

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}
