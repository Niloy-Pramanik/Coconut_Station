'use client'

import * as React from 'react'
import Image from 'next/image'
import { Link } from "@/i18n/routing"
import { MessageCircle, Facebook } from 'lucide-react'
import { Product, Variant } from '@/core/domain/types'
import { isOrderable } from '@/features/catalog/utils'

export function MenuGrid({ products }: { products: Product[] }) {
  // Extract unique categories
  const categories = Array.from(new Set(products.map(p => p.category)))
  const [activeCategory, setActiveCategory] = React.useState<string>('All')
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-ring ${
            activeCategory === 'All' 
              ? 'bg-leaf-800 text-canvas' 
              : 'bg-leaf-50 text-leaf-900 hover:bg-leaf-100'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-ring ${
              activeCategory === cat 
                ? 'bg-leaf-800 text-canvas' 
                : 'bg-leaf-50 text-leaf-900 hover:bg-leaf-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  // Default to first variant
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])

  const getWhatsappUrl = () => {
    const msg = `Hi Coconut Station! I would like to order: 1x ${product.nameEn} (${activeVariant.nameEn}) - ৳${activeVariant.priceBDT}. Please let me know how to proceed with delivery.`
    return `https://wa.me/8801833181360?text=${encodeURIComponent(msg)}`
  }
  
  const facebookUrl = 'https://m.me/coconutstation'

  return (
    <div className="group bg-canvas border border-line rounded-2xl overflow-hidden hover:border-leaf-300 transition-colors flex flex-col h-full">
      <Link href={`/menu/${product.slug}`} className="block relative aspect-square bg-leaf-50 overflow-hidden focus-ring">
        <Image 
          src={activeVariant.imageSrc}
          alt={activeVariant.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500"
        />
        {product.status === 'coming_soon' && (
          <div className="absolute top-4 left-4 bg-ink/90 text-canvas px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-pill">
            Coming Soon
          </div>
        )}
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="text-xs font-semibold text-leaf-700 uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <Link href={`/menu/${product.slug}`} className="focus-ring rounded-sm inline-block">
            <h3 className="text-lg font-bold text-ink leading-tight group-hover:text-leaf-800 transition-colors">
              {product.nameEn}
            </h3>
            <p className="text-sm text-ink-soft line-clamp-2 mt-2">{product.descriptionEn}</p>
          </Link>
        </div>
        
        <div className="mt-auto">
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.variants.map((variant) => (
                <button
                  key={variant.sku}
                  onClick={() => setActiveVariant(variant)}
                  className={`px-2 py-1 text-xs font-medium rounded-md border transition-colors focus-ring ${
                    activeVariant.sku === variant.sku 
                      ? 'bg-leaf-800 border-leaf-800 text-canvas'
                      : 'bg-canvas border-line text-ink-soft hover:border-leaf-300'
                  }`}
                >
                  {variant.nameEn}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-leaf-900">
              {activeVariant.priceBDT ? `৳${activeVariant.priceBDT.toLocaleString('en-IN')}` : 'Ask at outlet'}
            </div>
            {product.status === 'active' && isOrderable(activeVariant) && (
              <div className="flex gap-2 relative z-20">
                <a 
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white p-2 rounded-full transition-colors focus-ring"
                  aria-label="Order via WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white p-2 rounded-full transition-colors focus-ring"
                  aria-label="Order via Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
