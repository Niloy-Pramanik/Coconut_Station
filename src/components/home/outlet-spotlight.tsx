import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function OutletSpotlight() {
  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-2xl mx-auto">
        <div className="border border-leaf-200 rounded-2xl p-8 md:p-12 bg-leaf-50 shadow-sm flex flex-col justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-leaf-900 mb-4 uppercase">We Are Expanding!</h2>
          <p className="text-ink-soft mb-8 text-lg">
            Want Coconut Station in your city? Leave your contact info and select your city to get notified when we launch.
          </p>
          <form 
            className="flex flex-col gap-5 w-full max-w-md mx-auto text-left" 
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Thank you! We will notify you when we reach your city."); 
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-leaf-900">Contact Information</label>
              <Input type="text" placeholder="Email or Phone number" required className="w-full bg-canvas text-base py-6" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-leaf-900">Select City</label>
              <select 
                className="flex h-12 w-full rounded-md border border-line bg-canvas px-3 py-2 text-base text-ink focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-colors" 
                required
                defaultValue=""
              >
                <option value="" disabled>Choose a city...</option>
                <option value="dhaka">Dhaka</option>
                <option value="bogura">Bogura</option>
                <option value="chittagong">Chittagong</option>
                <option value="sylhet">Sylhet</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full mt-4 text-lg">
              Notify Me
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
