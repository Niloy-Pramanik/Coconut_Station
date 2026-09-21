import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt))

    // For each order, fetch items. (In production, a join or prepared statement is better, 
    // but for simplicity in SQLite/Postgres we do this or a relational query)
    const ordersWithItems = await Promise.all(
      allOrders.map(async (order) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id))
        return { ...order, items }
      })
    )

    return NextResponse.json({ orders: ordersWithItems })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
