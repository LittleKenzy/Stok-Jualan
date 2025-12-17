import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Trash, Edit } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { deleteProduct } from '@/actions/product'

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Produk</h1>
        <Link href="/dashboard/products/add">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase">
                <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Kategori</th>
                <th className="px-6 py-3">Stok</th>
                <th className="px-6 py-3">Harga Beli</th>
                <th className="px-6 py-3">Harga Jual</th>
                <th className="px-6 py-3 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        Belum ada produk. Silakan tambah produk baru.
                    </td>
                 </tr>
                ) : (
                    products.map((product) => (
                    <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className={`px-6 py-4 font-bold ${product.stock < 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {product.stock}
                        </td>
                        <td className="px-6 py-4">{formatRupiah(Number(product.buyPrice))}</td>
                        <td className="px-6 py-4">{formatRupiah(Number(product.sellPrice))}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                            <Link href={`/dashboard/products/${product.id}/edit`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            
                            <form action={deleteProduct.bind(null, product.id)}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </form>
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
