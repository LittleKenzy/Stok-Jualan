import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Riwayat Transaksi</h1>
        <Link href="/dashboard/transactions/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Catat Transaksi
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase">
                <tr>
                <th className="px-6 py-3">Tanggal / Waktu</th>
                <th className="px-6 py-3">Produk</th>
                <th className="px-6 py-3">Tipe</th>
                <th className="px-6 py-3">Jumlah</th>
                <th className="px-6 py-3">Stok Saat Ini</th>
                </tr>
            </thead>
            <tbody>
                {transactions.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        Belum ada transaksi.
                    </td>
                 </tr>
                ) : (
                    transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                            {tx.createdAt.toLocaleString('id-ID', { 
                                dateStyle: 'medium', 
                                timeStyle: 'short' 
                            })}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                            {tx.product?.name || 'Produk Dihapus'}
                        </td>
                        <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tx.type === 'IN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                                {tx.type === 'IN' ? 'Masuk' : 'Keluar'}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-bold">{tx.quantity}</td>
                         <td className="px-6 py-4 text-slate-400">
                            {tx.product?.stock} <span className="text-xs ml-1">(Current)</span>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
