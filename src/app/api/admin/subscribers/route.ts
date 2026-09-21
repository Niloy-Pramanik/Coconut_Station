import { NextResponse } from 'next/server'
import { db } from '@/db'
import { subscribers } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allSubs = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt))
    return NextResponse.json({ subscribers: allSubs })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
