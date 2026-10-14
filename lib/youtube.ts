export const CHANNEL_ID = 'UCf1wviL6ThP-vvnjK0EwgbA'

export type Video = {
  id: string
  title: string
  publishedAt: string | null
}

export type VideoPage = {
  items: Video[]
  nextPageToken: string | null
}

const REVALIDATE_SECONDS = 3600

type PlaylistItem = {
  snippet: {
    title: string
    publishedAt?: string
    resourceId: { videoId: string }
  }
}

export class YouTubeError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function youtubeFetch(path: string, params: Record<string, string>) {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) throw new YouTubeError('Missing YOUTUBE_API_KEY', 500)

  const query = new URLSearchParams({ ...params, key: apiKey })
  const resp = await fetch(`https://www.googleapis.com/youtube/v3/${path}?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (!resp.ok) throw new YouTubeError('YouTube API request failed', 502)
  return resp.json()
}

export async function fetchChannelVideos(
  channelId: string,
  { maxResults = 12, pageToken }: { maxResults?: number; pageToken?: string | null } = {},
): Promise<VideoPage> {
  const channelData = await youtubeFetch('channels', { part: 'contentDetails', id: channelId })
  const uploadsPlaylistId = channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsPlaylistId) {
    throw new YouTubeError('Could not find uploads playlist for channel', 404)
  }

  // Uploads playlist is already newest-first
  const params: Record<string, string> = {
    part: 'snippet',
    maxResults: String(Math.min(maxResults, 50)),
    playlistId: uploadsPlaylistId,
  }
  if (pageToken) params.pageToken = pageToken
  const data = await youtubeFetch('playlistItems', params)
  const playlistItems: PlaylistItem[] = data.items ?? []

  const items: Video[] = playlistItems.map((item) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt ?? null,
  }))

  return { items, nextPageToken: data.nextPageToken ?? null }
}
