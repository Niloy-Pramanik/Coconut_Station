"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { usePathname } from "@/i18n/routing"
import { ShoppingBag, Menu, Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/why-coconut", label: "Why Coconut?" },
  { href: "/outlets", label: "Outlets" },
  { href: "/events", label: "Events" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // TODO: connect to real cart store
  const cartItemCount = 0

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-[1.5px] border-transparent bg-canvas transition-all duration-300",
        isScrolled ? "h-16 border-line shadow-soft" : "h-[88px]"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center focus-ring rounded-sm">
          <Image
            src="/assets/brand/logo-full.png"
            alt="Coconut Station"
            width={160}
            height={48}
            className={cn(
              "w-auto transition-all duration-300",
              isScrolled ? "h-8" : "h-10"
            )}
            priority
          />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors focus-ring rounded-sm py-1 hover:text-leaf-700",
                pathname === link.href ? "text-leaf-700" : "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden lg:flex items-center justify-center h-11 w-11 rounded-full text-ink hover:bg-leaf-50 hover:text-leaf-800 transition-colors focus-ring"
            aria-label="Change language"
          >
            <Globe className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <Link href="/cart" className="relative flex items-center justify-center h-11 w-11 rounded-full text-ink hover:bg-leaf-50 hover:text-leaf-800 transition-colors focus-ring">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {cartItemCount > 0 && (
              <div
                className="absolute right-0 top-0 h-5 min-w-[20px] bg-leaf-700 text-white border-canvas rounded-pill flex items-center justify-center px-1 text-[10px] font-bold"
              >
                {cartItemCount}
              </div>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          <Button asChild variant="primary" className="hidden lg:inline-flex">
            <Link href="/outlets">Find an Outlet</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden flex items-center justify-center h-11 w-11 rounded-full text-ink hover:bg-leaf-50 hover:text-leaf-800 transition-colors focus-ring"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" strokeWidth={1.75} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-full border-r-0 pt-16 bg-canvas flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 p-6 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-2xl font-semibold transition-colors focus-ring rounded-sm w-fit hover:text-leaf-700",
                      pathname === link.href ? "text-leaf-700" : "text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-6 border-t-[1.5px] border-line flex flex-col gap-4">
                <Button variant="secondary" className="w-full justify-center">
                  <Globe className="h-5 w-5 mr-2" />
                  বাংলা
                </Button>
                <Button asChild variant="primary" className="w-full justify-center">
                  <Link href="/outlets">Find an Outlet</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
