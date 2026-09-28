import { Hero } from "@/components/home/hero"
import dynamic from 'next/dynamic'
import { siteConfig } from "@/content/site.config"
import { buildMetadata } from "@/lib/seo"

const MomentPickerTeaser = dynamic(() => import("@/components/home/moment-picker-teaser").then(mod => mod.MomentPickerTeaser), { ssr: true })
const WhyCoconut = dynamic(() => import("@/components/home/why-coconut").then(mod => mod.WhyCoconut), { ssr: true })
const BlogTeasers = dynamic(() => import("@/components/home/blog-teasers").then(mod => mod.BlogTeasers), { ssr: true })
const PastryBand = dynamic(() => import("@/components/home/pastry-band").then(mod => mod.PastryBand), { ssr: true })
const Faq = dynamic(() => import("@/components/home/faq").then(mod => mod.Faq), { ssr: true })

export const metadata = buildMetadata({
  title: "Home",
  description: siteConfig.description,
  path: "/",
})

export default async function HomePage() {
  return (
    <>
      <Hero />
      <MomentPickerTeaser />
      <WhyCoconut />
      <BlogTeasers />
      <PastryBand />
      <Faq />
    </>
  )
}
