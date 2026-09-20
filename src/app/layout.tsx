import type { Metadata, Viewport } from "next"
import { Fira_Sans } from "next/font/google"
import { Marck_Script } from "next/font/google"
import "./globals.css"

import { siteConfig } from "@/content/site.config"
import { Header } from "@/components/shell/header"
import { Footer } from "@/components/shell/footer"
import { AnnouncementBar } from "@/components/shell/announcement-bar"
import { MobileBottomBar } from "@/components/shell/mobile-bottom-bar"
import { QuickContact } from "@/components/shell/quick-contact"
import { SkipLink } from "@/components/shell/skip-link"
import { Toaster } from "@/components/ui/sonner"

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-sans",
  display: "swap",
})

const marckScript = Marck_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#052210", // leaf-900
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
  },
  description: "Bringing nature's finest coconut experience to your everyday life.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${firaSans.variable} ${marckScript.variable} antialiased scroll-smooth`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-ink selection:bg-leaf-700 selection:text-white">
        <SkipLink />
        <AnnouncementBar />
        <Header />
        
        <main id="main-content" className="flex-1 outline-none relative z-0">
          {children}
        </main>

        <Footer />
        <MobileBottomBar />
        <QuickContact />
        <Toaster />
      </body>
    </html>
  )
}
