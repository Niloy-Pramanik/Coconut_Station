"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PastryBand() {
  return (
    <section className="bg-leaf-900 py-16 lg:py-20">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-canvas uppercase mb-4">
              Pastry Station
            </h2>
            <p className="text-canvas/80 text-lg max-w-2xl mx-auto lg:mx-0">
              Cakes and pastries by Coconut Station. {/* OWNER_CONFIRM */}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Button asChild variant="primary" size="lg" className="bg-canvas text-leaf-900 hover:bg-canvas/90">
              <Link href="/pastry-station">
                Visit Pastry Station
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
