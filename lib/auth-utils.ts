import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_key_change_me')

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}
