import * as React from "react"
import { Metadata } from "next"
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import { siteConfig } from "@/content/site.config"
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
                    {siteConfig.outlets[0].address}
                  </p>
                </div>
              </div>
              {siteConfig.contact.phone && (
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-leaf-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-ink">Phone</h3>
                    <p className="text-ink-soft">
                      <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-leaf-800 transition-colors">
                        +{siteConfig.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {siteConfig.contact.whatsapp && (
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-leaf-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-ink">WhatsApp</h3>
                    <p className="text-ink-soft">
                      <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-leaf-800 transition-colors">
                        +{siteConfig.contact.whatsapp}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {siteConfig.contact.publicEmail && (
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-leaf-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-ink">Email</h3>
                    <p className="text-ink-soft">
                      <a href={`mailto:${siteConfig.contact.publicEmail}`} className="hover:text-leaf-800 transition-colors">
                        {siteConfig.contact.publicEmail}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-leaf-50 p-8 rounded-xl h-fit">
            <h2 className="text-2xl font-bold text-leaf-900 mb-6">Let's Connect</h2>
            <p className="text-ink-soft mb-6 leading-relaxed">
              For general inquiries or to discuss a bulk order for an upcoming event, you can reach us via phone or WhatsApp. We recommend WhatsApp for the fastest response.
            </p>
            {siteConfig.contact.whatsapp && (
              <a 
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition-colors focus-ring w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Message on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
