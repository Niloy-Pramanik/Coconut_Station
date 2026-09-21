"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type Subscriber = {
  id: number
  contact: string
  city: string
  consent: boolean
  createdAt: string
}

export default function AdminSubscribersPage() {
  const { data, isLoading, isError, refetch } = useQuery<{ subscribers: Subscriber[] }>({
    queryKey: ['admin-subscribers'],
    queryFn: async () => {
      const res = await fetch('/api/admin/subscribers')
      if (!res.ok) throw new Error('Failed to fetch subscribers')
      return res.json()
    },
    refetchInterval: 60000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-full">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-800" />
      </div>
    )
  }

  if (isError) {
    return <div className="p-12 text-red-600 h-full">Failed to load subscribers.</div>
  }

  const subscribers = data?.subscribers || []

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ink uppercase tracking-wide">Subscribers Board</h1>
          <a href="/api/admin/subscribers/export" className="text-leaf-700 hover:underline text-sm font-semibold inline-block mt-2" download>
            Download CSV Export
          </a>
        </div>
        <Button variant="secondary" size="md" onClick={() => refetch()} className="text-ink-soft">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="bg-canvas border border-line rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-line-soft text-ink-muted uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Consent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-ink-muted">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-leaf-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium">{sub.id}</td>
                  <td className="px-6 py-4 text-ink-soft">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-ink">{sub.contact}</td>
                  <td className="px-6 py-4 capitalize">{sub.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${sub.consent ? 'bg-leaf-100 text-leaf-800' : 'bg-red-100 text-red-800'}`}>
                      {sub.consent ? 'Yes' : 'No'}
                    </span>
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
