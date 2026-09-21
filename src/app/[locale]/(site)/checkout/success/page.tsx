import { Link } from "@/i18n/routing"
import { CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed | Coconut Station',
  description: 'Your order has been successfully placed.',
}

export default function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: { order?: string }
}) {
  const orderNumber = searchParams.order

  return (
    <div className="bg-canvas min-h-screen pt-32 pb-32 flex items-center justify-center">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-leaf-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-leaf-800" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-leaf-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-ink-soft mb-8">
          Thank you for ordering from Coconut Station. We'll contact you shortly to confirm delivery.
        </p>

        {orderNumber && (
          <div className="bg-canvas border border-line rounded-xl p-6 mb-8 inline-block">
            <div className="text-sm text-ink-soft mb-1 uppercase tracking-wider font-semibold">Order Number</div>
            <div className="text-2xl font-bold text-ink">{orderNumber}</div>
          </div>
        )}

        <div>
          <Link 
            href="/menu"
            className="inline-flex items-center justify-center h-12 px-8 bg-leaf-800 text-canvas font-bold rounded-lg hover:bg-leaf-900 transition-colors focus-ring"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  )
}
