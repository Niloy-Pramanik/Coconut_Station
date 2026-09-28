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

        <div className="w-full rounded-2xl overflow-hidden shadow-soft mb-16 bg-leaf-50">
          <Image
            src="/assets/scenes/outlet-exterior.webp"
            alt="Coconut Station team"
            width={1200}
            height={675}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="mx-auto max-w-3xl flex flex-col gap-8 text-ink text-lg leading-relaxed">
          <section id="who-we-are">
            <h2 className="text-3xl font-extrabold text-leaf-900 uppercase mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to make natural hydration accessible, hygienic, and delightful. We carefully select the best coconuts, chill them to the perfect temperature, and serve them with our signature "smart cut" and a sealed straw. No added sugar. No preservatives. Just 100% natural goodness.
            </p>
          </section>
          
          <blockquote className="border-l-4 border-leaf-700 pl-6 my-4 italic text-2xl text-leaf-900 font-medium leading-snug">
            "Nature already made the perfect drink. Our job is simply to serve it to you exactly as nature intended—pure, fresh, and cold."
          </blockquote>

          <section id="why-coconut">
            <h2 className="text-3xl font-extrabold text-leaf-900 uppercase mb-4 mt-4">Why Coconut?</h2>
            <p className="mb-4">
              Coconut water is a natural source of electrolytes, keeping you hydrated and refreshed. We serve it in its purest form, exactly as nature intended.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-leaf-900 uppercase mb-4 mt-4">Looking Forward</h2>
            <p className="mb-4">
              What started as a single flagship outlet in Tangail is growing. We are constantly experimenting with new ways to bring the goodness of coconut to you, from our signature coconut coffee to our guilt-free coconut pudding. 
            </p>
            <p>
              Thank you for being part of our journey. Stay hydrated, stay healthy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
