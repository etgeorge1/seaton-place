// Utility to fetch YouTube playlist videos server-side
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playlistId } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!playlistId || !apiKey) {
    return res.status(400).json({ error: 'Missing playlistId or apiKey' });
  }

  const results: any[] = [];
  let nextPageToken = '';
  try {
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.items) results.push(...data.items);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);
    res.status(200).json({ items: results });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
}
