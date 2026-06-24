// Utility to fetch all videos from a YouTube channel server-side
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { channelId } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!channelId || !apiKey) {
    return res.status(400).json({ error: 'Missing channelId or apiKey' });
  }

  try {
    // Step 1: get the uploads playlist ID for the channel
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
    const channelResp = await fetch(channelUrl);
    const channelData = await channelResp.json();
    const uploadsPlaylistId = channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return res.status(404).json({ error: 'Could not find uploads playlist for channel' });
    }

    // Step 2: fetch a single page of videos (uploads playlist is already newest-first)
    const limit = Math.min(Number(req.query.maxResults) || 12, 50);
    const pageToken = req.query.pageToken ? `&pageToken=${req.query.pageToken}` : '';
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${limit}&playlistId=${uploadsPlaylistId}&key=${apiKey}${pageToken}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const items: any[] = data.items || [];

    res.status(200).json({
      items,
      nextPageToken: data.nextPageToken || null,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch channel videos' });
  }
}
