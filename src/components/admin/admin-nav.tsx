"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Mail, Users, LogOut } from "lucide-react"

const navItems = [
  {
    name: "Orders",
    href: "/admin/orders",
    icon: LayoutDashboard
  },
  {
    name: "Catalog",
    href: "/admin/catalog",
    icon: Package
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail
  },
  {
    name: "Subscribers",
    href: "/admin/subscribers",
    icon: Users
  }
]

export function AdminNav() {
  const pathname = usePathname()

  // Hide nav on login page
  if (pathname === "/admin/login") {
    return null
  }

  return (
    <div className="flex flex-col w-64 border-r border-line bg-canvas min-h-screen p-4">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-extrabold text-leaf-800 uppercase tracking-tight">Coconut Station</h1>
        <p className="text-xs text-ink-soft uppercase font-semibold mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? "bg-leaf-100 text-leaf-800" 
                  : "text-ink hover:bg-canvas-alt"
              }`}
            >
              <Icon className={`mr-3 w-5 h-5 ${isActive ? "text-leaf-600" : "text-ink-soft"}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="pt-4 border-t border-line">
        <button 
          onClick={() => {
            document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
            window.location.href = "/admin/login"
          }}
          className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-ink hover:bg-canvas-alt transition-colors"
        >
          <LogOut className="mr-3 w-5 h-5 text-ink-soft" />
          Logout
        </button>
      </div>
    </div>
  )
}
