import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { isAdmin, unauthorized } from '../../../../../lib/admin-auth'
import { GALLERY_CACHE_TAG } from '../../../../../lib/gallery-cache'
import { deletePhoto } from '../../../../../lib/gallery-store'

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized()

  const { id } = await params
  if (!/^[0-9a-f]{16}$/.test(id)) return NextResponse.json({ error: 'Invalid photo id' }, { status: 400 })

  try {
    await deletePhoto(id)
    revalidateTag(GALLERY_CACHE_TAG)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Failed to delete photo', e)
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}
