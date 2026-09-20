import { Hero } from "@/components/home/hero"
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
      {/* Other sections will be added here in subsequent tasks */}
    </>
  )
}
