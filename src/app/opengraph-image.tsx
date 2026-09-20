import { ImageResponse } from "next/og"
import { siteConfig } from "@/content/site.config"

export const runtime = "edge"

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  // We can load fonts or local assets here if needed.
  // For simplicity and speed, we will use default sans font, and basic shapes that match "cream card, logo, scene crop".

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#052210", // leaf-900
          position: "relative",
        }}
      >
        {/* Left Side: Cream Card */}
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 48,
            bottom: 48,
            width: "55%",
            backgroundColor: "#F9F8F5", // canvas / cream
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            zIndex: 10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#052210", // leaf-900
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {siteConfig.name}
            </h1>
            <p
              style={{
                fontSize: 32,
                color: "#1a1a1a", // ink
                lineHeight: 1.4,
              }}
            >
              {siteConfig.tagline}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              color: "#0a4020", // leaf-700
              fontWeight: 600,
            }}
          >
            Bringing nature&apos;s finest coconut experience to your everyday life.
          </div>
        </div>

        {/* Right Side: Scene Crop Placeholder (since we can't reliably load remote images in OG without absolute URLs, we use a decorative pattern or gradient) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "50%",
            display: "flex",
            background: "linear-gradient(to right, #052210, #0a4020)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
