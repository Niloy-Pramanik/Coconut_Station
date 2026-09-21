import { Link } from "@/i18n/routing"
import { CheckCircle2, MessageCircle, Facebook } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Placed | Coconut Station',
  description: 'Please confirm your order via WhatsApp or Facebook.',
}

export default function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: { order?: string }
}) {
  const orderNumber = searchParams.order
  const whatsappNumber = "8801796894640"
  
  // Format the pre-filled message
  const message = orderNumber 
    ? `Hello Coconut Station! I just placed Order #${orderNumber} on your website. I would like to confirm my order and arrange delivery.`
    : `Hello Coconut Station! I just placed an order on your website. I would like to confirm my order and arrange delivery.`
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  const facebookUrl = `https://www.facebook.com/coconutstation` // Placeholder

  return (
    <div className="bg-canvas min-h-screen pt-32 pb-32 flex items-center justify-center">
      <div className="container px-4 max-w-lg mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-leaf-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-leaf-800" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-leaf-900 mb-4">
          Order Placed!
        </h1>
        
        <p className="text-lg text-ink-soft mb-8 leading-relaxed">
          Almost there! To finalize your order and arrange home delivery, please <strong className="text-ink">send us a message</strong> on WhatsApp or Facebook.
        </p>

        {orderNumber && (
          <div className="bg-canvas border border-line rounded-xl p-6 mb-8 inline-block shadow-sm">
            <div className="text-sm text-ink-soft mb-1 uppercase tracking-wider font-semibold">Order Number</div>
            <div className="text-3xl font-extrabold text-ink">{orderNumber}</div>
          </div>
        )}

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-transform hover:-translate-y-1 shadow-lift"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Confirm on WhatsApp
          </a>
          
          <a 
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 bg-[#1877F2] text-white font-bold rounded-xl hover:bg-[#166fe5] transition-transform hover:-translate-y-1 shadow-lift"
          >
            <Facebook className="w-5 h-5 mr-3" />
            Message on Facebook
          </a>

          <div className="mt-6">
            <Link 
              href="/menu"
              className="inline-flex items-center justify-center h-12 px-8 bg-canvas text-ink-soft font-bold rounded-lg hover:text-ink hover:bg-leaf-50 transition-colors"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
