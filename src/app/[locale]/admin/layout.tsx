import QueryProvider from "@/components/query-provider"
import { AdminNav } from "@/components/admin/admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-canvas">
        <AdminNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </QueryProvider>
  )
}
