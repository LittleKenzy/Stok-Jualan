'use client'

import { useActionState } from 'react'
import { createProduct, updateProduct } from '@/actions/product'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProductFormProps {
  product?: {
    id: string
    name: string
    category: string
    stock: number
    buyPrice: number
    sellPrice: number
  }
}

export function ProductForm({ product }: ProductFormProps) {
  // If product exists, we are editing, so bind the ID
  const action = product 
    ? updateProduct.bind(null, product.id) 
    : createProduct
    
  const [state, formAction] = useActionState(action, null)

  return (
    <Card className="border-slate-800 bg-slate-900 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-white">
            {product ? 'Edit Produk' : 'Tambah Produk Baru'}
        </CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input 
                id="name" 
                name="name" 
                defaultValue={product?.name} 
                placeholder="Contoh: Kopi Bubuk 100gr" 
                required 
            />
            {(state as any)?.errors?.name && (
              <p className="text-xs text-red-500">{(state as any).errors.name}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Input 
                id="category" 
                name="category" 
                defaultValue={product?.category} 
                placeholder="Contoh: Minuman" 
                required 
            />
            {(state as any)?.errors?.category && (
              <p className="text-xs text-red-500">{(state as any).errors.category}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="stock">Stok Awal</Label>
                <Input 
                    id="stock" 
                    name="stock" 
                    type="number" 
                    defaultValue={product?.stock ?? 0}
                    min="0"
                    required 
                />
                {(state as any)?.errors?.stock && (
                  <p className="text-xs text-red-500">{(state as any).errors.stock}</p>
                )}
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="buyPrice">Harga Beli</Label>
                <Input 
                    id="buyPrice" 
                    name="buyPrice" 
                    type="number" 
                    defaultValue={product?.buyPrice ?? 0}
                    min="0"
                    required 
                />
                {(state as any)?.errors?.buyPrice && (
                  <p className="text-xs text-red-500">{(state as any).errors.buyPrice}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="sellPrice">Harga Jual</Label>
                <Input 
                    id="sellPrice" 
                    name="sellPrice" 
                    type="number" 
                    defaultValue={product?.sellPrice ?? 0}
                    min="0"
                    required 
                />
                {(state as any)?.errors?.sellPrice && (
                  <p className="text-xs text-red-500">{(state as any).errors.sellPrice}</p>
                )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link href="/dashboard/products">
                <Button variant="ghost" type="button">Batal</Button>
            </Link>
          <SubmitButton>Simpan Produk</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  )
}
