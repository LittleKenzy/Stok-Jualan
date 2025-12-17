import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRupiah } from '@/lib/utils'
import { Package, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
  const [productCount, stockSum, transactions] = await Promise.all([
    db.product.count(),
    db.product.aggregate({
      _sum: {
        stock: true,
      },
    }),
    db.transaction.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: true,
      },
      where: {
        product: {
          NOT: undefined
        }
      }
    }),
  ])
  
  // Calculate estimated profit (simplistic: (sell - buy) * stock). 
  // For standard inventory value usually it is buyPrice * stock.
  // We'll calculate "Asset Value" (Total Modal).
  const allProducts = await db.product.findMany({
      select: { stock: true, buyPrice: true }
  })
  
  const totalAssetValue = allProducts.reduce((acc, curr) => {
      return acc + (Number(curr.buyPrice) * curr.stock)
  }, 0)

  const totalStock = stockSum._sum.stock || 0

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Barang</CardTitle>
            <Package className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{productCount}</div>
            <p className="text-xs text-slate-400">Jenis produk terdaftar</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Stok</CardTitle>
            <Package className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalStock}</div>
            <p className="text-xs text-slate-400">Unit barang tersedia</p>
          </CardContent>
        </Card>
         <Card className="border-slate-800 bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Aset</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatRupiah(totalAssetValue)}</div>
            <p className="text-xs text-slate-400">Estimasi modal tertanam</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Transaksi Terakhir</h2>
      <Card className="border-slate-800 bg-slate-900">
        <CardContent className="p-0">
            {transactions.length === 0 ? (
                <div className="p-6 text-center text-slate-500">Belum ada transaksi</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Tanggal</th>
                                <th className="px-6 py-3">Produk</th>
                                <th className="px-6 py-3">Tipe</th>
                                <th className="px-6 py-3">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="px-6 py-4">{tx.date.toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{tx.product?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            tx.type === 'IN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                        }`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold">{tx.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
