import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { encrypt, decrypt } from './auth-utils'

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as 'lax',
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000,
}

// Re-export decrypt for middleware usage
export { decrypt }

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration)
  const token = await encrypt({ userId, expires })

  const cookieStore = await cookies()
  cookieStore.set(cookie.name, token, { ...cookie.options, expires })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookie.name)?.value
  const payload = await decrypt(token)

  if (!payload?.userId) {
    redirect('/login')
  }

  return { userId: payload.userId as string }
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name)
}
