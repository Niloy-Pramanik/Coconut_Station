"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Inquiry = {
  id: number
  type: string
  name: string
  phone: string
  email: string | null
  details: string | null
  eventDate: string | null
  guests: number | null
  area: string | null
  items: string | null // JSON string
  createdAt: string
  status: string
}

export default function AdminInquiriesPage() {
  const { data, isLoading, isError } = useQuery<{ inquiries: Inquiry[] }>({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const res = await fetch('/api/admin/inquiries')
      if (!res.ok) throw new Error('Failed to fetch inquiries')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-800" />
      </div>
    )
  }

  if (isError) {
    return <div className="p-12 text-red-600">Failed to load inquiries.</div>
  }

  const inquiries = data?.inquiries || []

  const renderItems = (itemsStr: string | null) => {
    if (!itemsStr) return null
    try {
      const parsed = JSON.parse(itemsStr)
      return (
        <div className="mt-2 space-y-1">
          <div className="text-xs font-semibold uppercase text-ink-muted">Requested Items</div>
          {Object.entries(parsed).map(([sku, qty]) => (
            <div key={sku} className="text-xs text-ink-soft">
              {String(qty)}x {sku}
            </div>
          ))}
        </div>
      )
    } catch {
      return null
    }
  }

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink uppercase tracking-wide">Inquiries</h1>
      </div>

      <div className="bg-canvas border border-line rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-line-soft text-ink-muted uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Event Details</th>
              <th className="px-6 py-4">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-ink-muted">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              inquiries.map(inquiry => (
                <tr key={inquiry.id} className="hover:bg-leaf-50/30 transition-colors">
                  <td className="px-6 py-4 text-ink-soft whitespace-nowrap align-top">
                    <div className="font-medium text-ink">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-ink-muted">
                      {new Date(inquiry.createdAt).toLocaleTimeString()}
                    </div>
                    <Badge variant={inquiry.status === 'new' ? 'default' : 'info'} className="mt-2">
                      {inquiry.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium uppercase text-xs align-top">
                    {inquiry.type}
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-semibold text-ink">{inquiry.name}</div>
                    <div className="text-xs text-ink-muted">{inquiry.phone}</div>
                    {inquiry.email && <div className="text-xs text-ink-muted">{inquiry.email}</div>}
                  </td>
                  <td className="px-6 py-4 align-top">
                    {inquiry.eventDate && <div className="text-sm">Date: {inquiry.eventDate}</div>}
                    {inquiry.guests && <div className="text-sm">Guests: {inquiry.guests}</div>}
                    {inquiry.area && <div className="text-sm">Area: {inquiry.area}</div>}
                    {renderItems(inquiry.items)}
                  </td>
                  <td className="px-6 py-4 text-ink-soft max-w-md align-top">
                    {inquiry.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
