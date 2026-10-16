import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const SESSION_SECONDS = 60 * 60 * 24 * 7

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters')
  return secret
}

const sign = (value: string) => createHmac('sha256', sessionSecret()).update(value).digest('base64url')

// Hash first so timingSafeEqual gets equal-length inputs
function safeEqual(a: string, b: string) {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest())
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  return Boolean(expected) && safeEqual(password, expected!)
}

export async function startSession() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS)
  ;(await cookies()).set(COOKIE_NAME, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  })
}

export async function endSession() {
  ;(await cookies()).delete(COOKIE_NAME)
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE_NAME)?.value
  if (!value) return false
  const [expires, signature] = value.split('.')
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false
  return safeEqual(signature, sign(expires))
}

export const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
