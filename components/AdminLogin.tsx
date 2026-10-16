'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).catch(() => null)
    setSubmitting(false)
    if (res?.ok) router.refresh()
    else setError(res?.status === 401 ? 'Wrong password.' : 'Login failed.')
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-4">
      <label className="block">
        <span className="mb-2 block font-mono tracking-wider">PASSWORD</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-pink-orchid-300 bg-white px-3 py-2 focus:border-orange-accent-500 focus:outline-none"
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-gray-900 px-6 py-2 font-mono tracking-wider text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {submitting ? 'SIGNING IN…' : 'SIGN IN'}
      </button>
    </form>
  )
}
