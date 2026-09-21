import * as React from 'react'
import { notFound } from 'next/navigation'
import { Link } from "@/i18n/routing"
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug } from '@/features/catalog/resolve'
import { ProductDetailsClient } from '@/components/menu/product-details-client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.nameEn} | Coconut Station`,
    description: product.descriptionEn
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // Simple JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameEn,
    description: product.descriptionEn,
    image: product.variants[0]?.imageSrc,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BDT',
      lowPrice: Math.min(...product.variants.map(v => v.priceBDT || 0).filter(p => p > 0)),
      offerCount: product.variants.length,
    }
  }

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/menu" className="inline-flex items-center text-ink-soft hover:text-leaf-800 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
          </Link>
        </div>

        <ProductDetailsClient product={product} />
      </div>
    </div>
  )
}
