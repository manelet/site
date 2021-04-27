import type { NextApiRequest, NextApiResponse } from 'next'
import got from 'got'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export interface InstagramApiItem {
  permalink: string
  media_url: string
  captio: string
  id: string
}

interface InstagramApiResponse {
  data: InstagramApiItem[]
  pagination: {
    cursors: {
      before: string
      after: string
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'application/json')

  try {
    const {
      body,
    }: {
      body: InstagramApiResponse
    } = await got(
      `https://graph.instagram.com/me/media?fields=permalink,thumbnail_url,media_url,caption&access_token=${serverRuntimeConfig.instagram.token}`,
      { responseType: 'json' }
    )
    res.statusCode = 200
    res.end(JSON.stringify(body.data.slice(0, 4)))
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify(error))
  }
}
