import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems, promoCodes } from '@/db/schema'
import { computePricing } from '@/features/pricing/compute'
import { getHydratedCatalog } from '@/features/catalog/resolve'
import { eq, sql } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, customer, deliveryZoneId, deliveryAddress, deliveryNotes, promoCode } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const catalog = await getHydratedCatalog()

    // 1. Calculate base pricing first to check minOrder for promo
    const basePricing = computePricing(items, catalog, deliveryZoneId)
    if (basePricing.errors.length > 0) {
      return NextResponse.json({ error: 'Pricing error', details: basePricing.errors }, { status: 400 })
    }

    let discountAmount = 0
    let validPromoCode = null

    // 2. Validate Promo Code if provided
    if (promoCode) {
      const [promo] = await db.select().from(promoCodes).where(eq(promoCodes.code, promoCode.toUpperCase()))
      
      if (!promo || !promo.isActive) {
        return NextResponse.json({ error: 'Invalid or expired promo code' }, { status: 400 })
      }
      
      if (promo.minOrderValue !== null && basePricing.subtotal < promo.minOrderValue) {
        return NextResponse.json({ error: `Minimum order of ৳${promo.minOrderValue} required for promo code` }, { status: 400 })
      }
      
      if (promo.maxUses !== null && (promo.timesUsed ?? 0) >= promo.maxUses) {
        return NextResponse.json({ error: 'Promo code limit reached' }, { status: 400 })
      }

      validPromoCode = promo.code
      if (promo.discountAmount) {
        discountAmount = promo.discountAmount
      } else if (promo.discountPercent) {
        discountAmount = Math.floor(basePricing.subtotal * (promo.discountPercent / 100))
      }
    }

    // 3. Final Pricing Calculation
    const pricing = computePricing(items, catalog, deliveryZoneId, discountAmount)
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
        let price = 0
        for (const p of catalog) {
          const v = p.variants.find(v => v.sku === item.sku)
          if (v) { price = v.priceBDT || 0; break; }
        }
        return {
          orderId: order.id,
          sku: item.sku,
          quantity: item.quantity,
          priceAtOrder: price,
        }
      })

      await tx.insert(orderItems).values(itemsToInsert)

      if (validPromoCode) {
        await tx.update(promoCodes)
          .set({ timesUsed: sql`${promoCodes.timesUsed} + 1` })
          .where(eq(promoCodes.code, validPromoCode))
      }

      return order
    })

    return NextResponse.json({ success: true, orderNumber: newOrder.orderNumber }, { status: 201 })
  } catch (error) {
    console.error('Order creation failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
