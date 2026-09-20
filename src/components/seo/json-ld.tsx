import { siteConfig } from "@/content/site.config"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export function FoodEstablishmentJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.name,
    image: `${baseUrl}/assets/brand/logo-full.png`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: siteConfig.contact.phone,
    address: siteConfig.outlets.map((outlet) => ({
      "@type": "PostalAddress",
      streetAddress: outlet.address,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    })),
    openingHoursSpecification: siteConfig.outlets.map((outlet) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:00",
    })),
    acceptsReservations: "False",
    menu: `${baseUrl}/menu`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface ProductJsonLdProps {
  name: string
  image: string
  description: string
  price: number
  inStock?: boolean
}

export function ProductJsonLd({ name, image, description, price, inStock = true }: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: `${baseUrl}${image}`,
    description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: price.toString(),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: baseUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  item: string
}

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.item}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface ArticleJsonLdProps {
  headline: string
  image: string
  datePublished: string
  dateModified?: string
  authorName: string
}

export function ArticleJsonLd({
  headline,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    image: `${baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/brand/logo-full.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
