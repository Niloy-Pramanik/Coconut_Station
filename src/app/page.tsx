import { Hero } from "@/components/home/hero"
import { PickYourSize } from "@/components/home/pick-your-size"
import { SignatureMenu } from "@/components/home/signature-menu"
import { WhyCoconut } from "@/components/home/why-coconut"
import { MomentPickerTeaser } from "@/components/home/moment-picker-teaser"
import { OutletSpotlight } from "@/components/home/outlet-spotlight"
import { BulkEventsBand } from "@/components/home/bulk-events-band"
import { BlogTeasers } from "@/components/home/blog-teasers"
import { Faq } from "@/components/home/faq"
import { ExpansionNotify } from "@/components/home/expansion-notify"
import { siteConfig } from "@/content/site.config"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Home",
  description: siteConfig.description,
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <Hero />
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
