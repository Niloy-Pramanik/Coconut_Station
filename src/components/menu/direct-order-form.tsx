'use client'

import * as React from 'react'
import { Plus, Minus, MessageCircle, Facebook } from 'lucide-react'
import { Product, Variant } from '@/core/domain/types'
import { isOrderable } from '@/features/catalog/utils'

export function DirectOrderForm({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])
  const [quantity, setQuantity] = React.useState(1)
  const getWhatsappUrl = () => {
    const priceText = activeVariant.priceBDT ? `৳${activeVariant.priceBDT * quantity}` : 'Price not set';
    const msg = `Hi Coconut Station! I would like to order: ${quantity}x ${product.nameEn} (${activeVariant.nameEn}) - ${priceText}. Please let me know how to proceed with delivery.`
    return `https://wa.me/8801796894640?text=${encodeURIComponent(msg)}`
  }
  
  const facebookUrl = 'https://m.me/coconutstation'

  return (
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
                onClick={() => setActiveVariant(variant)}
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
          <div className="text-3xl font-bold text-leaf-900 mb-1">
            {activeVariant.priceBDT ? `৳${activeVariant.priceBDT.toLocaleString('en-IN')}` : 'Ask at outlet'}
          </div>
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
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3">
              <a 
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20bd5a] transition-colors shadow-sm focus-ring"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a 
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 flex items-center justify-center gap-2 bg-[#1877F2] text-white font-bold rounded-lg hover:bg-[#166fe5] transition-colors shadow-sm focus-ring"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
