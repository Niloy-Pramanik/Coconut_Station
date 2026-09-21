'use client'

import * as React from 'react'
import Image from 'next/image'
import { Plus, Minus, MessageCircle, Facebook } from 'lucide-react'
import { Product, Variant } from '@/core/domain/types'
import { AnimatePresence, motion } from 'motion/react'

export function ProductDetailsClient({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])
  const [quantity, setQuantity] = React.useState(1)

  const getWhatsappUrl = () => {
    const priceText = activeVariant.priceBDT ? `৳${activeVariant.priceBDT * quantity}` : 'Price not set';
    const msg = `Hi Coconut Station! I would like to order: ${quantity}x ${product.nameEn} (${activeVariant.nameEn}) - ${priceText}. Please let me know how to proceed with delivery.`
    return `https://wa.me/8801796894640?text=${encodeURIComponent(msg)}`
  }
  
  const facebookUrl = 'https://m.me/coconutstationbdbd'

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
                        setQuantity(1)
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

            {/* Price & Add to Cart */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-4">
              <div className="flex-1">
                {activeVariant.priceBDT && (
                  <div className="text-3xl font-bold text-leaf-900 mb-1">
                    ৳{(activeVariant.priceBDT * quantity).toLocaleString('en-IN')}
                  </div>
                )}
                <div className="text-sm text-ink-soft">
                  {product.status === 'coming_soon' ? 'Coming Soon' : 'Price is VAT inclusive.'}
                </div>
              </div>

              {product.status === 'active' && true && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-line rounded-lg bg-canvas h-12">
                    <button 
                      type="button"
                      className="w-10 h-full flex items-center justify-center text-ink-soft hover:text-leaf-800 hover:bg-leaf-50 transition-colors rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-ink">
                      {quantity}
                    </span>
                    <button 
                      type="button"
                      className="w-10 h-full flex items-center justify-center text-ink-soft hover:text-leaf-800 hover:bg-leaf-50 transition-colors rounded-r-md"
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => window.open(getWhatsappUrl(), '_blank')}
                      className="h-12 px-6 flex items-center justify-center gap-2 bg-leaf-800 text-canvas font-bold rounded-lg hover:bg-leaf-900 transition-colors shadow-sm focus-ring"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </button>
                    <button 
                      type="button"
                      onClick={() => window.open(facebookUrl, '_blank')}
                      className="h-12 px-6 flex items-center justify-center gap-2 bg-leaf-100 text-leaf-900 font-bold rounded-lg hover:bg-leaf-200 transition-colors shadow-sm focus-ring"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
