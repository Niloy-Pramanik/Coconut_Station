import * as React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from "@/i18n/routing"
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug, getVisibleCatalog } from '@/features/catalog/resolve'
import { DirectOrderForm } from '@/components/menu/direct-order-form'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  console.log('DEBUG SLUG:', slug);
  const product = await getProductBySlug(slug);
  console.log('DEBUG PRODUCT:', product?.slug);
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.nameEn} | Coconut Station`,
    description: product.descriptionEn
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  console.log('DEBUG COMPONENT PRODUCT:', product?.slug);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-leaf-50">
            <Image 
              src={product.variants[0]?.imageSrc} 
              alt={product.variants[0]?.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 sm:p-8"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-semibold text-leaf-700 uppercase tracking-wider mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-2">
                {product.nameEn}
              </h1>
              <h2 className="text-2xl text-ink-soft font-script mb-6">
                {product.nameBn}
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed">
                {product.descriptionEn}
              </p>
            </div>

            {product.allergens.length > 0 && (
              <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-lg text-sm">
                <strong>Allergen Warning:</strong> Contains {product.allergens.join(', ')}.
              </div>
            )}

            <div className="mt-auto pt-8 border-t border-line">
              <DirectOrderForm product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
