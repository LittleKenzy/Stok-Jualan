'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const TransactionSchema = z.object({
  productId: z.string().min(1, 'Pilih produk'),
  type: z.enum(['IN', 'OUT']),
  quantity: z.coerce.number().min(1, 'Jumlah minimal 1'),
})

export async function createTransaction(prevState: any, formData: FormData) {
  const result = TransactionSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { productId, type, quantity } = result.data

  try {
    // Atomic transaction: Create Transaction + Update Stock
    await db.$transaction(async (tx) => {
        // Check product availability
        const product = await tx.product.findUnique({
            where: { id: productId }
        })

        if (!product) {
            throw new Error('Produk tidak ditemukan')
        }

        if (type === 'OUT' && product.stock < quantity) {
            throw new Error(`Stok tidak cukup. Sisa stok: ${product.stock}`)
        }

        await tx.transaction.create({
            data: {
                productId,
                type,
                quantity,
            }
        })

        const newStock = type === 'IN' 
            ? product.stock + quantity 
            : product.stock - quantity

        await tx.product.update({
            where: { id: productId },
            data: { stock: newStock }
        })
    })
  } catch (error: any) {
    return {
        errors: {
            // General error or field error. We'll map to 'quantity' or generic.
            quantity: [error.message || 'Terjadi kesalahan saat menyimpan transaksi']
        }
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/products')
  revalidatePath('/dashboard/transactions')
  redirect('/dashboard/transactions')
}
