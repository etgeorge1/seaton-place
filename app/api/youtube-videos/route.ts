import { NextResponse } from 'next/server'
import { CHANNEL_ID, fetchChannelVideos, YouTubeError } from '../../../lib/youtube'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const page = await fetchChannelVideos(CHANNEL_ID, { pageToken: searchParams.get('pageToken') })
    return NextResponse.json(page)
  } catch (e) {
    if (e instanceof YouTubeError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: 'Failed to fetch channel videos' }, { status: 500 })
  }
}
