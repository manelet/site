import renderToString from 'next-mdx-remote/render-to-string'
import matter, { GrayMatterFile } from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { slugify } from './lib/utils'
import { Article, FindAllArticles } from './@types/articles'
import { Category } from './@types/category'
import { MdxRemote } from 'next-mdx-remote/types'
import imageMetadata from './plugins/image-metadata'
import unwrapImages from 'remark-unwrap-images'
import components from './components/mdx'

const root = process.cwd()
const files = fs.readdirSync(path.join(root, 'content/articles'))

const getContents = async (): Promise<Article[]> =>
  Promise.all(files.map((file) => find(file.replace(/\.mdx/, ''))))

export const getSlugs = (): string[] => files.map((p) => p.replace(/\.mdx/, ''))

export const find = async (slug: string | string[]): Promise<Article> => {
  const source = fs.readFileSync(path.join(root, 'content/articles', `${slug}.mdx`), 'utf8')
  const { content, data }: GrayMatterFile<string> = matter(source)
  const dataWithSlug = { ...data, slug }
  const mdx: MdxRemote.Source = await renderToString(content, {
    components,
    scope: dataWithSlug,
    mdxOptions: {
      rehypePlugins: [imageMetadata],
      remarkPlugins: [unwrapImages],
    },
  })

  return { data: dataWithSlug, mdx } as Article
}

export const getCategories = async (): Promise<Category[]> => {
  const contents = await getContents()
  const set = new Set()

  contents.forEach((content) => {
    if (content.data.categories && content.data.categories.length) {
      content.data.categories.map((c) => set.add({ name: c, slug: slugify(c) }))
    }
  })

  return Array.from(set) as Category[]
}

const defaultFindAllOpts = {
  limit: 25,
  category: null,
}

export const findAll = async (opts: FindAllArticles = defaultFindAllOpts): Promise<Article[]> => {
  return (await getContents())
    .filter((content) => (!opts.category ? true : content.data.categories.includes(opts.category)))
    .slice(0, opts.limit)
}
