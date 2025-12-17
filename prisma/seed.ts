import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create User
  const password = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin Toko',
      password,
    },
  })

  console.log({ user })

  // Create Products
  const kopi = await prisma.product.create({
    data: {
      name: 'Kopi Bubuk Premium 100gr',
      category: 'Minuman',
      stock: 50,
      buyPrice: 15000,
      sellPrice: 25000,
    },
  })

  const gula = await prisma.product.create({
    data: {
      name: 'Gula Aren 500gr',
      category: 'Bahan Kue',
      stock: 100,
      buyPrice: 10000,
      sellPrice: 18000,
    },
  })

  console.log({ kopi, gula })

  // Create Transaction
  const tx = await prisma.transaction.create({
    data: {
      type: 'IN',
      quantity: 50,
      productId: kopi.id,
    },
  })

  console.log({ tx })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
