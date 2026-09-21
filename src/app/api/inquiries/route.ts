import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { inquiries } from '@/db/schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, name, phone, email, message, eventDate, guests, area, items } = body

    if (!type || !name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await db.insert(inquiries).values({
      type,
      name,
      phone,
      email: email || null,
      details: message || null,
      eventDate: eventDate || null,
      guests: guests ? parseInt(guests, 10) : null,
      area: area || null,
      items: items ? JSON.stringify(items) : null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving inquiry:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
