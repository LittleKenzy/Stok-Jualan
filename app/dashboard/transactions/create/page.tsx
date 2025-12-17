import { db } from '@/lib/db'
import { TransactionForm } from '@/components/transaction-form'

export default async function CreateTransactionPage() {
  const products = await db.product.findMany({
    select: { id: true, name: true, stock: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Catat Transaksi</h1>
      <TransactionForm products={products} />
    </div>
  )
}
