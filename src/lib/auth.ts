import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length === 0) {
    // For development, provide a fallback. In production this should throw.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('The environment variable JWT_SECRET is not set.')
    }
    return 'fallback-secret-for-development-only'
  }
  return secret
}

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}

export const signToken = async (payload: { role: string }) => {
  const secret = new TextEncoder().encode(getJwtSecretKey())
  const alg = 'HS256'

  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secret)
}

export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey())
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    return null
  }
}

export const getSession = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  
  if (!token) return null
  return verifyToken(token)
}

export const setSession = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 12 * 60 * 60, // 12 hours
    path: '/',
  })
}

export const clearSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}
