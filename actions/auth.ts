'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

const LoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

export async function register(prevState: any, formData: FormData) {
  const result = RegisterSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = result.data

  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errors: {
        email: ['Email sudah terdaftar'],
      },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  await createSession(user.id)
  redirect('/dashboard')
}

export async function login(prevState: any, formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ['Email atau password salah'],
      },
    }
  }

  await createSession(user.id)
  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
