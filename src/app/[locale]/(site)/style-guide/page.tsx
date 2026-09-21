import { Metadata } from "next"
import { StyleGuideContent } from "./client-page"

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
}

export default function StyleGuidePage() {
  return <StyleGuideContent />
}
