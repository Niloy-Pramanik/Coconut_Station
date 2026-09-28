'use client'

import * as React from 'react'
import Image from 'next/image'
import { Product, Variant } from '@/core/domain/types'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from '@/i18n/routing'
import { siteConfig } from '@/content/site.config'

export function ProductDetailsClient({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-leaf-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVariant.sku}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full"
          >
            <Image 
              src={activeVariant.imageSrc} 
              alt={activeVariant.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 sm:p-8"
              priority
            />
          </motion.div>
        </AnimatePresence>
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
          <div className="flex flex-col gap-6">
            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-ink mb-3">Select Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.sku}
                      type="button"
                      onClick={() => {
                        setActiveVariant(variant)
                      }}
                      className={`px-4 py-2 rounded-lg font-medium border-2 transition-all focus-ring ${
                        activeVariant.sku === variant.sku
                          ? 'border-leaf-800 bg-leaf-50 text-leaf-900'
                          : 'border-line bg-canvas text-ink-soft hover:border-leaf-300'
                      }`}
                    >
                      {variant.nameEn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Where to get it */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-ink mb-4">Where to get it</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/outlets"
                  className="px-6 py-3 bg-leaf-800 text-canvas font-bold rounded-lg hover:bg-leaf-900 transition-colors shadow-sm focus-ring"
                >
                  Find an Outlet
                </Link>
                {siteConfig.deliveryPartners?.map(partner => (
                  partner.url ? (
                    <a
                      key={partner.id}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-leaf-100 text-leaf-900 font-bold rounded-lg hover:bg-leaf-200 transition-colors shadow-sm focus-ring"
                    >
                      Order on {partner.name}
                    </a>
                  ) : (
                    <span
                      key={partner.id}
                      className="px-6 py-3 bg-leaf-50 text-leaf-700 font-bold rounded-lg cursor-not-allowed shadow-sm border border-leaf-200"
                    >
                      Available on {partner.name}
                    </span>
                  )
                ))}
              </div>
              
              <div className="flex gap-4 mt-6">
                {siteConfig.deliveryPartners?.map(partner => (
                  <div key={`${partner.id}-poster`} className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-sm border border-line bg-leaf-50">
                    <Image 
                      src={partner.poster} 
                      alt={partner.posterAlt} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
