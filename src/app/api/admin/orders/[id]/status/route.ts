import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderAuditEvents } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Valid status transitions
const NEXT_STATUS: Record<string, string[]> = {
  'pending': ['confirmed', 'cancelled'],
  'confirmed': ['out_for_delivery', 'cancelled'],
  'out_for_delivery': ['delivered', 'cancelled'],
  'delivered': [],
  'cancelled': []
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const orderId = parseInt(id, 10)
    
    if (isNaN(orderId)) {
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
    }

    const body = await request.json()
    const { status, notes } = body

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    // 1. Fetch current order
    const orderResult = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1)
    if (!orderResult.length) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const currentOrder = orderResult[0]
    const currentStatus = currentOrder.status

    // 2. Validate transition
    const validNext = NEXT_STATUS[currentStatus] || []
    if (!validNext.includes(status)) {
      return NextResponse.json({ error: `Invalid transition from ${currentStatus} to ${status}` }, { status: 400 })
    }

    // 3. Perform update and insert audit log (using transaction ideally, but we do them sequentially here for simplicity)
    await db.transaction(async (tx) => {
      await tx.update(orders).set({ 
        status, 
        updatedAt: new Date() 
      }).where(eq(orders.id, orderId))

      await tx.insert(orderAuditEvents).values({
        orderId: orderId,
        action: 'status_changed',
        previousStatus: currentStatus,
        newStatus: status,
        notes: notes || null,
        actor: 'admin',
      })
    })

    return NextResponse.json({ success: true, newStatus: status })

  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }
}
