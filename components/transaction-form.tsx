'use client'

import { useActionState } from 'react'
import { createTransaction } from '@/actions/transaction'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TransactionFormProps {
  products: { id: string; name: string; stock: number }[]
}

export function TransactionForm({ products }: TransactionFormProps) {
  const [state, formAction] = useActionState(createTransaction, null)

  return (
    <Card className="border-slate-800 bg-slate-900 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-white">Catat Stok Masuk / Keluar</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="productId">Pilih Produk</Label>
            <select
                id="productId"
                name="productId"
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                required
            >
                <option value="">-- Pilih Produk --</option>
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name} (Stok: {p.stock})
                    </option>
                ))}
            </select>
            {(state as any)?.errors?.productId && (
              <p className="text-xs text-red-500">{(state as any).errors.productId}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Tipe Transaksi</Label>
            <select
                id="type"
                name="type"
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                required
            >
                <option value="IN">Stok Masuk (IN) - Tambah Stok</option>
                <option value="OUT">Penjualan (OUT) - Kurang Stok</option>
            </select>
             {(state as any)?.errors?.type && (
              <p className="text-xs text-red-500">{(state as any).errors.type}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">Jumlah</Label>
            <Input 
                id="quantity" 
                name="quantity" 
                type="number" 
                placeholder="Jumlah barang" 
                min="1"
                required 
            />
            {(state as any)?.errors?.quantity && (
              <p className="text-xs text-red-500">{(state as any).errors.quantity}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link href="/dashboard/transactions">
                <Button variant="ghost" type="button">Batal</Button>
            </Link>
          <SubmitButton>Simpan Transaksi</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
