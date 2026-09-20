"use client"

import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const FAQS = [
  {
    id: "delivery",
    question: "Where do you deliver?",
    answer: "We currently deliver across Tangail Town within a 5km radius of our flagship outlet. We'll be expanding to Dhaka and Bogura soon!",
  },
  {
    id: "hygiene",
    question: "How do you ensure hygiene?",
    answer: "Our coconuts are washed and prepared in a sterile environment following strict safety protocols. Every coconut is handled with gloves and precision tools to ensure maximum cleanliness.",
  },
  {
    id: "sealed-straw",
    question: "What is a sealed straw?",
    answer: "Every coconut comes with a premium, individually sealed straw to guarantee that your drinking experience is 100% safe and untouched.",
  },
  {
    id: "payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major digital payments including bKash, Nagad, and Rocket, as well as credit/debit cards and Cash on Delivery (COD).",
  },
  {
    id: "bulk",
    question: "How much notice do you need for bulk orders?",
    answer: "For events and bulk orders (20+ coconuts), we request at least 24 hours notice to ensure we can source and prepare the freshest batch for you.",
  },
  {
    id: "allergens",
    question: "Are there any allergens in your products?",
    answer: "All our products contain coconut. Some desserts like our ice cream contain milk and peanuts. Please check the allergen tags on individual products or ask our staff.",
  },
  {
    id: "hours",
    question: "What are your opening hours?",
    answer: "We are open daily from 9:00 AM to 10:00 PM. Delivery slots are available throughout our opening hours.",
  },
  {
    id: "cancellation",
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 5 minutes of placement. Since our products are cut fresh to order, we cannot accept cancellations once preparation has begun.",
  },
]

export function Faq() {
  return (
    <section className="py-24 bg-leaf-50 overflow-hidden">
      <div className="container px-4 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-4">
            Frequently Asked
          </h2>
          <p className="text-lg text-ink-soft">
            Everything you need to know about our products and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-line">
              <AccordionTrigger className="text-left text-lg font-semibold text-leaf-900 py-6 hover:text-leaf-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-ink-soft text-base pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
