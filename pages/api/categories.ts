import { NextApiResponse, NextApiRequest } from 'next'
import { getCategories } from '../../content'

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const categories = await getCategories()
  return res.json(categories)
}
