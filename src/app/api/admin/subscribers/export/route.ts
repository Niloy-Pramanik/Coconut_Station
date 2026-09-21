import { NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allSubs = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt))

    // Convert to CSV
    const headers = ['ID', 'Contact', 'City', 'Consent', 'Date']
    const rows = allSubs.map(sub => [
      sub.id,
      sub.contact,
      sub.city,
      sub.consent ? 'Yes' : 'No',
      new Date(sub.createdAt).toISOString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="subscribers.csv"',
      },
    })
  } catch (error) {
    console.error('Error exporting subscribers:', error)
    return NextResponse.json({ error: 'Failed to export subscribers' }, { status: 500 })
  }
}
