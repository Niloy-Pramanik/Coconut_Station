"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function OutletSpotlight() {
  return (
    <section className="py-16 md:py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-3xl mx-auto">
        <div className="border-2 border-dashed border-leaf-300 rounded-3xl p-8 md:p-14 bg-leaf-50 flex flex-col items-center text-center shadow-sm relative">
          
          <div className="w-16 h-16 bg-canvas rounded-full flex items-center justify-center mb-6 shadow-sm border border-line">
            <svg className="w-8 h-8 text-leaf-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-leaf-900 uppercase mb-4 tracking-tight">
            We're Expanding!
          </h2>
          
          <p className="text-lg md:text-xl text-ink-soft mb-10 max-w-2xl leading-relaxed">
            Dhaka and Bogura, we hear you. We're working hard to bring Coconut Station to your city. Leave your contact info and be the first to know when we launch!
          </p>

          <form 
            className="w-full max-w-lg flex flex-col gap-4" 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Thank you! We will notify you when we reach your city."); 
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                className="w-full sm:w-1/3 h-14 rounded-xl border-none bg-canvas px-5 text-base text-ink focus:outline-none focus:ring-2 focus:ring-leaf-500 shadow-sm" 
                required
                defaultValue=""
              >
                <option value="" disabled>Select City</option>
                <option value="dhaka">Dhaka</option>
                <option value="bogura">Bogura</option>
                <option value="other">Other</option>
              </select>
              <Input 
                type="text" 
                placeholder="Email or Phone Number" 
                required 
                className="w-full sm:w-2/3 h-14 rounded-xl border-none bg-canvas px-5 text-base shadow-sm" 
              />
            </div>
            <Button type="submit" variant="primary" className="h-14 w-full rounded-xl text-lg font-bold shadow-md">
              Notify Me
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </form>

        </div>
      </div>
    </section>
  )
}
