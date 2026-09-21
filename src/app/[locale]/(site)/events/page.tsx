"use client"

import * as React from "react"
import { Send, MapPin, Calendar, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [type, setType] = React.useState<"event" | "bulk">("event")
  const [guestCount, setGuestCount] = React.useState(50)
  
  // Rough estimate: ~80 BDT per coconut
  const estimate = guestCount * 80
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const details = (form.elements.namedItem("details") as HTMLTextAreaElement).value
    
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name,
          phone,
          email,
          message: `Guests: ${guestCount}\n\nDetails: ${details}`,
        })
      })
      
      if (!res.ok) throw new Error("Failed to submit")
      setStatus("success")
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="container max-w-2xl mx-auto py-24 px-4 text-center">
        <div className="w-20 h-20 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-6 text-leaf-700">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-leaf-800 uppercase mb-4">Request Received!</h1>
        <p className="text-lg text-ink-soft mb-8">
          Thank you for considering Coconut Station. Our team will review your requirements and get back to you within 24 hours.
        </p>
        <Button onClick={() => setStatus("idle")} variant="secondary">
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-4">
          Events & Bulk Orders
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl mx-auto">
          Elevate your next gathering with our premium live coconut cart service. Perfect for weddings, corporate events, and parties.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-canvas p-6 rounded-2xl border border-line shadow-sm">
            <h3 className="text-lg font-bold text-ink uppercase mb-2">Estimate Your Cost</h3>
            <p className="text-sm text-ink-muted mb-6">Based on our standard size coconuts (৳80/each). Final price may vary.</p>
            
            <div className="mb-4">
              <label className="text-sm font-semibold text-ink-soft mb-2 block">Number of Guests / Items</label>
              <input 
                type="range" 
                min="20" 
                max="500" 
                step="10" 
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-leaf-600" 
              />
              <div className="text-right font-medium text-leaf-800 mt-2">{guestCount} people</div>
            </div>
            
            <div className="pt-4 border-t border-line flex justify-between items-center">
              <span className="text-ink-soft font-medium">Est. Total:</span>
              <span className="text-2xl font-bold text-leaf-700">৳{estimate.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="bg-leaf-900 text-canvas p-6 rounded-2xl shadow-soft">
            <h3 className="text-lg font-bold uppercase mb-4">What's Included?</h3>
            <ul className="space-y-3 text-sm text-canvas/80">
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-leaf-400 shrink-0" /> Live coconut cracking station</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-leaf-400 shrink-0" /> Premium sealed straws</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-leaf-400 shrink-0" /> Trash management & recycling</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-leaf-400 shrink-0" /> Professional server (Events only)</li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-3 bg-canvas p-8 rounded-2xl shadow-soft border border-line">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex bg-line-soft p-1 rounded-lg w-full max-w-sm mb-2">
              <button
                type="button"
                onClick={() => setType("event")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${type === "event" ? "bg-canvas text-leaf-800 shadow-sm" : "text-ink-muted hover:text-ink"}`}
              >
                Catered Event
              </button>
              <button
                type="button"
                onClick={() => setType("bulk")}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${type === "bulk" ? "bg-canvas text-leaf-800 shadow-sm" : "text-ink-muted hover:text-ink"}`}
              >
                Bulk Delivery
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-ink-soft mb-1 block">Full Name *</label>
                <input name="name" type="text" required className="w-full px-4 py-2.5 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink-soft mb-1 block">Phone Number *</label>
                <input name="phone" type="tel" required className="w-full px-4 py-2.5 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-ink-soft mb-1 block">Email Address (Optional)</label>
              <input name="email" type="email" className="w-full px-4 py-2.5 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none" />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-ink-soft mb-1 block">Event Details *</label>
              <textarea 
                name="details" 
                required 
                rows={4} 
                placeholder="Date, location, and any special requirements..."
                className="w-full px-4 py-3 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none resize-none" 
              />
            </div>
            
            {status === "error" && (
              <p className="text-sm text-danger-700 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Submitting Request..." : "Request a Quote"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
