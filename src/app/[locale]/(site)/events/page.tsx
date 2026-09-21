import React from 'react'
import { EventWizard } from '@/components/events/EventWizard'

export default async function EventsPage({
  params
}: {
  params: { locale: string }
}) {

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">
          Events & Bulk Orders
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto">
          Whether you're hosting a wedding, corporate event, or just need a large quantity, we've got you covered with our premium coconut treats.
        </p>
      </div>

      <EventWizard />
    </div>
  )
}
