import { Hero } from "@/components/home/hero"
import { SignatureMenu } from "@/components/home/signature-menu"
import dynamic from 'next/dynamic'
import { siteConfig } from "@/content/site.config"
import { getVisibleProducts } from "@/features/catalog/queries"
import { buildMetadata } from "@/lib/seo"

import { StoryIntro } from "@/components/home/story-intro"
const WhyCoconut = dynamic(() => import("@/components/home/why-coconut").then(mod => mod.WhyCoconut), { ssr: true })
const OutletSpotlight = dynamic(() => import("@/components/home/outlet-spotlight").then(mod => mod.OutletSpotlight), { ssr: true })
const PastryBand = dynamic(() => import("@/components/home/pastry-band").then(mod => mod.PastryBand), { ssr: true })

export const metadata = buildMetadata({
  title: "Home",
  description: siteConfig.description,
  path: "/",
})

export default async function HomePage() {
  const products = await getVisibleProducts();

  return (
    <>
      <Hero />
      <StoryIntro />
      <WhyCoconut />
      <SignatureMenu products={products} />
      <PastryBand />
      <OutletSpotlight />
    </>
  )
}
