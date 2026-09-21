"use client"

import * as React from "react"
import { Send, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExpansionNotify() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    
    const form = e.target as HTMLFormElement
    const city = (form.elements.namedItem("city") as HTMLSelectElement).value
    const contact = (form.elements.namedItem("contact") as HTMLInputElement).value
    
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "expansion",
          name: "Anonymous",
          phone: contact,
          message: `Interested in expansion to: ${city}`,
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

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="bg-leaf-50 rounded-2xl p-8 lg:p-12 shadow-soft relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 bg-leaf-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-canvas rounded-full flex items-center justify-center shadow-sm mb-6 text-leaf-700">
              <MapPin className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-extrabold text-leaf-800 uppercase mb-4">
              We're Expanding!
            </h2>
            <p className="text-lg text-ink-soft max-w-xl mb-8">
              Dhaka and Bogura, we hear you. We're working hard to bring Coconut Station to your city. Leave your contact info and be the first to know when we launch!
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  name="city"
                  required
                  defaultValue=""
                  className="px-4 py-3 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none transition-shadow"
                  aria-label="Select City"
                >
                  <option value="" disabled>Select City</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="bogura">Bogura</option>
                </select>
                <input
                  name="contact"
                  type="text"
                  required
                  placeholder="Email or Phone Number"
                  className="flex-1 px-4 py-3 rounded-lg border-line bg-canvas text-ink focus:border-leaf-700 focus:ring-1 focus:ring-leaf-700 outline-none transition-shadow placeholder:text-ink-muted"
                  aria-label="Email or Phone Number"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? (
                  "Submitting..."
                ) : status === "success" ? (
                  "You're on the list!"
                ) : (
                  <>
                    Notify Me <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              {status === "success" && (
                <p className="text-sm text-leaf-700 mt-2 font-medium">
                  Thanks! We'll keep you updated.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-danger-700 mt-2 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
