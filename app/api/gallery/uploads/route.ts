import { NextResponse } from 'next/server'
import { isAdmin, unauthorized } from '../../../../lib/admin-auth'
import { createUploadUrl, GalleryInputError } from '../../../../lib/gallery-store'

// Browser uploads go straight to R2 via presigned URL, bypassing serverless body-size limits
export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const body = await request.json().catch(() => null)
  try {
    return NextResponse.json(await createUploadUrl(String(body?.contentType), Number(body?.size)))
  } catch (e) {
    if (e instanceof GalleryInputError) return NextResponse.json({ error: e.message }, { status: 400 })
    console.error('Failed to create upload URL', e)
    return NextResponse.json({ error: 'Failed to create upload URL' }, { status: 500 })
  }
}
