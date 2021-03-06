import { MdxRemote } from 'next-mdx-remote/types'

export interface ArticleData {
  title: string
  date: string
  excerpt: string
  categories: string[]
}

export interface Article {
  mdx: MdxRemote.Source
  data: ArticleData
}

export interface FindAllArticles {
  category?: string
  limit?: number
}
