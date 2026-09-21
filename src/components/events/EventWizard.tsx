"use client"

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { QtyStepper } from '@/components/ui/qty-stepper'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useCatalog } from '@/components/catalog-provider'
import { toast } from 'sonner'

export function EventWizard() {
  const catalog = useCatalog()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: 'wedding',
    eventDate: '',
    guests: '',
    area: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Items: { sku: quantity }
  const [items, setItems] = useState<Record<string, number>>({})

  const availableProducts = useMemo(() => {
    return catalog.flatMap(p => p.variants)
  }, [catalog])

  const handleItemChange = (sku: string, qty: number) => {
    setItems(prev => {
      const next = { ...prev }
      if (qty <= 0) {
        delete next[sku]
      } else {
        next[sku] = qty
      }
      return next
    })
  }

  const { estimateBDT, allPriced } = useMemo(() => {
    let total = 0
    let allPriced = true
    for (const [sku, qty] of Object.entries(items)) {
      const variant = availableProducts.find(v => v.sku === sku)
      if (!variant) continue
      if (variant.priceBDT === null) {
        allPriced = false
      } else {
        total += variant.priceBDT * qty
      }
    }
    return { estimateBDT: total, allPriced: Object.keys(items).length > 0 && allPriced }
  }, [items, availableProducts])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => setStep(s => s + 1)
  const handlePrev = () => setStep(s => s - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: Object.keys(items).length > 0 ? items : null
        })
      })

      if (!res.ok) throw new Error('Failed to submit')

      toast.success('Inquiry submitted! We will contact you soon.')
      setStep(4) // Success step
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-surface rounded-xl border border-line p-6 md:p-10 shadow-sm">
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <h2 className="text-2xl font-serif text-ink">Event Details</h2>
          <p className="text-ink-muted">Tell us about your upcoming event.</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={formData.type} onValueChange={(val) => handleSelectChange('type', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="bulk">Bulk Order</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estimated Guests</Label>
                <Input type="number" name="guests" placeholder="e.g. 150" value={formData.guests} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Venue Area / City</Label>
                <Input name="area" placeholder="e.g. Gulshan, Dhaka" value={formData.area} onChange={handleChange} />
              </div>
            </div>
          </div>

          <Button className="w-full mt-6" onClick={handleNext}>Next: Select Items</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <h2 className="text-2xl font-serif text-ink">Select Items</h2>
          <p className="text-ink-muted">What would you like to serve your guests?</p>
          
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            {catalog.map(product => (
              <div key={product.slug} className="space-y-2 pb-4 border-b border-line last:border-0">
                <h3 className="font-semibold text-ink">{product.nameEn}</h3>
                {product.variants.map(variant => (
                  <div key={variant.sku} className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm text-ink">{variant.nameEn}</div>
                      {variant.priceBDT !== null ? (
                        <div className="text-sm font-semibold text-leaf-800">৳{variant.priceBDT}</div>
                      ) : (
                        <div className="text-sm text-ink-muted italic">Price upon request</div>
                      )}
                    </div>
                    <QtyStepper 
                      value={items[variant.sku] || 0} 
                      onChange={(v) => handleItemChange(variant.sku, v)}
                      min={0}
                      max={1000}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="bg-leaf-50 p-4 rounded-lg flex items-center justify-between">
            <span className="font-medium text-leaf-900">Estimated Cost</span>
            <span className="font-semibold text-leaf-900 text-lg">
              {allPriced ? `৳${estimateBDT}` : "We'll send a quote"}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="secondary" onClick={handlePrev} className="flex-1">Back</Button>
            <Button onClick={handleNext} className="flex-1">Next: Contact Info</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <h2 className="text-2xl font-serif text-ink">Contact Details</h2>
          <p className="text-ink-muted">Where should we send the quote?</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input name="phone" required placeholder="01XXXXXXXXX" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="Optional" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Requirements</Label>
              <Textarea 
                name="message" 
                placeholder="Any special requests, branding needs, or questions?" 
                value={formData.message} 
                onChange={handleChange}
                className="min-h-[100px]" 
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="button" variant="secondary" onClick={handlePrev} className="flex-1" disabled={isSubmitting}>Back</Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </Button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-leaf-100 text-leaf-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className="text-3xl font-serif text-ink">Thank You!</h2>
          <p className="text-ink-muted max-w-sm mx-auto">
            Your event inquiry has been received. Our team will review the details and get back to you with a quote shortly.
          </p>
          <Button 
            className="mt-6" 
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  )
}
