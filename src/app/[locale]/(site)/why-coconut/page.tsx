import * as React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Coconut? | Coconut Station",
  description: "Learn about the natural benefits of our fresh coconuts, prepared hygienically and served chilled.",
}

export default function WhyCoconutPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Why Coconut?
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed">
            The ultimate natural refreshment, straight from the source to you.
          </p>
        </header>

        <div className="bg-leaf-50 rounded-xl p-8 mb-12 shadow-sm text-sm text-ink-soft border border-leaf-200">
          <strong>Disclaimer:</strong> The content on this page is provided for general information purposes only and is not intended as medical advice. Always consult with a healthcare professional regarding any specific dietary or medical concerns.
        </div>

        <div className="prose prose-lg prose-leaf mx-auto text-ink">
          <h2>100% Natural Hydration</h2>
          <p>
            Nature provides the best sports drink. Coconut water is packed with naturally occurring electrolytes, particularly potassium, making it an excellent choice for rehydration after a workout, during a hot day, or whenever you need a refreshing lift. We never add sugar, preservatives, or artificial flavors to our fresh coconuts.
          </p>

          <h2>Hygienic and Safe</h2>
          <p>
            We take food safety seriously. Our coconuts are thoroughly washed before being cut. We use a precise "smart cut" method in a clean environment, and every coconut is served with an individually sealed straw. This ensures that the water inside remains completely untouched from the tree to you.
          </p>

          <h2>Served Chilled</h2>
          <p>
            There's nothing quite like ice-cold coconut water. We store our coconuts at the optimal temperature so that when you order, you receive a perfectly chilled, immensely refreshing drink every time.
          </p>

          <h2>Fresh Daily</h2>
          <p>
            We don't believe in long shelf lives for fresh produce. Our coconuts are sourced, delivered, and prepared daily. Once cut, they are meant to be enjoyed immediately for maximum taste and freshness. 
          </p>

          <hr className="my-12 border-line" />
          
          <h2 className="text-2xl font-bold text-leaf-900 mb-6">Allergen Information</h2>
          <p>
            Please note that all our core products are made from or contain <strong>coconut</strong> (a tree nut). Additionally, some of our specialty items, such as shakes, puddings, and ice creams, contain <strong>milk</strong> and <strong>peanuts</strong>. We display clear allergen tags on our menu items, but please ask our staff if you have severe allergies.
          </p>
        </div>
      </div>
    </div>
  )
}
