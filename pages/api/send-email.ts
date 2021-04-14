import sendgrid from '@sendgrid/mail'
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
sendgrid.setApiKey(serverRuntimeConfig.sendgrid.key)

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = JSON.parse(req.body)

      const payload = {
        from: 'manelet@gmail.com',
        to: 'manelet@gmail.com',
        subject: `[manelet.dev] ${name} (${email})`,
        text: message,
        html: message,
      }

      const response = await sendgrid.send(payload)

      return res.status(200).json({ success: true, response })
    } catch (error) {
      return res.status(500).json({ success: false, error })
    }
  } else {
    return res.status(404).json({ success: false })
  }
}
