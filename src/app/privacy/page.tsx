import * as React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Coconut Station",
}

export default function PrivacyPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed">
            Last updated: September 2026
          </p>
        </header>

        <div className="prose prose-lg prose-leaf mx-auto text-ink">
          <p>
            At Coconut Station, we are committed to protecting your privacy and minimizing the personal data we collect. This Privacy Policy explains how we handle your information.
          </p>
          
          <h2>Data Collection</h2>
          <p>
            We only collect the information necessary to fulfill your orders (name, phone number, delivery address). We do not collect unnecessary personal identifiable information (PII).
          </p>
          
          <h2>Data Usage</h2>
          <p>
            Your information is used strictly for order fulfillment and customer support related to your order. We do not sell or share your data with third-party marketers.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain order records for a limited time for accounting and customer service purposes. Public tracking pages do not display your PII. Administrative access to PII is restricted to authorized staff only.
          </p>
        </div>
      </div>
    </div>
  )
}
