import * as React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Coconut Station",
}

export default function TermsPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed">
            Last updated: September 2026
          </p>
        </header>

        <div className="prose prose-lg prose-leaf mx-auto text-ink">
          <h2>1. Orders and Cancellations</h2>
          <p>
            Due to the fresh nature of our products, orders can only be cancelled within 5 minutes of placement. Once preparation has begun, cancellations cannot be accepted.
          </p>

          <h2>2. Delivery</h2>
          <p>
            Delivery times are estimates and may vary based on weather, traffic, and volume. We strive to deliver within 45 minutes for local orders.
          </p>

          <h2>3. Health Disclaimer</h2>
          <p>
            Information provided on our website is for general wellness knowledge and is not intended as medical advice. Our products are naturally prepared but some contain allergens like milk and peanuts. Please check before consuming.
          </p>

          <h2>4. Payments</h2>
          <p>
            All digital payments are processed securely. In the event of a failed delivery on our end, a full refund will be initiated to the original payment method.
          </p>
        </div>
      </div>
    </div>
  )
}
