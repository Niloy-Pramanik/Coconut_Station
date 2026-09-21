"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Chip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { QtyStepper } from "@/components/ui/qty-stepper"
import { ProgressBar } from "@/components/ui/progress-bar"

export function StyleGuideContent() {
  return (
    <div className="min-h-screen bg-canvas text-ink pb-24">
      <header className="bg-leaf-900 text-canvas py-8 mb-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold">Coconut Station Style Guide</h1>
          <p className="mt-2 text-canvas/80">UI Components and Design Tokens</p>
        </div>
      </header>

      <main className="container px-4 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-leaf-800 mb-6 pb-2 border-b border-line">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <div className="bg-leaf-900 p-4 rounded-lg flex gap-4">
              <Button variant="on-dark">On Dark</Button>
              <Button variant="secondary-on-dark">Secondary On Dark</Button>
            </div>
            <Button variant="danger">Danger Button</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-leaf-800 mb-6 pb-2 border-b border-line">Badges & Chips</h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="info">Info Badge</Badge>
              <Badge variant="completed">Completed Badge</Badge>
              <Badge variant="warning">Warning Badge</Badge>
              <Badge variant="danger">Danger Badge</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              <Chip>Default Chip</Chip>
              <Chip active>Selected Chip</Chip>
              <Chip disabled>Disabled Chip</Chip>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-leaf-800 mb-6 pb-2 border-b border-line">Inputs & Forms</h2>
          <div className="grid max-w-sm gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="input">Standard Input</Label>
              <Input id="input" placeholder="Placeholder text..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Type your message here..." />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantity Stepper</Label>
              <QtyStepper value={1} min={1} max={10} onChange={() => {}} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-leaf-800 mb-6 pb-2 border-b border-line">Progress & Layout</h2>
          <div className="grid max-w-md gap-8">
            <div className="flex flex-col gap-2">
              <Label>Progress Bar</Label>
              <ProgressBar value={60} max={100} label="Free delivery threshold" />
            </div>
            
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Delivery</TabsTrigger>
                <TabsTrigger value="tab2">Pickup</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 border border-line rounded-lg mt-2">
                Delivery content...
              </TabsContent>
              <TabsContent value="tab2" className="p-4 border border-line rounded-lg mt-2">
                Pickup content...
              </TabsContent>
            </Tabs>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it 100% natural?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use no added sugar, preservatives, or artificial flavours.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                <AccordionContent>
                  Standard delivery is within 45 minutes in our coverage areas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  )
}
