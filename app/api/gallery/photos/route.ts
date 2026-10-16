import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAdmin, unauthorized } from '../../../../lib/admin-auth'
import { GALLERY_CACHE_TAG } from '../../../../lib/gallery-cache'
import { GalleryInputError, ingestUpload } from '../../../../lib/gallery-store'

export const maxDuration = 60

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized()

  const body = await request.json().catch(() => null)
  try {
    const result = await ingestUpload(String(body?.key))
    if (result.status === 'added') revalidateTag(GALLERY_CACHE_TAG)
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof GalleryInputError) return NextResponse.json({ error: e.message }, { status: 400 })
    console.error('Failed to process upload', e)
    return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 })
  }
}
