import { db } from "@/db"
import { orders, orderItems } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { catalogRepo } from "@/core/di"

export const metadata = {
  title: "Print Order Ticket",
  robots: "noindex, nofollow"
}

export default async function PrintOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const orderId = parseInt(id, 10)
  if (isNaN(orderId)) return notFound()

  const orderResult = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1)
  if (!orderResult.length) return notFound()
  const order = orderResult[0]

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId))

  return (
    <div className="bg-white min-h-screen p-8 text-black font-mono">
      <div className="max-w-md mx-auto border border-black p-6 rounded-lg">
        <div className="text-center mb-6 border-b border-black pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-1">Coconut Station</h1>
          <p className="text-sm uppercase">Order Ticket</p>
        </div>

        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Order No:</span>
            <span>{order.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer:</span>
            <span>{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{order.customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment:</span>
            <span className="uppercase">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Address:</span>
            <span className="text-right max-w-[200px] break-words">{order.deliveryAddress}</span>
          </div>
        </div>

        <div className="border-t border-black pt-4 mb-6">
          <table className="w-full text-sm">
            <thead className="border-b border-black text-left">
              <tr>
                <th className="pb-2 font-semibold">Item</th>
                <th className="pb-2 font-semibold text-center">Qty</th>
                <th className="pb-2 font-semibold text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map(async item => {
                const parts = item.sku.split('-')
                const productSlug = parts.slice(0, -1).join('-')
                const product = await catalogRepo.getProductBySlug(productSlug)
                const variant = product?.variants.find(v => v.sku === item.sku)
                const name = product?.nameEn || item.sku
                const variantName = variant?.nameEn ? variant.nameEn : ''
                
                return (
                  <tr key={item.id}>
                    <td className="py-2 pr-2">{name} {variantName ? `(${variantName})` : ''}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">৳{item.priceAtOrder * item.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-black pt-4 text-sm font-bold flex justify-between text-lg">
          <span>Total:</span>
          <span>৳{order.total}</span>
        </div>

        <div className="mt-8 text-center">
          {/* Note: In a server component, we can't use onClick directly.
              We'll use an inline script tag or a tiny client component, 
              but a script tag is easiest for a simple print button. */}
          <button 
            type="button"
            className="px-4 py-2 bg-black text-white rounded print:hidden uppercase text-sm tracking-wider font-semibold"
            id="print-btn"
          >
            Print Ticket
          </button>
          <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById('print-btn').addEventListener('click', function() {
              window.print();
            });
          `}} />
        </div>
      </div>
    </div>
  )
}
