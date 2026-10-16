import { NextResponse } from 'next/server'
import { getGalleryPage } from '../../../lib/gallery-cache'

export async function GET(request: Request) {
  const offset = Number(new URL(request.url).searchParams.get('offset') ?? 0)
  if (!Number.isInteger(offset) || offset < 0) {
    return NextResponse.json({ error: 'Invalid offset' }, { status: 400 })
  }

  try {
    return NextResponse.json(await getGalleryPage(offset))
  } catch (e) {
    console.error('Failed to load gallery', e)
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 })
  }
}
