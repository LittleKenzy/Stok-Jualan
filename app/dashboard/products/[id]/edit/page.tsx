import { db } from '@/lib/db'
import { ProductForm } from '@/components/product-form'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await db.product.findUnique({
    where: { id },
  })

  // Convert Decimals to numbers for the form
  const formattedProduct = product ? {
      ...product,
      buyPrice: Number(product.buyPrice),
      sellPrice: Number(product.sellPrice),
  } : null

  if (!formattedProduct) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Edit Produk</h1>
      <ProductForm product={formattedProduct} />
    </div>
  )
}
