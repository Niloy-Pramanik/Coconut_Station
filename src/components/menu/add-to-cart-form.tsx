'use client'

import * as React from 'react'
import { Plus, Minus, ShoppingBag } from 'lucide-react'
import { Product, Variant } from '@/core/domain/types'
import { isOrderable } from '@/features/catalog/utils'
import { useCartStore } from '@/features/cart/store'
import { toast } from 'sonner'

export function AddToCartForm({ product }: { product: Product }) {
  const [activeVariant, setActiveVariant] = React.useState<Variant>(product.variants[0])
  const [quantity, setQuantity] = React.useState(1)
  const { addItem } = useCartStore()

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOrderable(activeVariant)) return
    addItem(activeVariant.sku, quantity)
    toast.success(`Added ${quantity}x ${product.nameEn} to cart`)
    setQuantity(1)
  }

  return (
    <form onSubmit={handleAdd} className="flex flex-col gap-6">
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

        {product.status === 'active' && isOrderable(activeVariant) && (
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
            
            <button 
              type="submit"
              className="h-12 px-6 flex items-center justify-center gap-2 bg-leaf-800 text-canvas font-bold rounded-lg hover:bg-leaf-900 transition-colors focus-ring"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
