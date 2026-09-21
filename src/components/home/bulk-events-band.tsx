"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { ArrowRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BulkEventsBand() {
  return (
    <section className="bg-leaf-900 py-16 lg:py-20">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-canvas uppercase mb-4">
              Planning an Event?
            </h2>
            <p className="text-canvas/80 text-lg max-w-2xl mx-auto lg:mx-0">
              Elevate your next gathering with our premium live coconut cart service. Perfect for weddings, corporate events, and parties. Special pricing available for bulk orders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="flex items-center gap-6 mr-4 hidden sm:flex">
              <div className="flex flex-col items-center text-canvas/70">
                <Calendar className="w-8 h-8 mb-2 text-leaf-300" strokeWidth={1.5} />
                <span className="text-sm font-semibold uppercase tracking-wider">Events</span>
              </div>
              <div className="w-[1px] h-12 bg-canvas/20" />
              <div className="flex flex-col items-center text-canvas/70">
                <Users className="w-8 h-8 mb-2 text-leaf-300" strokeWidth={1.5} />
                <span className="text-sm font-semibold uppercase tracking-wider">Bulk</span>
              </div>
            </div>

            <Button asChild variant="primary" size="lg" className="bg-canvas text-leaf-900 hover:bg-canvas/90">
              <Link href="/events">
                Get a quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
