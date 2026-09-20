'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/features/cart/store'
import { computePricing, DELIVERY_ZONES } from '@/features/pricing/compute'
import { resolveSku } from '@/features/catalog/resolve'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function CheckoutForm() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [mounted, setMounted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    zoneId: 'pickup',
    address: '',
    notes: ''
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-ink mb-4">Your cart is empty</h2>
        <Link href="/menu" className="text-leaf-800 hover:underline font-medium">
          Browse our menu
        </Link>
      </div>
    )
  }

  const pricing = computePricing(items, formData.zoneId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (pricing.errors.length > 0) {
      toast.error(pricing.errors[0])
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
          deliveryZoneId: formData.zoneId,
          deliveryAddress: formData.address,
          deliveryNotes: formData.notes
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      clearCart()
      toast.success('Order placed successfully!')
      router.push(`/checkout/success?order=${data.orderNumber}`)
    } catch (error: any) {
      toast.error(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Customer Info */}
      <div className="lg:col-span-7 space-y-8">
        <section className="bg-canvas p-6 rounded-2xl border border-line">
          <h2 className="text-2xl font-bold text-ink mb-6">Contact Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas"
                  placeholder="017..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Email (Optional)</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas p-6 rounded-2xl border border-line">
          <h2 className="text-2xl font-bold text-ink mb-6">Delivery</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-ink mb-3">Delivery Zone</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(DELIVERY_ZONES).map(zone => (
                  <label 
                    key={zone.id}
                    className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.zoneId === zone.id 
                        ? 'border-leaf-800 bg-leaf-50' 
                        : 'border-line hover:border-leaf-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="zone" 
                      value={zone.id}
                      checked={formData.zoneId === zone.id}
                      onChange={e => setFormData({ ...formData, zoneId: e.target.value })}
                      className="mt-1 mr-3 text-leaf-800 focus:ring-leaf-800"
                    />
                    <div>
                      <div className="font-bold text-ink">{zone.name}</div>
                      <div className="text-sm text-ink-soft">
                        {zone.fee === 0 ? 'Free' : `৳${zone.fee}`}
                        {zone.minOrder > 0 && ` • Min ৳${zone.minOrder}`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {formData.zoneId !== 'pickup' && (
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Delivery Address *</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas resize-none"
                  placeholder="House, Road, Block, Area..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Order Notes (Optional)</label>
              <textarea 
                rows={2}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas resize-none"
                placeholder="Any special instructions..."
              />
            </div>
          </div>
        </section>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-5">
        <div className="bg-leaf-50 p-6 rounded-2xl sticky top-24">
          <h2 className="text-2xl font-bold text-leaf-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {items.map(item => {
              const resolved = resolveSku(item.sku)
              if (!resolved) return null
              const { product, variant } = resolved

              return (
                <div key={item.sku} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-canvas shrink-0">
                    <Image 
                      src={variant.imageSrc}
                      alt={variant.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-ink text-sm leading-tight">{product.nameEn}</div>
                        <div className="text-xs text-ink-soft mt-1">{variant.nameEn}</div>
                      </div>
                      <div className="text-sm font-semibold text-ink text-right">
                        ৳{variant.priceBDT ? (variant.priceBDT * item.quantity).toLocaleString('en-IN') : 0}
                      </div>
                    </div>
                    <div className="text-xs text-ink-soft mt-1">Qty: {item.quantity}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t border-line/50 pt-4 space-y-3 mb-6">
            <div className="flex justify-between text-ink-soft text-sm">
              <span>Subtotal</span>
              <span>৳{pricing.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-ink-soft text-sm">
              <span>Delivery Fee</span>
              <span>{pricing.deliveryFee === 0 ? 'Free' : `৳${pricing.deliveryFee.toLocaleString('en-IN')}`}</span>
            </div>
          </div>

          <div className="border-t border-leaf-900/10 pt-4 mb-8 flex justify-between items-end">
            <span className="font-bold text-leaf-900">Total</span>
            <span className="text-2xl font-extrabold text-leaf-900">৳{pricing.total.toLocaleString('en-IN')}</span>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || pricing.errors.length > 0}
            className="w-full h-14 bg-leaf-800 text-canvas rounded-xl font-bold text-lg hover:bg-leaf-900 transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              'Place Order (Cash on Delivery)'
            )}
          </button>

          {pricing.errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 text-red-800 text-sm rounded-lg border border-red-200">
              {pricing.errors.map((e, i) => <div key={i}>{e}</div>)}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
