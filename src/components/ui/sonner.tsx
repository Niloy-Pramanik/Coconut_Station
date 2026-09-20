"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface group-[.toaster]:text-ink group-[.toaster]:border-line group-[.toaster]:shadow-pop rounded-lg p-4 font-sans max-sm:bottom-[72px] max-sm:!mb-0 max-sm:w-[calc(100%-32px)] max-sm:mx-auto max-sm:left-0 max-sm:right-0 max-sm:fixed",
          description: "group-[.toast]:text-ink-muted text-sm",
          actionButton:
            "group-[.toast]:bg-leaf-700 group-[.toast]:text-white font-semibold rounded-pill px-4 py-2",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-ink-muted",
          icon: "group-[.toast]:text-leaf-700",
        },
      }}
      {...props}
    />
  )
}


export { Toaster }
