import * as React from "react"
import { Metadata } from "next"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pastry Station | Coconut Station",
  description: "Cakes, Pastries, and more by Coconut Station.",
}

export default function PastryStationPage() {
  return (
    <div className="bg-leaf-50 min-h-screen pt-32 pb-32">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left: Image */}
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[650px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-soft border-4 border-canvas">
              <Image
                src="/assets/posters/PASTRY_STATION.jpg"
                alt="Pastry Station"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Info Card */}
          <div className="w-full md:w-1/2">
            <div className="bg-canvas rounded-3xl p-8 md:p-12 shadow-sm border border-line">
              <div className="inline-flex items-center rounded-pill border border-leaf-700/20 bg-leaf-100 px-4 py-1.5 text-xs font-bold text-leaf-800 mb-8 shadow-sm uppercase tracking-wider">
                Sister Brand
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-leaf-900 uppercase mb-6 tracking-tight">
                Pastry Station
              </h1>
              
              <p className="text-ink-soft text-xl leading-relaxed mb-10">
                Craving something sweet? Discover our premium selection of cakes, pastries, and desserts. Baked fresh daily with the same commitment to quality and natural ingredients you love from Coconut Station.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-transparent shadow-md font-semibold">
                  <a href="https://www.facebook.com/pastrystatoinbd" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Visit our Facebook
                  </a>
                </Button>
                
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                  <a href="https://www.facebook.com/pastrystatoinbd" target="_blank" rel="noopener noreferrer">
                    Explore Menu <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
