"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"

export function MobileBottomBar() {
  const pathname = usePathname()
  
  // TODO: connect to real cart store
  const cartItemCount: number = 0
  const cartTotal = 0

  // Only show on Home, Menu, PDP.
  // We'll check if pathname is '/', '/menu', or '/menu/[slug]'
  const isVisiblePath = pathname === "/" || pathname.startsWith("/menu")
  
  // Also only show if cart is not empty
  const shouldShow = isVisiblePath && cartItemCount > 0

  if (!shouldShow) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe sm:hidden animate-in slide-in-from-bottom-full duration-300 pointer-events-none">
      <Link
        href="/cart"
        className="flex h-14 w-full items-center justify-between rounded-pill bg-leaf-800 px-6 font-semibold text-white shadow-pop transition-colors hover:bg-leaf-900 focus-ring pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
          </div>
          <span>{cartItemCount} item{cartItemCount !== 1 && "s"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>৳{cartTotal}</span>
          <span className="text-white/60">•</span>
          <span>View cart</span>
        </div>
      </Link>
    </div>
  )
}
