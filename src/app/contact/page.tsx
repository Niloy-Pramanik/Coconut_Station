import * as React from "react"
import { Metadata } from "next"
import { MapPin, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Coconut Station",
  description: "Get in touch with Coconut Station. For general inquiries, feedback, or bulk orders.",
}

export default function ContactPage() {
  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Have a question, feedback, or want to discuss a bulk order? We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-leaf-900 mb-6">Contact Info</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-leaf-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-ink">Headquarters</h3>
                  <p className="text-ink-soft">
                    Bottola Bazar More, Bibekanondo School Market<br />
                    Tangail
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-leaf-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-ink">Phone</h3>
                  <p className="text-ink-soft">+880 1234 567 890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-leaf-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-ink">Email</h3>
                  <p className="text-ink-soft">hello@coconutstation.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-leaf-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-leaf-900 mb-6">Send a Message</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">Name</label>
                <input id="name" type="text" className="w-full px-4 py-2 rounded-lg border-line bg-canvas focus:ring-1 focus:ring-leaf-700 outline-none" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">Email</label>
                <input id="email" type="email" className="w-full px-4 py-2 rounded-lg border-line bg-canvas focus:ring-1 focus:ring-leaf-700 outline-none" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-ink mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg border-line bg-canvas focus:ring-1 focus:ring-leaf-700 outline-none resize-none" required />
              </div>
              <button type="submit" className="mt-4 bg-leaf-800 text-canvas px-6 py-3 rounded-lg font-bold hover:bg-leaf-900 transition-colors focus-ring">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
