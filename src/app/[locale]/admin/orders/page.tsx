"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, RefreshCw, Bell, BellOff, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

type Order = {
  id: number
  orderNumber: string
  status: string
  customerName: string
  customerPhone: string
  total: number
  paymentMethod: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const queryClient = useQueryClient()
  const [chimeEnabled, setChimeEnabled] = React.useState(true)
  const [prevOrderCount, setPrevOrderCount] = React.useState<number | null>(null)
  
  // Audio element for chime
  const chimeAudio = React.useRef<HTMLAudioElement | null>(null)
  
  React.useEffect(() => {
    chimeAudio.current = new Audio('/chime.mp3') // Assume we have a chime.mp3 in public/
    const saved = localStorage.getItem('admin_chime_enabled')
    if (saved !== null) {
      setChimeEnabled(saved === 'true')
    }
  }, [])

  const toggleChime = () => {
    const next = !chimeEnabled
    setChimeEnabled(next)
    localStorage.setItem('admin_chime_enabled', String(next))
    if (next && chimeAudio.current) {
      chimeAudio.current.play().catch(() => {})
    }
  }

  const { data, isLoading, isError, refetch } = useQuery<{ orders: Order[] }>({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await fetch('/api/admin/orders')
      if (!res.ok) throw new Error('Failed to fetch orders')
      return res.json()
    },
    refetchInterval: 15000, // Poll every 15 seconds
  })
  
  React.useEffect(() => {
    if (data?.orders) {
      const count = data.orders.length
      if (prevOrderCount !== null && count > prevOrderCount && chimeEnabled && chimeAudio.current) {
        chimeAudio.current.play().catch(() => {})
        toast.info("New order received!")
      }
      setPrevOrderCount(count)
    }
  }, [data?.orders, prevOrderCount, chimeEnabled])

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update status')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success("Order status updated")
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-full">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-800" />
      </div>
    )
  }

  if (isError) {
    return <div className="p-12 text-red-600 h-full">Failed to load orders.</div>
  }

  const orders = data?.orders || []

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ink uppercase tracking-wide">Orders Board</h1>
          <div className="flex gap-4 mt-2">
            <a href="/api/admin/orders/export" className="text-leaf-700 hover:underline text-sm font-semibold" download>
              Download CSV Export
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="md" onClick={toggleChime} className="text-ink-soft">
            {chimeEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
            Chime {chimeEnabled ? 'On' : 'Off'}
          </Button>
          <Button variant="secondary" size="md" onClick={() => refetch()} className="text-ink-soft">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-canvas border border-line rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-line-soft text-ink-muted uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Order No</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-ink-muted">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-leaf-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-ink-soft">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-ink">{order.customerName}</div>
                    <div className="text-xs text-ink-muted">{order.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">৳{order.total}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-line-soft text-ink text-xs font-semibold">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {order.status === 'pending' && (
                      <Button variant="secondary" size="md" onClick={() => updateStatus.mutate({ id: order.id, status: 'confirmed' })}>
                        Confirm
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <Button variant="secondary" size="md" onClick={() => updateStatus.mutate({ id: order.id, status: 'out_for_delivery' })}>
                        Dispatch
                      </Button>
                    )}
                    {order.status === 'out_for_delivery' && (
                      <Button variant="secondary" size="md" onClick={() => updateStatus.mutate({ id: order.id, status: 'delivered' })}>
                        Mark Delivered
                      </Button>
                    )}
                    {(order.status === 'pending' || order.status === 'confirmed' || order.status === 'out_for_delivery') && (
                      <Button variant="primary" size="md" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => {
                        if (confirm("Are you sure you want to cancel this order?")) {
                          updateStatus.mutate({ id: order.id, status: 'cancelled' })
                        }
                      }}>
                        Cancel
                      </Button>
                    )}
                    <Button variant="secondary" size="md" onClick={() => window.open(`/admin/orders/${order.id}/print`, '_blank')}>
                      <Printer className="w-4 h-4" />
                    </Button>
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
