"use server"

import { verifyPassword, signToken, setSession } from '@/lib/auth'

export async function loginAction(password: string) {
  // Add a small delay to mitigate brute force
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) {
    return { error: 'Admin hash not configured.' }
  }

  const isValid = await verifyPassword(password, hash)
  if (!isValid) {
    return { error: 'Invalid password.' }
  }

  const token = await signToken({ role: 'admin' })
  await setSession(token)

  return { success: true }
}
