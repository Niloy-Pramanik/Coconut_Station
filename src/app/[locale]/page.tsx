import { Hero } from "@/components/home/hero"
import { HeroVideo } from "@/components/home/hero-video"
import { PickYourSize } from "@/components/home/pick-your-size"
import { SignatureMenu } from "@/components/home/signature-menu"
import dynamic from 'next/dynamic'
import { siteConfig } from "@/content/site.config"
import { buildMetadata } from "@/lib/seo"

const WhyCoconut = dynamic(() => import("@/components/home/why-coconut").then(mod => mod.WhyCoconut), { ssr: true })
const MomentPickerTeaser = dynamic(() => import("@/components/home/moment-picker-teaser").then(mod => mod.MomentPickerTeaser), { ssr: true })
const OutletSpotlight = dynamic(() => import("@/components/home/outlet-spotlight").then(mod => mod.OutletSpotlight), { ssr: true })
const BulkEventsBand = dynamic(() => import("@/components/home/bulk-events-band").then(mod => mod.BulkEventsBand), { ssr: true })
const BlogTeasers = dynamic(() => import("@/components/home/blog-teasers").then(mod => mod.BlogTeasers), { ssr: true })
const Faq = dynamic(() => import("@/components/home/faq").then(mod => mod.Faq), { ssr: true })
const ExpansionNotify = dynamic(() => import("@/components/home/expansion-notify").then(mod => mod.ExpansionNotify), { ssr: true })

export const metadata = buildMetadata({
  title: "Home",
  description: siteConfig.description,
  path: "/",
})

export default function HomePage() {
  return (
    <>
      {siteConfig.hero.mode === 'video' ? <HeroVideo /> : <Hero />}
      <PickYourSize />
      <SignatureMenu />
      <WhyCoconut />
      <MomentPickerTeaser />
      <OutletSpotlight />
      <BulkEventsBand />
      <BlogTeasers />
      <Faq />
      <ExpansionNotify />
      {/* Other sections will be added here in subsequent tasks */}
    </>
  )
}
