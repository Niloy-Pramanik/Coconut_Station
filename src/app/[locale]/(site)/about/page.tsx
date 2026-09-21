import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Coconut Station",
  description: "The story behind Coconut Station. How we started bringing fresh, natural coconuts to Tangail.",
}

export default function AboutPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Our Story
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            We started with a simple idea: everyone deserves access to fresh, natural, unadulterated coconut water, served with hygiene and care.
          </p>
        </header>

        {/* Placeholder image */}
        <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden shadow-soft mb-16 bg-leaf-50">
          <Image
            src="/assets/scenes/outlet-exterior.webp"
            alt="Coconut Station team"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg prose-leaf mx-auto text-ink">
          <h2>The Beginning</h2>
          <p>
            Coconut Station was born out of a frustration with the way fresh coconut water was traditionally sold—often unhygienic, improperly chilled, and lacking the premium experience such a natural superfood deserves.
          </p>
          <p>
            We realized that while people loved the taste and health benefits of coconuts, they hesitated due to hygiene concerns. That's when we decided to elevate the humble street-side coconut into a premium, trustworthy experience.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make natural hydration accessible, hygienic, and delightful. We carefully select the best coconuts, chill them to the perfect temperature, and serve them with our signature "smart cut" and a sealed straw. No added sugar. No preservatives. Just 100% natural goodness.
          </p>
          
          <blockquote className="border-l-4 border-leaf-700 pl-6 my-10 italic text-xl text-leaf-900 font-medium">
            "Nature already made the perfect drink. Our job is simply to serve it to you exactly as nature intended—pure, fresh, and cold."
          </blockquote>

          <h2>Looking Forward</h2>
          <p>
            What started as a single flagship outlet in Tangail is growing. We are constantly experimenting with new ways to bring the goodness of coconut to you, from our signature coconut coffee to our guilt-free coconut pudding. 
          </p>
          <p>
            Thank you for being part of our journey. Stay hydrated, stay healthy.
          </p>
        </div>
      </div>
    </div>
  )
}
