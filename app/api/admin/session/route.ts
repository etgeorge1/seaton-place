import { NextResponse } from 'next/server'
import { checkPassword, endSession, startSession } from '../../../../lib/admin-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (typeof body?.password !== 'string' || !checkPassword(body.password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  await startSession()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await endSession()
  return NextResponse.json({ ok: true })
}
