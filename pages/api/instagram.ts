import 'isomorphic-fetch'
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export interface InstagramApiItem {
  permalink: string
  media_url: string
  captio: string
  id: string
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.setHeader('Content-Type', 'application/json')

  try {
    const url = `https://graph.instagram.com/me/media?fields=permalink,thumbnail_url,media_url,caption&access_token=${serverRuntimeConfig.instagram.token}`
    const response = await fetch(url)
    const { data } = await response.json()

    res.statusCode = 200
    res.end(JSON.stringify(data.slice(0, 4)))
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify(error))
  }
}
