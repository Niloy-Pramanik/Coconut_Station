import { NextResponse } from 'next/server'
import { db } from '@/db'
import { inquiries } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt))

    // Convert to CSV
    const headers = ['ID', 'Date', 'Type', 'Name', 'Phone', 'Email', 'Details', 'Status']
    const rows = allInquiries.map(inq => [
      inq.id,
      new Date(inq.createdAt).toISOString(),
      inq.type,
      inq.name,
      inq.phone,
      inq.email || '',
      inq.details || '',
      inq.status,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="inquiries.csv"',
      },
    })
  } catch (error) {
    console.error('Error exporting inquiries:', error)
    return NextResponse.json({ error: 'Failed to export inquiries' }, { status: 500 })
  }
}
