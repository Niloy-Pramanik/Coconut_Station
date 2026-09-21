import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt))

    // Convert to CSV
    const headers = ['Order Number', 'Date', 'Customer Name', 'Customer Phone', 'Total BDT', 'Status', 'Delivery Zone']
    const rows = allOrders.map(order => [
      order.orderNumber,
      new Date(order.createdAt).toISOString(),
      order.customerName,
      order.customerPhone,
      order.total,
      order.status,
      order.deliveryZoneId,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="orders.csv"',
      },
    })
  } catch (error) {
    console.error('Error exporting orders:', error)
    return NextResponse.json({ error: 'Failed to export orders' }, { status: 500 })
  }
}
