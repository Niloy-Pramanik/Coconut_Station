import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { promoCodes } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, orderSubtotal } = body

    if (!code) {
      return NextResponse.json({ error: 'Promo code is required' }, { status: 400 })
    }

    const [promo] = await db.select().from(promoCodes).where(eq(promoCodes.code, code.toUpperCase()))

    if (!promo || !promo.isActive) {
      return NextResponse.json({ error: 'Invalid or expired promo code' }, { status: 400 })
    }

    if (promo.minOrderValue !== null && orderSubtotal < promo.minOrderValue) {
      return NextResponse.json({ error: `Minimum order of ৳${promo.minOrderValue} required` }, { status: 400 })
    }

    if (promo.maxUses !== null && (promo.timesUsed ?? 0) >= promo.maxUses) {
      return NextResponse.json({ error: 'Promo code limit reached' }, { status: 400 })
    }

    // Calculate discount amount based on flat amount or percentage
    let discountAmount = 0
    if (promo.discountAmount) {
      discountAmount = promo.discountAmount
    } else if (promo.discountPercent) {
      discountAmount = Math.floor(orderSubtotal * (promo.discountPercent / 100))
    }

    return NextResponse.json({ success: true, discountAmount, code: promo.code })
  } catch (error) {
    console.error('Error validating promo code:', error)
    return NextResponse.json({ error: 'Failed to validate promo code' }, { status: 500 })
  }
}
