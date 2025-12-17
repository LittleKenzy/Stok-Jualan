'use client'

import { useActionState } from 'react'
import { login } from '@/actions/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SubmitButton } from '@/components/submit-button'
import Link from 'next/link'

export default function LoginPage() {
  const [state, action] = useActionState(login, null)

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-900 px-4 relative">
      <div className="absolute top-8 left-8">
         <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white hover:text-indigo-400">
            StokJualan
         </Link>
      </div>
      <Card className="w-full max-w-sm border-slate-800 bg-slate-950">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <CardDescription>Masuk untuk mengelola stok barang.</CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              {state?.errors?.email && (
                <p className="text-xs text-red-500">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && (
                <p className="text-xs text-red-500">{state.errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton>Login</SubmitButton>
            <div className="text-center text-sm text-slate-400">
              Belum punya akun?{' '}
              <Link href="/register" className="text-indigo-400 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
