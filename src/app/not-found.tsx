import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-extrabold text-leaf-800 tracking-tight sm:text-5xl">
        404
      </h1>
      <p className="mt-4 text-lg text-ink-muted max-w-md">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild variant="primary">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    </div>
  )
}
