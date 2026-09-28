"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function OutletSpotlight() {
  return (
    <section className="py-12 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="border-2 border-dashed border-leaf-300 rounded-xl p-6 md:p-8 bg-leaf-50/50 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-leaf-900 mb-2">Expanding Soon!</h3>
            <p className="text-sm text-ink-soft">
              We are bringing Coconut Station to <span className="font-semibold text-leaf-700">Dhaka</span> and <span className="font-semibold text-leaf-700">Bogura</span>. Select your city to get notified when we launch.
            </p>
          </div>

          <form 
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3" 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Thank you! We will notify you when we reach your city."); 
              (e.target as HTMLFormElement).reset();
            }}
          >
            <Input 
              type="text" 
              placeholder="Email or Phone" 
              required 
              className="w-full sm:w-48 bg-canvas text-sm h-10" 
            />
            <select 
              className="w-full sm:w-36 h-10 rounded-md border border-line bg-canvas px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-colors" 
              required
              defaultValue=""
            >
              <option value="" disabled>City...</option>
              <option value="dhaka">Dhaka</option>
              <option value="bogura">Bogura</option>
              <option value="other">Other</option>
            </select>
            <Button type="submit" variant="primary" className="h-10 px-6 shrink-0">
              Notify Me
            </Button>
          </form>

        </div>
      </div>
    </section>
  )
}
