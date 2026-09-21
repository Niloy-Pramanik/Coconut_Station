'use client'

import * as React from 'react'
import Image from 'next/image'
import { Link } from "@/i18n/routing"
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore } from '@/features/cart/store'
import { computePricing } from '@/features/pricing/compute'
import { useResolveSku, useCatalog } from '@/components/catalog-provider'

export function CartSheet() {
  const { items, isSheetOpen, setSheetOpen, updateQuantity, removeItem } = useCartStore()
  const catalog = useCatalog()
  const pricing = computePricing(items, catalog, 'pickup') // Defaulting to pickup for drawer preview
  
  const resolveSku = useResolveSku()
  
  // Need this to prevent hydration mismatch for persisted store
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-canvas border-l border-line p-0">
        <SheetHeader className="p-6 border-b border-line bg-leaf-50">
          <SheetTitle className="text-xl font-bold text-leaf-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-ink-muted">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={() => setSheetOpen(false)}
                className="mt-4 text-leaf-700 font-semibold hover:text-leaf-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const resolved = resolveSku(item.sku)
                if (!resolved) return null
                const { product, variant } = resolved

                return (
                  <div key={item.sku} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-leaf-50 shrink-0">
                      <Image 
                        src={variant.imageSrc}
                        alt={variant.imageAlt}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-ink line-clamp-1">{product.nameEn}</h4>
                        <p className="text-sm text-ink-soft">{variant.nameEn}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-line rounded-lg bg-canvas">
                          <button 
                            className="p-1 hover:bg-leaf-50 text-ink-soft hover:text-leaf-800 transition-colors rounded-l-lg"
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-ink">
                            {item.quantity}
                          </span>
                          <button 
                            className="p-1 hover:bg-leaf-50 text-ink-soft hover:text-leaf-800 transition-colors rounded-r-lg"
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-semibold text-leaf-900">
                            ৳{variant.priceBDT ? (variant.priceBDT * item.quantity).toLocaleString('en-IN') : '0'}
                          </span>
                          <button 
                            onClick={() => removeItem(item.sku)}
                            className="text-xs text-ink-muted hover:text-red-500 flex items-center transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-line bg-canvas">
            <div className="flex justify-between items-center mb-4 text-ink-soft">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">৳{pricing.subtotal.toLocaleString('en-IN')}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setSheetOpen(false)}
              className="w-full block text-center bg-leaf-800 text-canvas py-3 rounded-lg font-bold text-lg hover:bg-leaf-900 transition-colors focus-ring"
            >
              Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
