import { NextResponse } from 'next/server'
import { db } from '@/db'
import { inquiries } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt))
    return NextResponse.json({ inquiries: allInquiries })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}
