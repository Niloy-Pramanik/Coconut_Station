"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loginAction } from "@/app/admin/login/actions"

export function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setIsSubmitting(true)
    try {
      const res = await loginAction(password)
      if (res.error) {
        toast.error(res.error)
      } else if (res.success) {
        toast.success("Login successful")
        router.push("/admin/orders")
        router.refresh()
      }
    } catch (error) {
      toast.error("An error occurred during login.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-sm w-full">
      <div>
        <label className="block text-sm font-semibold text-ink mb-2">
          Admin Password
        </label>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-line focus:border-leaf-800 focus:ring-1 focus:ring-leaf-800 outline-none transition-all bg-canvas"
          placeholder="Enter password..."
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full h-12 text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Authenticating...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}
