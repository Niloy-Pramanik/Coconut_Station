import { Metadata } from "next"
import { siteConfig } from "@/content/site.config"

interface BuildMetadataParams {
  title?: string
  description?: string
  path?: string
  image?: string
  noindex?: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/assets/brand/logo-full.png", // fallback image, overridden by opengraph-image.tsx usually
  noindex = false,
}: BuildMetadataParams = {}): Metadata {
  const url = `${baseUrl}${path}`

  return {
    title: title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.tagline}`,
    description: description || siteConfig.description,
    alternates: {
      canonical: url,
      languages: {
        "en-BD": url,
        "bn-BD": url,
      },
    },
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: "en_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
