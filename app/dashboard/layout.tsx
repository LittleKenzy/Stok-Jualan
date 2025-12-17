import { verifySession } from '@/lib/session'
import Link from 'next/link'
import { LayoutDashboard, Package, ArrowRightLeft, LogOut } from 'lucide-react'
import { logout } from '@/actions/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await verifySession()

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 hidden md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <span className="text-lg font-bold text-indigo-500">StokJualan</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <ArrowRightLeft className="h-5 w-5" />
            Transactions
          </Link>
        </nav>
        <div className="border-t border-slate-800 p-4">
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
        {children}
      </main>
    </div>
  )
}
