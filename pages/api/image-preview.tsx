import { renderToStaticMarkup } from 'react-dom/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import svg2img from 'svg2img'

import ImagePreview from '../../components/image-preview/image-preview'
import { find } from '../../content'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    if (!req.query.slug) {
      return res.status(500).json({ error: 'Slug is mandatory' })
    }

    const article = await find(req.query.slug)

    if (!article) {
      return res.status(500).json({ error: 'Article not found' })
    }

    const image = renderToStaticMarkup(<ImagePreview {...article} />)

    svg2img(image, (error, buffer) => {
      if (error) {
        return res.status(500).json({ error: error.toString() })
      }

      res.setHeader('Content-Type', 'image/png')
      res.status(200).end(buffer)
    })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}
