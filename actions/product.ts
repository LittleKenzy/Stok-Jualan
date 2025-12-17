'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const ProductSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  category: z.string().min(2, 'Kategori minimal 2 karakter'),
  stock: z.coerce.number().min(0, 'Stok tidak boleh negatif'),
  buyPrice: z.coerce.number().min(0, 'Harga beli tidak boleh negatif'),
  sellPrice: z.coerce.number().min(0, 'Harga jual tidak boleh negatif'),
})

export async function createProduct(prevState: any, formData: FormData) {
  const result = ProductSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, category, stock, buyPrice, sellPrice } = result.data

  await db.product.create({
    data: {
      name,
      category,
      stock,
      buyPrice,
      sellPrice,
    },
  })

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export async function updateProduct(id: string, prevState: any, formData: FormData) {
   const result = ProductSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, category, stock, buyPrice, sellPrice } = result.data

  await db.product.update({
    where: { id },
    data: {
      name,
      category,
      stock,
      buyPrice,
      sellPrice,
    },
  })

  revalidatePath('/dashboard/products')
  redirect('/dashboard/products')
}

export async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  })
  revalidatePath('/dashboard/products')
}
