"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type CatalogItem = {
  sku: string
  name: string
  volumeML: number
  priceBDT: number
  isSoldOut: boolean
}

export default function AdminCatalogPage() {
  const queryClient = useQueryClient()
  
  const { data, isLoading, isError } = useQuery<{ catalog: CatalogItem[] }>({
    queryKey: ['admin-catalog'],
    queryFn: async () => {
      const res = await fetch('/api/admin/catalog')
      if (!res.ok) throw new Error('Failed to fetch catalog')
      return res.json()
    },
  })

  const updateItem = useMutation({
    mutationFn: async ({ sku, isSoldOut, priceBDT }: { sku: string, isSoldOut: boolean, priceBDT: number }) => {
      const res = await fetch(`/api/admin/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, isSoldOut, priceBDT })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update catalog item')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success("Catalog updated")
      queryClient.invalidateQueries({ queryKey: ['admin-catalog'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-800" />
      </div>
    )
  }

  if (isError) {
    return <div className="p-12 text-red-600">Failed to load catalog.</div>
  }

  const catalog = data?.catalog || []

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink uppercase tracking-wide">Catalog Overrides</h1>
        <p className="text-ink-soft mt-2 text-sm">
          Update prices or mark items as sold out. Changes are applied immediately to the storefront.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map(item => (
          <div key={item.sku} className="bg-canvas border border-line rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-ink">{item.name}</h3>
                  <p className="text-sm text-ink-muted">{item.sku} • {item.volumeML}ml</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${item.isSoldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {item.isSoldOut ? 'SOLD OUT' : 'IN STOCK'}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mb-1">
                  Price (BDT)
                </label>
                <input 
                  type="number" 
                  defaultValue={item.priceBDT}
                  onBlur={(e) => {
                    const val = parseInt(e.target.value)
                    if (val !== item.priceBDT && !isNaN(val)) {
                      updateItem.mutate({ sku: item.sku, isSoldOut: item.isSoldOut, priceBDT: val })
                    }
                  }}
                  className="w-full px-3 py-2 border border-line rounded focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none"
                />
              </div>
            </div>

            <Button
              variant={item.isSoldOut ? 'secondary' : 'danger'}
              className="w-full"
              onClick={() => {
                updateItem.mutate({ sku: item.sku, isSoldOut: !item.isSoldOut, priceBDT: item.priceBDT })
              }}
              disabled={updateItem.isPending}
            >
              {item.isSoldOut ? 'Mark In Stock' : 'Mark Sold Out'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
