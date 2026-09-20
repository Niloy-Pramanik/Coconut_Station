import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
import { computePricing } from '@/features/pricing/compute'
import { resolveSku } from '@/features/catalog/resolve'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer, deliveryZoneId, deliveryAddress, deliveryNotes } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Server-side recalculation of pricing to prevent tampering
    const pricing = computePricing(items, deliveryZoneId)
    if (pricing.errors.length > 0) {
      return NextResponse.json({ error: 'Pricing error', details: pricing.errors }, { status: 400 })
    }

    // Generate simple Order Number (e.g. CS-RANDOM)
    const orderNumber = `CS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Insert Order using a transaction
    const newOrder = await db.transaction(async (tx) => {
      const [order] = await tx.insert(orders).values({
        orderNumber,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        deliveryZoneId,
        deliveryAddress: deliveryZoneId === 'pickup' ? 'Pickup from store' : deliveryAddress,
        deliveryNotes,
        subtotal: pricing.subtotal,
        deliveryFee: pricing.deliveryFee,
        discount: pricing.discount,
        total: pricing.total,
        paymentMethod: 'cash_on_delivery',
      }).returning()

      const itemsToInsert = items.map((item: any) => {
        const resolved = resolveSku(item.sku)
        return {
          orderId: order.id,
          sku: item.sku,
          quantity: item.quantity,
          priceAtOrder: resolved?.variant.priceBDT || 0,
        }
      })

      await tx.insert(orderItems).values(itemsToInsert)

      return order
    })

    return NextResponse.json({ success: true, orderNumber: newOrder.orderNumber }, { status: 201 })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
