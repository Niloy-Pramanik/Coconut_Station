import { Metadata } from 'next'
import { CheckoutForm } from '@/components/checkout/checkout-form'

export const metadata: Metadata = {
  title: 'Checkout | Coconut Station',
  description: 'Complete your order from Coconut Station.',
}

export default function CheckoutPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-leaf-900 uppercase tracking-tight mb-4">
            Checkout
          </h1>
          <p className="text-xl text-ink-soft">
            Review your items, provide delivery details, and complete your order.
          </p>
        </header>

        <CheckoutForm />
      </div>
    </div>
  )
}
