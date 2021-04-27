import { MdxRemote } from 'next-mdx-remote/types'

export interface ArticleImage {
  src: string
  width: number
  height: number
}

export interface ArticleData {
  title: string
  date: string
  excerpt: string
  categories: string[]
  image?: ArticleImage
  slug: string
}

export interface Article {
  mdx: MdxRemote.Source
  data: ArticleData
}

export interface FindAllArticles {
  category?: string
  limit?: number
}
