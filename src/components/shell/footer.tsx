import { Link } from "@/i18n/routing"
import Image from "next/image"
import { siteConfig } from "@/content/site.config"
import { Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const enabledPayments = Object.entries(siteConfig.payments.wallets)
    .filter(([_key, value]) => value !== null)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
    
  return (
    <footer className="bg-leaf-900 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Logo & Social */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="focus-ring rounded-sm w-fit">
              <Image
                src="/assets/brand/logo-full-cream.png"
                alt="Coconut Station"
                width={180}
                height={54}
                className="w-auto h-12"
              />
            </Link>
            <p className="text-leaf-100 font-script text-2xl">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-4 mt-2">
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="text-leaf-100 hover:text-white transition-colors focus-ring rounded-sm">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="text-leaf-100 hover:text-white transition-colors focus-ring rounded-sm">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="text-leaf-100 hover:text-white transition-colors focus-ring rounded-sm">
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">YouTube</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Menu</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/menu" className="text-leaf-100 hover:text-white transition-colors w-fit focus-ring rounded-sm">All Products</Link>
              <Link href="/why-coconut" className="text-leaf-100 hover:text-white transition-colors w-fit focus-ring rounded-sm">Why Coconut?</Link>
              <Link href="/events" className="text-leaf-100 hover:text-white transition-colors w-fit focus-ring rounded-sm">Bulk & Events</Link>
            </nav>
          </div>

          {/* Column 3: Outlet */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Our Outlets</h3>
            {siteConfig.outlets.map((outlet) => (
              <div key={outlet.id} className="flex flex-col gap-1 text-leaf-100">
                <span className="text-white font-medium">{outlet.name}</span>
                <span>{outlet.address}</span>
                <span>{outlet.hours}</span>
              </div>
            ))}
            <div className="mt-2 text-leaf-200 text-sm">
              Coming soon: Dhaka · Bogura
            </div>
          </div>

          {/* Column 4: Contact & Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="flex flex-col gap-3 text-leaf-100">
              {siteConfig.contact.phone && (
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors w-fit focus-ring rounded-sm">
                  {siteConfig.contact.phone}
                </a>
              )}
              {siteConfig.contact.whatsapp && (
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} className="hover:text-white transition-colors w-fit focus-ring rounded-sm">
                  WhatsApp Us
                </a>
              )}
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors w-fit focus-ring rounded-sm">
                  {siteConfig.contact.email}
                </a>
              )}
              <div className="flex flex-col gap-1 mt-2">
                <Link href="/privacy" className="hover:text-white transition-colors w-fit focus-ring rounded-sm">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors w-fit focus-ring rounded-sm">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-[1.5px] border-leaf-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-leaf-200">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span>Payment Methods:</span>
            <span className="font-medium text-white">
              Cash on Delivery{enabledPayments.length > 0 ? `, ${enabledPayments.join(", ")}` : ""}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
