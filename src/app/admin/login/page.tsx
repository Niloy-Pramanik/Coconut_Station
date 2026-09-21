import { Metadata } from "next"
import { LoginForm } from "@/components/admin/login-form"

export const metadata: Metadata = {
  title: "Admin Login",
  robots: "noindex, nofollow",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-leaf-800 uppercase">
          Coconut Station
        </h2>
        <p className="mt-2 text-center text-sm text-ink-soft">
          Secure admin access portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-canvas border border-line py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
