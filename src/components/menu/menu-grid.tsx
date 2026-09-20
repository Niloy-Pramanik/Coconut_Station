'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Product, Variant } from '@/features/catalog/types'
import { isOrderable } from '@/features/catalog/resolve'
import { useCartStore } from '@/features/cart/store'
import { toast } from 'sonner'

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
  const { addItem } = useCartStore()
  // Default to first variant
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isOrderable(activeVariant)) return
    addItem(activeVariant.sku)
    toast.success(`Added ${product.nameEn} to cart`)
  }

  return (
    <div className="group bg-canvas border border-line rounded-2xl overflow-hidden hover:border-leaf-300 transition-colors flex flex-col h-full">
      <Link href={`/menu/${product.slug}`} className="block relative aspect-square bg-leaf-50 overflow-hidden focus-ring">
        <Image 
          src={activeVariant.imageSrc}
          alt={activeVariant.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              <button 
                onClick={handleAdd}
                className="bg-leaf-100 text-leaf-900 hover:bg-leaf-800 hover:text-canvas p-2 rounded-full transition-colors focus-ring"
                aria-label="Add to cart"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
